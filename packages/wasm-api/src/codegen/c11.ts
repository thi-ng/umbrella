import { isString } from "@thi.ng/checks/is-string";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	Field,
	ICodeGen,
	Struct,
	TypeColl,
	Union,
	WasmPrim,
} from "../api.js";
import {
	enumName,
	isOpaque,
	isPadding,
	isStringSlice,
	isWasmString,
	prefixLines,
	withIndentation,
} from "./utils.js";

const PRIM_ALIASES = {
	i8: "int8_t",
	u8: "uint8_t",
	i16: "int16_t",
	u16: "uint16_t",
	i32: "int32_t",
	u32: "uint32_t",
	i64: "int64_t",
	u64: "uint64_t",
	f32: "float",
	f64: "double",
};

/**
 * Zig code generator options.
 */
export interface C11Opts extends CodeGenOptsBase {
	/**
	 * Optional name prefix for generated types, e.g. `WASM_`.
	 */
	typePrefix: string;
}

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
export const C11 = (opts: Partial<C11Opts> = {}) => {
	const { typePrefix } = {
		typePrefix: "",
		...opts,
	};
	const INDENT = "    ";
	const SCOPES: [RegExp, RegExp] = [/\{$/, /^\}[ A-Za-z0-9_]*[;,]?$/];

	const gen: ICodeGen = {
		pre: (opts) => `#pragma once

#ifdef __cplusplus
extern "C" {
#endif
${opts.debug ? "\n#include <stdalign.h>" : ""}
#include <stddef.h>
#include <stdint.h>

typedef struct { const char* ptr; size_t len; } ${typePrefix}String;${
			opts.pre ? `\n${opts.pre}` : ""
		}`,

		post: () =>
			`${
				opts.post ? `${opts.post}\n` : ""
			}#ifdef __cplusplus\n}\n#endif\n`,

		doc: (doc, acc, opts) => {
			acc.push(...prefixLines("// ", doc, opts.lineWidth));
		},

		enum: (e, _, acc, opts) => {
			if (!(e.tag === "i32" || e.tag === "u32")) {
				unsupported(
					`enum ${e.name} must be a i32/u32 in C, but got '${e.tag}'`
				);
			}
			const name = typePrefix + e.name;
			const lines: string[] = [];
			lines.push(`typedef enum {`);
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
			lines.push(`} ${name};`, "");
			acc.push(...withIndentation(lines, INDENT, ...SCOPES));
		},

		struct: (struct, coll, acc, opts) => {
			const name = typePrefix + struct.name;
			acc.push(
				...withIndentation(
					[
						`typedef struct ${name} ${name};`,
						`struct ${name} {`,
						...__generateFields(
							gen,
							struct,
							coll,
							opts,
							typePrefix
						),
					],
					INDENT,
					...SCOPES
				)
			);
		},

		union: (union, coll, acc, opts) => {
			const name = typePrefix + union.name;
			acc.push(
				...withIndentation(
					[
						`typedef union ${name} ${name};`,
						`union ${name} {`,
						...__generateFields(gen, union, coll, opts, typePrefix),
					],
					INDENT,
					...SCOPES
				)
			);
		},

		funcptr: (ptr, coll, acc, opts) => {
			const name = typePrefix + ptr.name;
			const args = ptr.args
				.map((a) => fieldType(a, coll, typePrefix, opts).decl)
				.join(", ");
			const rtype =
				ptr.rtype === "void"
					? ptr.rtype
					: fieldType(
							{ name: "return", ...ptr.rtype },
							coll,
							typePrefix,
							opts
					  ).ftype;
			acc.push(`typedef ${rtype} (*${name})(${args});`);
		},
	};
	return gen;
};

const __generateFields = (
	gen: ICodeGen,
	parent: Struct | Union,
	coll: TypeColl,
	opts: CodeGenOpts,
	typePrefix: string
) => {
	const res: string[] = [];
	const ftypes: Record<string, string> = {};
	const isUnion = parent.type === "union";
	const name = typePrefix + parent.name;
	let padID = 0;
	for (let f of parent.fields) {
		// autolabel explicit padding fields
		if (isPadding(f)) {
			res.push(`uint8_t __pad${padID++}[${f.pad}];`);
			continue;
		}
		f.doc && gen.doc(f.doc, res, opts);
		const { ftype, decl } = fieldType(f, coll, typePrefix, opts);
		ftypes[f.name] = ftype;
		res.push(decl + ";");
	}
	res.push("};");

	if (opts.debug) {
		const fn = (fname: string, body: string) =>
			res.push(
				"",
				`size_t __attribute__((used)) ${name}_${fname}() {`,
				`return ${body};`,
				`}`
			);

		fn("align", `alignof(${name})`);
		fn("size", `sizeof(${name})`);

		for (let f of parent.fields) {
			if (isPadding(f)) continue;
			fn(f.name + "_align", `alignof(${ftypes[f.name]})`);
			!isUnion && fn(f.name + "_offset", `offsetof(${name}, ${f.name})`);
			fn(f.name + "_size", `sizeof(${ftypes[f.name]})`);
		}
	}
	res.push("");
	return res;
};

const fieldType = (
	f: Field,
	coll: TypeColl,
	prefix: string,
	opts: CodeGenOpts
) => {
	const fconst = f.const ? "const " : "";
	let ftype = isWasmString(f.type)
		? isStringSlice(opts.stringType)
			? prefix + "String"
			: `${f.const !== false ? "const " : ""}char*`
		: isOpaque(f.type)
		? `${fconst}void*`
		: PRIM_ALIASES[<WasmPrim>f.type] || f.type;
	if (coll[ftype]) ftype = prefix + ftype;
	let decl: string;
	switch (f.tag) {
		case "array":
		case "vec":
			decl = `${fconst}${ftype} ${f.name}[${f.len}]`;
			ftype = `${ftype}[${f.len}]`;
			break;
		case "slice":
			ftype = __slice(ftype, fconst);
			decl = `${ftype} ${f.name}`;
			break;
		case "ptr":
			ftype = `${fconst}${ftype}*`;
			decl = `${ftype} ${f.name}`;
			break;
		case "scalar":
		default:
			decl = `${ftype} ${f.name}`;
	}
	return { ftype, decl };
};

const __slice = (type: string, $const: string) =>
	`struct { ${$const}${type}* ptr; size_t len; }`;
