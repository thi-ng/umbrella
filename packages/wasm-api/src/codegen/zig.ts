import { isNumber } from "@thi.ng/checks";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { capitalize } from "@thi.ng/strings/case";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	Field,
	FuncPointer,
	ICodeGen,
	Struct,
	Union,
} from "../api.js";
import { classifyField } from "./classify.js";
import {
	defaultValue,
	ensureLines,
	ensureStringArray,
	isOpaque,
	isPadding,
	isStringSlice,
	isUnion,
	isWasmString,
	prefixLines,
	sliceTypes,
	withIndentation,
} from "./utils.js";

/**
 * Zig code generator options.
 */
export interface ZigOpts extends CodeGenOptsBase {}

/**
 * Zig code generator. Call with options and then pass to {@link generateTypes}
 * (see its docs for further usage).
 *
 * @remarks
 * This codegen generates struct and enum definitions for a {@link TypeColl}
 * given to {@link generateTypes}.
 *
 * @param opts
 */
export const ZIG = (opts: Partial<ZigOpts> = {}) => {
	const INDENT = "    ";
	const SCOPES: [RegExp, RegExp] = [/\{$/, /(?<!\{.*)\}\)?[;,]?$/];

	const gen: ICodeGen = {
		id: "zig",

		pre: (coll) => {
			const res = [
				`const std = @import("std");`,
				`const wasm = @import("wasmapi");`,
			];
			for (let type of sliceTypes(coll)) {
				if (type !== "string" && type !== "opaque") {
					const name = capitalize(type!);
					res.push(
						`\npub const ${name}Slice = wasm.Slice([]const ${type}, [*]const ${type});`,
						`pub const Mut${name}Slice = wasm.Slice([]${type}, [*]${type});`
					);
				}
			}
			if (opts.pre) res.push("", ...ensureStringArray(opts.pre));
			return res.join("\n");
		},

		post: () =>
			opts.post
				? isString(opts.post)
					? opts.post
					: opts.post.join("\n")
				: "",

		doc: (doc, acc, opts, topLevel = false) => {
			acc.push(
				...prefixLines(topLevel ? "//! " : "/// ", doc, opts.lineWidth)
			);
		},

		enum: (e, _, acc, opts) => {
			const lines: string[] = [];
			lines.push(`pub const ${e.name} = enum(${e.tag}) {`);
			for (let v of e.values) {
				let line: string;
				if (!isString(v)) {
					v.doc && gen.doc(v.doc, lines, opts);
					line = v.name;
					if (v.value != null) line += ` = ${v.value}`;
				} else {
					line = v;
				}
				lines.push(line + ",");
			}
			if (e.body?.zig) {
				lines.push("", ...ensureLines(e.body!.zig, "impl"), "");
			}
			lines.push("};", "");
			acc.push(...withIndentation(lines, INDENT, ...SCOPES));
		},

		struct: (struct, _, acc, opts) => {
			acc.push(
				...withIndentation(
					[
						`pub const ${struct.name} = extern struct {`,
						...__generateFields(gen, struct, opts),
					],
					INDENT,
					...SCOPES
				)
			);
		},

		union: (union, _, acc, opts) => {
			acc.push(
				...withIndentation(
					[
						`pub const ${union.name} = extern union {`,
						...__generateFields(gen, union, opts),
					],
					INDENT,
					...SCOPES
				)
			);
		},

		funcptr: (ptr, _, acc, opts) => {
			const args = ptr.args
				.map((a) => `${a.name}: ${fieldType(ptr, a, opts).type}`)
				.join(", ");
			const rtype =
				ptr.rtype === "void"
					? ptr.rtype
					: fieldType(ptr, { name: "return", ...ptr.rtype }, opts)
							.type;
			acc.push(
				`pub const ${ptr.name} = *const fn(${args}) ${rtype};`,
				""
			);
		},
	};
	return gen;
};

