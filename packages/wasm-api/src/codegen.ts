import { SIZEOF, Type } from "@thi.ng/api/typedarray";
import type { Pow2 } from "@thi.ng/binary";
import { compareByKey } from "@thi.ng/compare/keys";
import { compareNumDesc } from "@thi.ng/compare/numeric";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	AlignStrategy,
	CodeGenOpts,
	Enum,
	Field,
	FuncPointer,
	ICodeGen,
	PKG_NAME,
	Struct,
	TopLevelType,
	TypeColl,
	Union,
	WASM32,
} from "./api.js";
import { selectAlignment } from "./codegen/align.js";
import {
	isBigNumeric,
	isNumeric,
	isOpaque,
	isPointer,
	isPointerLike,
	isSizeT,
	isSlice,
	isStringSlice,
	isWasmString,
} from "./codegen/utils.js";

export const DEFAULT_CODEGEN_OPTS: CodeGenOpts = {
	debug: false,
	header: true,
	lineWidth: 80,
	stringType: "slice",
	target: WASM32,
	uppercaseEnums: true,
};

const sizeOf = defmulti<
	TopLevelType | Field,
	TypeColl,
	AlignStrategy,
	CodeGenOpts,
	number
>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (
			field: Field,
			coll: TypeColl,
			align: AlignStrategy,
			opts: CodeGenOpts
		) => {
			if (field.__size) return field.__size;
			if (field.pad != null) {
				field.pad < 1 && illegalArgs(`pad size must be > 0`);
				return (field.__size = field.pad);
			}
			let size = 0;
			if (isPointer(field)) {
				size = opts.target.sizeBytes;
			} else if (isSlice(field)) {
				size = opts.target.sizeBytes * 2;
			} else {
				size =
					isNumeric(field.type) || isBigNumeric(field.type)
						? SIZEOF[<Type>field.type]
						: isWasmString(field.type)
						? opts.target.sizeBytes *
						  (isStringSlice(opts.stringType) ? 2 : 1)
						: isOpaque(field.type)
						? opts.target.sizeBytes
						: sizeOf(coll[field.type], coll, align, opts);
				if (field.tag == "array" || field.tag === "vec") {
					size *= field.len!;
					if (field.sentinel !== undefined && field.tag === "array") {
						size += SIZEOF[<Type>field.type];
					}
				}
			}
			return (field.__size = align.size(size, field.__align!));
		},

		enum: (type) => {
			if (type.__size) return type.__size;
			return (type.__size = SIZEOF[(<Enum>type).tag]);
		},

		struct: (type, coll, align, opts) => {
			if (type.__size) return type.__size;
			let offset = 0;
			for (let f of (<Struct>type).fields) {
				offset = align.offset(offset, f.__align!);
				f.__offset = offset;
				offset += sizeOf(f, coll, align, opts);
			}
			return (type.__size = align.size(offset, type.__align!));
		},

		union: (type, coll, align, opts) => {
			if (type.__size) return type.__size;
			let maxSize = 0;
			for (let f of (<Union>type).fields) {
				f.__offset = 0;
				maxSize = Math.max(maxSize, sizeOf(f, coll, align, opts));
			}
			return (type.__size = align.size(maxSize, type.__align!));
		},

		funcptr: (type, _, __, opts) => {
			return type.__size || (type.__size = opts.target.sizeBytes);
		},
	}
);

const alignOf = defmulti<
	TopLevelType | Field,
	TypeColl,
	AlignStrategy,
	CodeGenOpts,
	Pow2
