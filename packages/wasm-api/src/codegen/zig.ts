import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	ICodeGen,
	Struct,
	Union,
} from "../api.js";
import {
	ensureLines,
	enumName,
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
	const SCOPES: [RegExp, RegExp] = [/\{$/, /\}\)?[;,]?$/];

	const gen: ICodeGen = {
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
					line = enumName(opts, v.name);
					if (v.value != null) line += ` = ${v.value}`;
				} else {
					line = enumName(opts, v);
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
		let ftype = isWasmString(f.type)
			? isStringSlice(opts.stringType)
				? f.const !== false
					? "[]const u8"
					: "[]u8"
				: f.const !== false
				? "[*:0]const u8"
				: "[*:0]u8"
			: f.type;
		let defaultVal = "";
		switch (f.tag) {
			case "array":
				ftype =
					f.sentinel !== undefined
						? `[${f.len}:${f.sentinel}]${ftype}`
						: `[${f.len}]${ftype}`;
				break;
			case "slice":
				ftype = `[${f.sentinel !== undefined ? ":" + f.sentinel : ""}]${
					f.const ? "const " : ""
				}${ftype}`;
				break;
			case "vec":
				ftype = `@Vector(${f.len}, ${ftype})`;
				break;
			case "ptr":
				ftype = `*${f.const ? "const " : ""}${
					f.len ? `[${f.len}]` : ""
				}${ftype}`;
				break;
			case "scalar":
			default:
				if (f.default != undefined) {
					if (!(isString(f.default) || isNumber(f.default))) {
						unsupported(
							`wrong default value for ${name}.${f.name} (${f.default})`
						);
					}
					defaultVal = ` = ${JSON.stringify(f.default)}`;
				}
		}
		ftypes[f.name] = ftype;
		res.push(`${f.name}: ${ftype}${defaultVal},`);
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

const __packedPadding = (id: number, n: number, res: string[]) => {
	let i = 0;
	n <<= 3;
	for (; n >= 128; n -= 128, i++) {
		res.push(`__pad${id}_${i}: u128,`);
	}
	res.push(`__pad${id}_${i}: u${n},`);
};
