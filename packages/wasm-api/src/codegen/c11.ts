import { topoSort } from "@thi.ng/arrays/topo-sort";
import { isString } from "@thi.ng/checks/is-string";
import { unsupported } from "@thi.ng/errors/unsupported";
import { capitalize } from "@thi.ng/strings/case";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	Field,
	FuncPointer,
	ICodeGen,
	Struct,
	TypeColl,
	Union,
	WasmPrim,
} from "../api.js";
import { classifyField } from "./classify.js";
import {
	ensureStringArray,
	enumName,
	isOpaque,
	isPadding,
	isStringSlice,
	isStruct,
	isUnion,
	isWasmString,
	prefixLines,
	sliceTypes,
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
		id: "c",

		pre: (coll, opts) => {
			const res = [
				"#pragma once",
				"",
				"#ifdef __cplusplus",
				`extern "C" {`,
				"#endif",
				opts.debug ? "\n#include <stdalign.h>" : "",
				`#include "wasmapi.h"`,
				"",
			];
			// pre-declare any primitive slice types used (e.g. `U8Slice`)
			const slices = sliceTypes(coll);
			for (let id of slices) {
				const prim = PRIM_ALIASES[<WasmPrim>id];
				if (!prim) continue;
				res.push(__sliceDef(prim, typePrefix, capitalize(id!)));
			}
			// ...then pre-declare any custom types in dependency order
			for (let id of __declOrder(coll)) {
				const type = coll[id];
				if (type.type == "funcptr") {
					res.push(
						__funcptr(<FuncPointer>type, coll, opts, typePrefix)
					);
				} else {
					res.push(
						`\ntypedef ${type.type} ${typePrefix}${type.name} ${typePrefix}${type.name};`
					);
				}
				if (slices.has(id)) {
					const [ptr, name] =
						id === "opaque"
							? ["void*", "Opaque"]
							: [typePrefix + id, capitalize(id!)];
					res.push(__sliceDef(ptr, typePrefix, name));
				}
			}
			if (opts.pre) res.push("", ...ensureStringArray(opts.pre));
			return res.join("\n");
		},

		post: () => {
			const res = [];
			if (opts.post) res.push(...ensureStringArray(opts.post), "");
			res.push("#ifdef __cplusplus", "}", "#endif", "");
			return res.join("\n");
		},

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
			lines.push(`enum ${name} {`);
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
			lines.push(`};`, "");
			acc.push(...withIndentation(lines, INDENT, ...SCOPES));
		},

		struct: (struct, coll, acc, opts) => {
			const name = typePrefix + struct.name;
			acc.push(
				...withIndentation(
					[
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
						`union ${name} {`,
						...__generateFields(gen, union, coll, opts, typePrefix),
					],
					INDENT,
					...SCOPES
				)
			);
		},

		// funcpointers are emitted in `pre` phase above
		funcptr: () => {},
	};
	return gen;
};

/**
 * Generates source code for given {@link Struct} or {@link Union}.
 *
 * @internal
 */
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
		const { type, decl } = __fieldType(f, coll, opts, typePrefix);
		ftypes[f.name] = type;
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

/**
 * Returns the C type name and declaration (incl. field name) for a given
 * {@link Field}.
 *
 * @internal
 */
const __fieldType = (
	f: Field,
	coll: TypeColl,
	opts: CodeGenOpts,
	prefix: string
) => {
	let type = f.type;
	let decl: string;
	const { classifier, isConst } = classifyField(f, coll);
	const $isConst = isConst ? "Const" : "";
	const __ptr = () => {
		decl = `${type}* ${f.name}`;
		type = `${type}*`;
	};
	const __array = () => {
		decl = `${type} ${f.name}[${f.len}]`;
		type = `${type}[${f.len}]`;
	};
	const __slice = () => {
		type += "Slice";
		decl = `${type} ${f.name}`;
	};
	if (isWasmString(f.type)) {
		const useStrSlice = isStringSlice(opts.stringType);
		type =
			prefix +
			(useStrSlice ? `${$isConst}String` : `${$isConst}StringPtr`);
		switch (classifier) {
			case "strPtr":
			case "strPtrFixed":
			case "strPtrMulti":
				__ptr();
				break;
			case "strSlice":
				__slice();
				break;
			case "strArray":
				__array();
				break;
			default:
				decl = `${type} ${f.name}`;
		}
	} else if (isOpaque(f.type)) {
		type = `${prefix}${$isConst}OpaquePtr`;
		switch (classifier) {
			case "opaquePtr":
			case "opaquePtrFixed":
			case "opaquePtrMulti":
				__ptr();
				break;
			case "opaqueSlice":
				__slice();
				break;
			case "opaqueArray":
				__array();
				break;
			default:
				decl = `${type} ${f.name}`;
		}
	} else {
		const $const = isConst ? "const " : "";
		type = PRIM_ALIASES[<WasmPrim>type] || prefix + type;
		switch (classifier) {
			case "ptr":
			case "ptrFixed":
			case "ptrMulti":
			case "enumPtr":
			case "enumPtrFixed":
			case "enumPtrMulti":
				type = `${$const}${type}*`;
				decl = `${type} ${f.name}`;
				break;
			case "slice":
			case "enumSlice":
				type = `${prefix}${$isConst}${capitalize(f.type)}Slice`;
				decl = `${type} ${f.name}`;
				break;
			case "array":
			case "enumArray":
				__array();
				break;
			case "vec":
				unsupported("C doesn't support vector");
			default:
				decl = `${type} ${f.name}`;
		}
	}
	return {
		type: type,
		decl: decl!,
	};
};

/**
 * Takes a {@link TypeColl} and returns user type names in dependency order.
 *
 * @param coll
 *
 * @internal
 */
const __declOrder = (coll: TypeColl) =>
	topoSort(coll, (type) => {
		const fields =
			isStruct(type) || isUnion(type)
				? type.fields
				: type.type === "funcptr"
				? (<FuncPointer>type).args
				: undefined;
		return fields
			? fields.map((x) => x.type).filter((x) => !!coll[x])
			: undefined;
	});

/**
 * Generates C `typedef` for given {@link FuncPointer} spec.
 *
 * @param ptr
 * @param coll
 * @param opts
 * @param typePrefix
 *
 * @internal
 */
const __funcptr = (
	ptr: FuncPointer,
	coll: TypeColl,
	opts: CodeGenOpts,
	typePrefix: string
) => {
	const name = typePrefix + ptr.name;
	const args = ptr.args
		.map((a) => __fieldType(a, coll, opts, typePrefix).decl)
		.join(", ");
	const rtype =
		ptr.rtype === "void"
			? ptr.rtype
			: __fieldType(
					{ name: "return", ...ptr.rtype },
					coll,
					opts,
					typePrefix
			  ).type;
	return `typedef ${rtype} (*${name})(${args});`;
};

/**
 * Generates `typedef`s for a slice emulation struct of given pointer type.
 *
 * @param ptr
 * @param prefix
 * @param name
 *
 *  @internal
 */
const __sliceDef = (ptr: string, prefix: string, name: string) =>
	`\ntypedef struct { ${ptr}* ptr; size_t len; } ${prefix}${name}Slice;` +
	`\ntypedef struct { const ${ptr}* ptr; size_t len; } ${prefix}Const${name}Slice;`;