const __generateFields = (
	gen: ICodeGen,
	parent: Struct | Union,
	opts: CodeGenOpts
) => {
	const res: string[] = [];
	const ftypes: Record<string, string> = {};
	const name = parent.name;
	let padID = 0;
	for (let f of parent.fields) {
		// autolabel explicit padding fields
		if (isPadding(f)) {
			res.push(`__pad${padID}: [${f.pad}]u8,`);
			padID++;
			continue;
		}
		f.doc && gen.doc(f.doc, res, opts);
		const { type, defaultVal } = fieldType(parent, f, opts);
		ftypes[f.name] = type;
		res.push(`${f.name}: ${type}${defaultVal},`);
	}
	if (parent.body?.zig) {
		res.push("", ...ensureLines(parent.body!.zig, "impl"), "");
	}
	res.push("};");

	if (opts.debug) {
		const fn = (fname: string, body: string) =>
			res.push(
				"",
				`export fn ${name}_${fname}() usize {`,
				`return ${body};`,
				`}`
			);

		fn("align", `@alignOf(${name})`);
		fn("size", `@sizeOf(${name})`);

		for (let f of parent.fields) {
			if (isPadding(f)) continue;
			fn(f.name + "_align", `@alignOf(${ftypes[f.name]})`);
			!isUnion(parent) &&
				fn(f.name + "_offset", `@offsetOf(${name}, "${f.name}")`);
			fn(f.name + "_size", `@sizeOf(${ftypes[f.name]})`);
		}
	}
	res.push("");
	return res;
};

/** @internal */
export const fieldType = (
	parent: Struct | Union | FuncPointer,
	f: Field,
	opts: CodeGenOpts
) => {
	let type = f.type;
	let defaultVal = defaultValue(f, "zig");
	const { classifier, isConst } = classifyField(f);
	if (isWasmString(f.type)) {
		const useStrSlice = isStringSlice(opts.stringType);
		type = useStrSlice
			? isConst
				? "wasm.String"
				: "wasm.MutString"
			: isConst
			? "wasm.StringPtr"
			: "wasm.MutStringPtr";
		switch (classifier) {
			case "strPtr":
				type = `*${type}`;
				break;
			case "strPtrFixed":
				type = `*[${f.len}]${type}`;
				break;
			case "strPtrMulti":
				type = `[*]${type}`;
				break;
			case "strSlice":
				type = `wasm.Slice([]${type},[*]${type})`;
				break;
			case "strArray":
				type = `[${f.len}]${type}`;
				break;
		}
	} else if (isOpaque(f.type)) {
		type = isConst ? "wasm.OpaquePtr" : "wasm.MutOpaquePtr";
		switch (classifier) {
			case "opaquePtr":
				type = `*${type}`;
				break;
			case "opaquePtrFixed":
				type = `*[${f.len}]${type}`;
				break;
			case "opaquePtrMulti":
				type = `[*]${type}`;
				break;
			case "opaqueSlice":
				type = isConst ? "wasm.OpaqueSlice" : "wasm.MutOpaqueSlice";
				break;
			case "opaqueArray":
				type = `[${f.len}]${type}`;
				break;
		}
	} else {
		const $const = isConst ? "const " : "";
		const sentinel = f.sentinel != null ? `:${f.sentinel}` : "";
		switch (classifier) {
			case "ptrSingle":
				type = `*${$const}${type}`;
				break;
			case "ptrFixed":
				type = `*${$const}[${f.len}${sentinel}]${type}`;
				break;
			case "ptrMulti":
				type = `[*${sentinel}]${$const}${type}`;
				break;
			case "slice":
				type = `${isConst ? "" : "Mut"}${capitalize(f.type)}Slice`;
				break;
			case "array":
				type = `[${f.len}${sentinel}]${type}`;
				break;
			case "vec":
				type = `@Vector(${f.len}, ${type})`;
				break;
		}
	}
	if (defaultVal != undefined) {
		if (!(isString(defaultVal) || isNumber(defaultVal))) {
			illegalArgs(
				`wrong default value for ${parent.name}.${f.name} (${defaultVal})`
			);
		}
	}
	return {
		type,
		defaultVal: defaultVal != undefined ? ` = ${defaultVal}` : "",
	};
};
