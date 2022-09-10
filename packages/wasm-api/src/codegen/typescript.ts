import type { NumOrString } from "@thi.ng/api";
import {
	BIGINT_ARRAY_CTORS,
	BigType,
	BIT_SHIFTS,
	Type,
	TYPEDARRAY_CTORS,
} from "@thi.ng/api/typedarray";
import { isString } from "@thi.ng/checks/is-string";
import {
	CodeGenOpts,
	CodeGenOptsBase,
	Enum,
	ICodeGen,
	PKG_NAME,
	StructField,
	USIZE,
	USIZE_SIZE,
	WasmPrim,
} from "../api.js";
import {
	enumName,
	isBigNumeric,
	isNumeric,
	isPadding,
	isStringSlice,
	isWasmPrim,
	isWasmString,
	pointerFields,
	prefixLines,
	stringFields,
	withIndentation,
} from "./utils.js";

/**
 * TypeScript code generator options.
 */
export interface TSOpts extends CodeGenOptsBase {
	/**
	 * Indentation string
	 *
	 * @defaultValue "\t"
	 */
	indent: string;
}

/**
 * TypeScript code generator. Call with options and then pass to
 * {@link generateTypes} (see its docs for further usage).
 *
 * @remarks
 * This codegen generates interface and enum definitions for a {@link TypeColl}
 * given to {@link generateTypes}. For structs it will also generate memory
 * mapped wrappers with fully typed accessors.
 *
 * @param opts
 */
export const TYPESCRIPT = (opts: Partial<TSOpts> = {}) => {
	const { indent } = <TSOpts>{
		indent: "\t",
		stringType: "slice",
		...opts,
	};

	const SCOPES: [RegExp, RegExp] = [/\{$/, /\}\)?[;,]?$/];

	const gen: ICodeGen = {
		pre: (opts) => `// @ts-ignore possibly includes unused imports
import { Pointer, ${__stringImpl(
			opts
		)}, WasmTypeBase, WasmTypeConstructor } from "${PKG_NAME}";${
			opts.pre ? `\n${opts.pre}` : ""
		}`,

		post: () => opts.post || "",

		doc: (doc, acc) => {
			if (doc.indexOf("\n") !== -1) {
				acc.push("/**", prefixLines(indent + " * ", doc), " */");
			} else {
				acc.push(`/** ${doc} */`);
			}
		},

		enum: (e, _, acc, opts) => {
			const res: string[] = [];
			res.push(`export enum ${e.name} {`);
			for (let v of e.values) {
				let line: string;
				if (!isString(v)) {
					v.doc && gen.doc(v.doc, res);
					line = enumName(opts, v.name);
					if (v.value != null) line += ` = ${v.value}`;
				} else {
					line = enumName(opts, v);
				}
				res.push(line + ",");
			}
			res.push("}", "");
			acc.push(...withIndentation(res, indent, ...SCOPES));
		},

		struct: (struct, types, acc, opts) => {
			const fieldTypes: Record<string, string> = {};
			const $stringImpl = __stringImpl(opts);
			const lines: string[] = [];
			// interface definition
			lines.push(
				`export interface ${struct.name} extends WasmTypeBase {`
			);
			for (let f of struct.fields) {
				if (isPadding(f)) continue;
				f.doc && gen.doc(f.doc, lines);
				const ftype = __fieldType(f, opts);
				fieldTypes[f.name] = ftype;
				lines.push(`${f.name}: ${ftype};`);
			}
			lines.push("}", "");

			const pointerDecls = pointerFields(struct.fields).map((x) => {
				return `let $${x.name}: ${fieldTypes[x.name]} | null = null;`;
			});
			const stringDecls = stringFields(struct.fields).map((x) => {
				const suffix =
					x.tag === "array" || x.tag === "slice" ? "[]" : "";
				return `let $${x.name}: ${$stringImpl}${suffix} | null = null;`;
			});

			// type implementation
			lines.push(
				`export const $${struct.name}: WasmTypeConstructor<${struct.name}> = (mem) => ({`,
				`get align() {`,
				`return ${struct.__align};`,
				`},`,
				`get size() {`,
				`return ${struct.__size};`,
				`},`,
				`instance: (base) => {`,
				...pointerDecls,
				...stringDecls,
				`return {`,
				`get __base() {`,
				`return base;`,
				`},`,
				`get __bytes() {`,
				`return mem.u8.subarray(base, base + ${struct.__size});`,
				`},`
			);

			for (let f of struct.fields) {
				// skip explicit padding fields
				if (isPadding(f)) continue;
				const ftype = fieldTypes[f.name];
				const offset = f.__offset || 0;
				lines.push(`get ${f.name}(): ${ftype} {`);
				const isPrim = isWasmPrim(f.type);
				const isStr = isWasmString(f.type);
				const isConst = isStr ? f.const !== false : !!f.const;
				if (f.tag === "ptr") {
					if (isPrim) {
						const fn = f.len
							? `(base) => mem.${f.type}.subarray(${__addrShift(
									0,
									f.type
							  )}, (${__addrShift(0, f.type)}) + ${f.len})`
							: `(base) => mem.${f.type}[${__addrShift(
									0,
									f.type
							  )}]`;
						lines.push(
							`return $${f.name} || ($${
								f.name
							} = new ${ftype}(mem, ${__addr(offset)}, ${fn}));`
						);
					} else if (isStr) {
						const fn = f.len
							? [
									`(addr) => {`,
									...__mapStringArray(
										"buf",
										$stringImpl,
										f.len!,
										isConst,
										true
									),
									`}`,
							  ]
							: [
									`(addr) => new ${$stringImpl}(mem, addr, ${isConst})`,
							  ];
						lines.push(
							`return $${f.name} || ($${
								f.name
							} = new ${ftype}(mem, ${__addr(offset)},`,
							...fn,
							`));`
						);
					} else {
						const fn = f.len
							? [`(addr) => {`, ...__mapArray(f, f.len), `}`]
							: [`(addr) => new $${f.type}.instance(addr)`];
						lines.push(
							`return $${f.name} || ($${
								f.name
							} = new ${ftype}(mem, ${__addr(offset)},`,
							...fn,
							`));`
						);
					}
				} else if (f.tag === "slice") {
					lines.push(`const len = ${__ptr(offset + 4)};`);
					if (isPrim) {
						lines.push(
							`const addr = ${__ptrShift(offset, f.type)};`,
							`return mem.${f.type}.subarray(addr, addr + len);`
						);
					} else if (isStr) {
						lines.push(
							`const addr = ${__ptr(offset)};`,
							...__mapStringArray(
								"buf",
								$stringImpl,
								"len",
								isConst
							)
						);
					} else {
						lines.push(
							`const addr = ${__ptr(offset)};`,
							...__mapArray(f)
						);
					}
				} else if (f.tag === "array" || f.tag === "vec") {
					if (isPrim) {
						lines.push(
							`const addr = ${__addrShift(offset, f.type)};`,
							`return mem.${f.type}.subarray(addr, addr + ${f.len});`
						);
					} else if (isStr) {
						lines.push(
							`if ($${f.name}) return $${f.name};`,
							`const addr = ${__addr(offset)};`,
							...__mapStringArray(
								f.name,
								$stringImpl,
								f.len!,
								isConst
							)
						);
					} else {
						lines.push(
							`const addr = ${__addr(offset)};`,
							...__mapArray(f, f.len)
						);
					}
				} else {
					let setter: string | undefined;
					if (isPrim) {
						const addr = __mem(f.type, f.__offset!);
						lines.push(`return ${addr};`);
						setter = `${addr} = x`;
					} else if (isStr) {
						lines.push(
							`return $${f.name} || ($${
								f.name
							} = new ${$stringImpl}(mem, ${__addr(
								offset
							)}, ${isConst}));`
						);
					} else if (types[f.type].type === "enum") {
						const tag = (<Enum>types[f.type]).tag;
						const addr = __mem(tag, f.__offset!);
						lines.push(`return ${addr};`);
						setter = `${addr} = x`;
					} else {
						lines.push(
							`return $${f.type}(mem).instance(${__addr(
								offset
							)});`
						);
						setter = `mem.u8.set(x.__bytes, ${__addr(offset)})`;
					}
					// setter
					if (setter) {
						lines.push(
							// close getter
							`},`,
							`set ${f.name}(x: ${fieldTypes[f.name]}) {`,
							`${setter};`
						);
					}
				}
				// close field accessor
				lines.push(`},`);
			}

			lines.push("};", "}", "});", "");
			acc.push(...withIndentation(lines, indent, ...SCOPES));
		},
	};
	return gen;
};

