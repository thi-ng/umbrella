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
	isPointer,
	isPointerLike,
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
			types: TypeColl,
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
				size = opts.target.usizeBytes;
			} else if (isSlice(field)) {
				size = opts.target.usizeBytes * 2;
			} else {
				size =
					isNumeric(field.type) || isBigNumeric(field.type)
						? SIZEOF[<Type>field.type]
						: isWasmString(field.type)
						? opts.target.usizeBytes *
						  (isStringSlice(opts.stringType) ? 2 : 1)
						: sizeOf(types[field.type], types, align, opts);
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

		struct: (type, types, align, opts) => {
			if (type.__size) return type.__size;
			let offset = 0;
			for (let f of (<Struct>type).fields) {
				offset = align.offset(offset, f.__align!);
				f.__offset = offset;
				offset += sizeOf(f, types, align, opts);
			}
			return (type.__size = align.size(offset, type.__align!));
		},

		union: (type, types, align, opts) => {
			if (type.__size) return type.__size;
			let maxSize = 0;
			for (let f of (<Union>type).fields) {
				f.__offset = 0;
				maxSize = Math.max(maxSize, sizeOf(f, types, align, opts));
			}
			return (type.__size = align.size(maxSize, type.__align!));
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
			types: TypeColl,
			align: AlignStrategy,
			opts: CodeGenOpts
		) => {
			if (field.__align) return field.__align;
			if (field.type === "usize") {
				field.type = opts.target.usize;
			}
			if (field.pad) return (field.__align = 1);
			return (field.__align = isPointerLike(field)
				? align.align(<Field>{ type: opts.target.usize })
				: isNumeric(field.type) || isBigNumeric(field.type)
				? align.align(field)
				: alignOf(
						types[field.type],
						types,
						selectAlignment(types[field.type]),
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

		struct: (type, types, align, opts) => {
			let maxAlign = 1;
			for (let f of (<Struct>type).fields) {
				maxAlign = Math.max(maxAlign, alignOf(f, types, align, opts));
			}
			return (type.__align = <Pow2>maxAlign);
		},

		union: (type, types, align, opts) => {
			let maxAlign = 1;
			for (let f of (<Union>type).fields) {
				maxAlign = Math.max(maxAlign, alignOf(f, types, align, opts));
			}
			return (type.__align = <Pow2>maxAlign);
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
			types: TypeColl,
			alignImpl: AlignStrategy,
			opts: CodeGenOpts
		) => {
			if (x.__align) return;
			alignOf(x, types, alignImpl, opts);
			sizeOf(x, types, alignImpl, opts);
		},
		struct: (x, types, align, opts) => {
			if (x.__align) return;
			const struct = <Struct>x;
			alignOf(struct, types, align, opts);
			if (struct.auto) {
				struct.fields.sort(
					compareByKey("__align", <any>compareNumDesc)
				);
			}
			for (let f of struct.fields) {
				const type = types[f.type];
				if (type) {
					prepareType(type, types, selectAlignment(type), opts);
				}
			}
			sizeOf(struct, types, align, opts);
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
 * @param types
 *
 * @internal
 */
export const prepareTypes = (types: TypeColl, opts: CodeGenOpts) => {
	for (let id in types) {
		prepareType(types[id], types, selectAlignment(types[id]), opts);
	}
	return types;
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
 * @param types
 * @param codegen
 * @param opts
 */
export const generateTypes = (
	types: TypeColl,
	codegen: ICodeGen,
	opts: Partial<CodeGenOpts> = {}
) => {
	const $opts = <CodeGenOpts>{
		...DEFAULT_CODEGEN_OPTS,
		...opts,
	};
	prepareTypes(types, $opts);
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
	for (let id in types) {
		const type = types[id];
		type.doc && codegen.doc(type.doc, res, $opts);
		codegen[type.type](<any>type, types, res, $opts);
	}
	$opts.post && res.push("", $opts.post);
	if (codegen.post) {
		const post = codegen.post($opts);
		post && res.push("", post);
	}
	return res.join("\n");
};
