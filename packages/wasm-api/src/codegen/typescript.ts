import type { NumOrString } from "@thi.ng/api";
import {
	BIGINT_ARRAY_CTORS,
	BigType,
	BIT_SHIFTS,
	Type,
	TYPEDARRAY_CTORS,
} from "@thi.ng/api/typedarray";
import { isString } from "@thi.ng/checks/is-string";
import type { Enum, ICodeGen, Struct, StructField, WasmPrim } from "../api.js";
import { isBigNumeric, isNumeric, isPrim, prefixLines } from "./utils.js";

export interface TSOpts {
	indent: string;
}

export const TYPESCRIPT = (opts?: Partial<TSOpts>) => {
	const { indent } = { indent: "\t", ...opts };
	const I = indent;
	const I2 = I + I;
	const I3 = I2 + I;

	const gen: ICodeGen = {
		pre: `import type { WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";\n`,

		doc: (doc, indent, acc) => {
			if (doc.indexOf("\n") !== -1) {
				acc.push(
					indent + "/**",
					prefixLines(indent + " * ", doc),
					indent + " */"
				);
			} else {
				acc.push(`${indent}/** ${doc} */`);
			}
		},

		enum: (type, _, acc) => {
			const e = <Enum>type;
			acc.push(`export enum ${e.name} {`);
			for (let v of e.values) {
				var line = indent;
				if (!isString(v)) {
					v.doc && gen.doc(v.doc, indent, acc);
					line += v.name;
					if (v.value != null) line += ` = ${v.value}`;
				} else {
					line += v;
				}
				acc.push(line + ",");
			}
			acc.push("}\n");
			return acc;
		},

		struct: (type, types, acc) => {
			const struct = <Struct>type;
			const returnTypes: Record<string, string> = {};

			// interface definition
			acc.push(`export interface ${struct.name} extends WasmTypeBase {`);
			for (let f of struct.fields) {
				f.doc && gen.doc(f.doc, indent, acc);
				let line = `${indent}${f.name}: `;
				let rtype: string = "";
				if (f.tag == "array" || f.tag == "slice" || f.tag === "vec") {
					rtype = isNumeric(f.type)
						? TYPEDARRAY_CTORS[<Type>f.type].name
						: isBigNumeric(f.type)
						? BIGINT_ARRAY_CTORS[<BigType>f.type].name
						: f.type + "[]";
				} else if (!f.tag || f.tag === "scalar" || f.tag === "ptr") {
					rtype = isBigNumeric(f.type)
						? "bigint"
						: isNumeric(f.type)
						? "number"
						: f.type;
				}
				returnTypes[f.name] = rtype;
				acc.push(line + rtype + ";");
			}
			acc.push("}\n");

			// type implementation
			acc.push(
				`export const $${struct.name}: WasmTypeConstructor<${struct.name}> = (mem) => ({`,
				`${I}get align() { return ${struct.__align}; },`,
				`${I}get size() { return ${struct.__size}; },`,
				`${I}instance: (base) => ({`,
				`${I2}get __base() { return base; },`,
				`${I2}get __bytes() { return mem.u8.subarray(base, base + ${struct.__size}); },`
			);

			for (let f of struct.fields) {
				const offset = f.__offset || 0;
				acc.push(`${I2}get ${f.name}(): ${returnTypes[f.name]} {`);
				const prim = isPrim(f.type);
				if (f.tag === "ptr") {
					acc.push(
						prim
							? `${I3}return mem.${f.type}[${__ptr(
									offset
							  )} >> ${__shift(f.type)}];`
							: `${I3}return $${f.type}.instance(${__ptr(
									offset
							  )});`
					);
				} else if (f.tag === "slice") {
					acc.push(
						`${I3}const len = ${__ptr(offset, 4)};`,
						prim
							? `${I3}const addr = ${__ptr(offset)} >> ${__shift(
									f.type
							  )};
${I3}return mem.${f.type}.subarray(addr, addr + len);`
							: `${I3}const addr = ${__ptr(
									offset
							  )};\n${__mapArray(struct, f, I3)}`
					);
				} else if (f.tag === "array" || f.tag === "vec") {
					acc.push(
						prim
							? `${I3}const addr = (base + ${offset}) >> ${__shift(
									f.type
							  )};
${I3}return mem.${f.type}.subarray(addr, addr + ${f.len});`
							: `${I3}const addr = base + ${offset};\n${__mapArray(
									struct,
									f,
									I3,
									f.len
							  )}`
					);
				} else {
					let setter: string;
					if (prim) {
						const addr = `mem.${f.type}[(base + ${
							f.__offset
						}) >> ${__shift(f.type)}]`;
						acc.push(`${I3}return ${addr};`);
						setter = `${addr} = x`;
					} else if (types[f.type].type === "enum") {
						const tag = (<Enum>types[f.type]).tag;
						const addr = `mem.${tag}[(base + ${
							f.__offset
						}) >> ${__shift(tag)}]`;
						acc.push(`${I3}return ${addr};`);
						setter = `${addr} = x`;
					} else {
						acc.push(
							`${I3}return $${f.type}(mem).instance(base + ${offset});`
						);
						setter = `mem.u8.set(x.__bytes, base + ${offset})`;
					}
					// close getter
					acc.push(`${I2}},`);
					// setter
					acc.push(
						`${I2}set ${f.name}(x: ${returnTypes[f.name]}) {`,
						`${I3}${setter};`
					);
				}
				// close field accessor
				acc.push(`${I2}},`);
			}

			acc.push(`${I}})\n});\n`);
			return acc;
		},
	};
	return gen;
};

/** @internal */
const __shift = (type: string) => BIT_SHIFTS[<WasmPrim>type];

/** @internal */
const __ptr = (offset: number, extra = 0) =>
	`mem.u32[(base${offset > 0 ? ` + ${offset}` : ""}${
		extra > 0 ? ` + ${extra}` : ""
	}) >> 2]`;

/** @internal */
const __mapArray = (
	struct: Struct,
	f: StructField,
	indent: string,
	len: NumOrString = "len"
) =>
	prefixLines(
		indent,
		`const inst = $${f.type}(mem);
const slice: ${f.type}[] = [];
for(let i = 0; i < ${len}; i++) slice.push(inst.instance(addr + i * ${struct.__size}));
return slice;`
	);
