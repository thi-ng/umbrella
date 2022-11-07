import { isNumber } from "@thi.ng/checks";
import { isString } from "@thi.ng/checks/is-string";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	Field,
	FuncPointer,
	ICodeGen,
	Struct,
	Union,
} from "../api.js";
import {
	defaultValue,
	ensureLines,
	isOpaque,
	isPadding,
	isStringSlice,
	isWasmString,
	prefixLines,
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

		pre: () =>
			`const std = @import("std");${opts.pre ? `\n${opts.pre}` : ""}`,

		post: () => opts.post || "",

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
						`pub const ${struct.name} = ${
							struct.tag ? struct.tag + " " : ""
						}struct {`,
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
						`pub const ${union.name} = ${
							union.tag ? union.tag + " " : ""
						}union {`,
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
	const isUnion = parent.type === "union";
	const name = parent.name;
	let padID = 0;
	for (let f of parent.fields) {
		// autolabel explicit padding fields
		if (isPadding(f)) {
			parent.tag === "packed"
				? __packedPadding(padID, f.pad!, res)
				: res.push(`__pad${padID}: [${f.pad}]u8,`);
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
			!isUnion &&
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
	let type = isWasmString(f.type)
		? isStringSlice(opts.stringType)
			? f.const !== false
				? "[:0]const u8"
				: "[:0]u8"
			: f.const !== false
			? "[*:0]const u8"
			: "[*:0]u8"
		: isOpaque(f.type)
		? `${f.optional ? "?" : ""}*${f.const ? "const " : ""}anyopaque`
		: f.type;
	let defaultVal = defaultValue(f, "zig");
	switch (f.tag) {
		case "array":
			type =
				f.sentinel !== undefined
					? `[${f.len}:${f.sentinel}]${type}`
					: `[${f.len}]${type}`;
			break;
		case "slice":
			type = `[${f.sentinel !== undefined ? ":" + f.sentinel : ""}]${
				f.const ? "const " : ""
			}${type}`;
			break;
		case "vec":
			type = `@Vector(${f.len}, ${type})`;
			break;
		case "ptr":
			type = `${f.optional ? "?" : ""}*${f.const ? "const " : ""}${
				f.len ? `[${f.len}]` : ""
			}${type}`;
			break;
		case "scalar":
		default:
			if (defaultVal != undefined) {
				if (!(isString(defaultVal) || isNumber(defaultVal))) {
					unsupported(
						`wrong default value for ${parent.name}.${f.name} (${defaultVal})`
					);
				}
			}
	}
	return {
		type,
		defaultVal: defaultVal != undefined ? ` = ${defaultVal}` : "",
	};
};

const __packedPadding = (id: number, n: number, res: string[]) => {
	let i = 0;
	n <<= 3;
	for (; n >= 128; n -= 128, i++) {
		res.push(`__pad${id}_${i}: u128,`);
	}
	res.push(`__pad${id}_${i}: u${n},`);
};
