import { isString } from "@thi.ng/checks/is-string";
import type { CodeGenOptsBase, ICodeGen } from "../api.js";
import {
	enumName,
	isPadding,
	isStringSlice,
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
		pre: () => opts.pre || "",

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
			lines.push("};", "");
			acc.push(...withIndentation(lines, INDENT, ...SCOPES));
		},

		struct: (struct, _, acc, opts) => {
			const name = struct.name;
			const res: string[] = [];
			res.push(
				`pub const ${name} = ${
					struct.tag ? struct.tag + " " : ""
				}struct {`
			);
			const ftypes: Record<string, string> = {};
			let padID = 0;
			for (let f of struct.fields) {
				// autolabel explicit padding fields
				if (isPadding(f)) {
					res.push(`__pad${padID++}: [${f.pad}]u8,`);
					continue;
				}
				f.doc && gen.doc(f.doc, res, opts);
				let ftype =
					f.type === "string"
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
						ftype = `[${f.len}]${ftype}`;
						break;
					case "slice":
						ftype = `[]${f.const ? "const " : ""}${ftype}`;
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
						if (f.default != undefined)
							defaultVal = ` = ${f.default}`;
				}
				ftypes[f.name] = ftype;
				res.push(`${f.name}: ${ftype}${defaultVal},`);
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

				for (let f of struct.fields) {
					if (isPadding(f)) continue;
					fn(f.name + "_align", `@alignOf(${ftypes[f.name]})`);
					fn(f.name + "_offset", `@offsetOf(${name}, "${f.name}")`);
					fn(f.name + "_size", `@sizeOf(${ftypes[f.name]})`);
				}
			}
			res.push("");
			acc.push(...withIndentation(res, INDENT, ...SCOPES));
		},
	};
	return gen;
};