>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (
			field: Field,
			coll: TypeColl,
			align: AlignStrategy,
			opts: CodeGenOpts
		) => {
			if (field.__align) return field.__align;
			if (field.pad) return (field.__align = 1);
			if (isSizeT(field.type)) {
				field.type = opts.target[field.type];
			}
			return (field.__align = isPointerLike(field, coll)
				? align.align(<Field>{ type: opts.target.usize })
				: isNumeric(field.type) || isBigNumeric(field.type)
				? align.align(field)
				: alignOf(
						coll[field.type],
						coll,
						selectAlignment(coll[field.type]),
						opts
				  ));
		},

		enum: (type, _, align) => {
			const e = <Enum>type;
			if (!e.tag) e.tag = "i32";
			return (e.__align = align.align(<Field>{
				type: (<Enum>e).tag,
			}));
		},

		struct: (type, coll, align, opts) => {
			let maxAlign = 1;
			for (let f of (<Struct>type).fields) {
				maxAlign = Math.max(maxAlign, alignOf(f, coll, align, opts));
			}
			return (type.__align = <Pow2>maxAlign);
		},

		union: (type, coll, align, opts) => {
			let maxAlign = 1;
			for (let f of (<Union>type).fields) {
				maxAlign = Math.max(maxAlign, alignOf(f, coll, align, opts));
			}
			return (type.__align = <Pow2>maxAlign);
		},

		funcptr: (type, coll, align, opts) => {
			if (type.__align) return type.__align;
			const ptr = <FuncPointer>type;
			if (ptr.rtype !== "void") {
				sizeOf(<Field>ptr.rtype, coll, align, opts);
			}
			for (let a of ptr.args) {
				alignOf(a, coll, align, opts);
			}
			return (type.__align = align.align(<Field>{
				type: opts.target.usize,
			}));
		},
	}
);

const prepareType = defmulti<
	TopLevelType,
	TypeColl,
	AlignStrategy,
	CodeGenOpts,
	void
>(
	(x) => x.type,
	{},
	{
		[DEFAULT]: (
			x: TopLevelType,
			coll: TypeColl,
			alignImpl: AlignStrategy,
			opts: CodeGenOpts
		) => {
			if (x.__align) return;
			alignOf(x, coll, alignImpl, opts);
			sizeOf(x, coll, alignImpl, opts);
		},
		struct: (x, coll, align, opts) => {
			if (x.__align) return;
			const struct = <Struct>x;
			alignOf(struct, coll, align, opts);
			if (struct.auto) {
				struct.fields.sort(
					compareByKey("__align", <any>compareNumDesc)
				);
			}
			for (let f of struct.fields) {
				const type = coll[f.type];
				if (type) {
					prepareType(type, coll, selectAlignment(type), opts);
				}
			}
			sizeOf(struct, coll, align, opts);
		},
	}
);

/**
 * Takes a type collection and analyzes each analyzed to compute individual
 * alignments and sizes.
 *
 * @remarks
 * This function is idempotent and called automatically by
 * {@link generateTypes}. Only exported for dev/debug purposes.
 *
 * @param coll
 *
 * @internal
 */
export const prepareTypes = (coll: TypeColl, opts: CodeGenOpts) => {
	for (let id in coll) {
		prepareType(coll[id], coll, selectAlignment(coll[id]), opts);
	}
	return coll;
};

/**
 * Code generator main entry point. Takes an object of {@link TopLevelType}
 * definitions, an actual code generator implementation for a single target
 * language and (optional) global codegen options. Returns generated source code
 * for all given types as a single string.
 *
 * @remarks
 * Before actual code generation the types are first analyzed to compute their
 * alignments and sizes. This is only ever done once (idempotent), even if
 * `generateTypes()` is called multiple times for different target langs.
 *
 * @param coll
 * @param codegen
 * @param opts
 */
export const generateTypes = (
	coll: TypeColl,
	codegen: ICodeGen,
	opts: Partial<CodeGenOpts> = {}
) => {
	const $opts = <CodeGenOpts>{
		...DEFAULT_CODEGEN_OPTS,
		...opts,
	};
	prepareTypes(coll, $opts);
	const res: string[] = [];
	if ($opts.header) {
		codegen.doc(
			`Generated by ${PKG_NAME} at ${new Date().toISOString()} - DO NOT EDIT!`,
			res,
			$opts,
			true
		);
		res.push("");
	}
	if (codegen.pre) {
		const pre = codegen.pre($opts);
		pre && res.push(pre, "");
	}
	$opts.pre && res.push($opts.pre, "");
	for (let id in coll) {
		const type = coll[id];
		if (type.skip?.includes(codegen.id)) continue;
		type.doc && codegen.doc(type.doc, res, $opts);
		codegen[type.type](<any>type, coll, res, $opts);
	}
	$opts.post && res.push("", $opts.post);
	if (codegen.post) {
		const post = codegen.post($opts);
		post && res.push("", post);
	}
	return res.join("\n");
};