/** @internal */
const __stringImpl = (opts: CodeGenOpts) =>
	isStringSlice(opts.stringType) ? "WasmStringSlice" : "WasmStringPtr";

/** @internal */
const __fieldType = (f: StructField, opts: CodeGenOpts) => {
	const ftype =
		f.tag == "array" ||
		f.tag == "slice" ||
		f.tag === "vec" ||
		(f.tag === "ptr" && f.len)
			? isNumeric(f.type)
				? TYPEDARRAY_CTORS[<Type>f.type].name
				: isBigNumeric(f.type)
				? BIGINT_ARRAY_CTORS[<BigType>f.type].name
				: isWasmString(f.type)
				? __stringImpl(opts) + "[]"
				: f.type + "[]"
			: !f.tag || f.tag === "scalar" || f.tag === "ptr"
			? isBigNumeric(f.type)
				? "bigint"
				: isNumeric(f.type)
				? "number"
				: isWasmString(f.type)
				? __stringImpl(opts)
				: f.type
			: f.type;
	return f.tag === "ptr" ? `Pointer<${ftype}>` : ftype;
};

/** @internal */
const __shift = (type: string) => BIT_SHIFTS[<WasmPrim>type];

/** @internal */
const __addr = (offset: number) => (offset > 0 ? `(base + ${offset})` : "base");

/** @internal */
const __addrShift = (offset: number, shift: string) => {
	const bits = __shift(shift);
	return __addr(offset) + (bits ? " >>> " + bits : "");
};

/** @internal */
const __ptr = (offset: number) => `mem.${USIZE}[${__addrShift(offset, USIZE)}]`;

/** @internal */
const __ptrShift = (offset: number, shift: string) =>
	__ptr(offset) + " >>> " + __shift(shift);

const __mem = (type: string, offset: number) =>
	`mem.${type}[${__addrShift(offset!, type)}]`;

/** @internal */
const __mapArray = (f: StructField, len: NumOrString = "len") => [
	`const inst = $${f.type}(mem);`,
	`const slice: ${f.type}[] = [];`,
	`for(let i = 0; i < ${len}; i++) slice.push(inst.instance(addr + i * ${f.__size}));`,
	`return slice;`,
];

/** @internal */
const __mapStringArray = (
	name: string,
	type: "WasmStringSlice" | "WasmStringPtr",
	len: NumOrString,
	isConst: boolean,
	isLocal = false
) => [
	isLocal ? `const $${name}: ${type}[] = [];` : `$${name} = [];`,
	`for(let i = 0; i < ${len}; i++) $${name}.push(new ${type}(mem, addr + i * ${
		USIZE_SIZE * (type === "WasmStringSlice" ? 2 : 1)
	}, ${isConst}));`,
	`return $${name};`,
];
