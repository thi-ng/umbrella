import type { FnU2 } from "@thi.ng/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { zip } from "@thi.ng/transducers/iter/zip";
import { str } from "@thi.ng/transducers/rfn/str";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { take } from "@thi.ng/transducers/xform/take";
import type {
    MultiVecOpVN,
    MultiVecOpVV,
    Template,
    VecOpVN,
    VecOpVV,
} from "../api";
import {
    FN,
    MATH,
    MATH_N,
    SIGNED,
    SIGNED_N,
    UNSIGNED,
    UNSIGNED_N,
} from "./templates";
import { vop } from "./vop";

/** @internal */
export const ARGS_V = "o,a";
/** @internal */
export const ARGS_VV = "o,a,b";
/** @internal */
export const ARGS_VVV = "o,a,b,c";
/** @internal */
export const ARGS_VN = "o,a,n";
/** @internal */
export const ARGS_VNV = "o,a,n,b";
/** @internal */
export const ARGS_VVN = "o,a,b,n";

/** @internal */
export const SARGS_V = "io=0,ia=0,so=1,sa=1";
/** @internal */
export const SARGS_VV = "io=0,ia=0,ib=0,so=1,sa=1,sb=1";
/** @internal */
export const SARGS_VVV = "io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1";

/** @internal */
export const DEFAULT_OUT = "!o&&(o=a);";
/** @internal */
export const NEW_OUT = "!o&&(o=[]);";

/**
 * HOF array index lookup gen to provide optimized versions of:
 *
 * @example
 * ```ts
 * lookup("a")(0) // a[ia]
 * lookup("a")(1) // a[ia * sa]
 * lookup("a")(2) // a[ia + 2 * sa]
 * ```
 *
 * @param sym -
 */
const lookup = (sym: string) => (i: number) =>
    i > 1
        ? `${sym}[i${sym}+${i}*s${sym}]`
        : i == 1
        ? `${sym}[i${sym}+s${sym}]`
        : `${sym}[i${sym}]`;

/**
 * Infinite iterator of strided index lookups for `sym`.
 *
 * @param sym -
 */
const indicesStrided = (sym: string) => map(lookup(sym), range());

/**
 * Infinite iterator of simple (non-strided) index lookups for `sym`.
 *
 * @param sym -
 */
const indices = (sym: string) => map((i) => `${sym}[${i}]`, range());

/**
 * Code generator for loop-unrolled vector operations. Takes a vector
 * size `dim`, a code template function `tpl` and an array of symbol
 * names participating in the template. For each symbol, creates
 * iterator of index lookups (e.g. `a[0]` or `a[ia+k*sa]`), forms them
 * into tuples and passes them to template to generate code and joins
 * generated result with `opJoin` separator (default:
 * `""`).
 *
 * If the optional `ret` arg is not `null` (default `"a"`), appends a
 * `return` statement to the result array, using `ret` as return value.
 * Returns array of source code lines.
 *
 * The optional `pre` and `post` strings can be used to wrap the
 * generated code. `post` will be injected **before** the generated
 * return statement (if not suppressed).
 *
 * @param dim -
 * @param tpl -
 * @param syms -
 * @param ret -
 * @param opJoin -
 * @param pre -
 * @param post -
 * @param strided -
 */
const assemble = (
    dim: number,
    tpl: Template,
    syms: string,
    ret = "a",
    opJoin = "",
    pre = "",
    post = "",
    strided = false
) => [
    pre,
    transduce(
        comp<string[], string[], string>(
            take(dim),
            mapIndexed((i, x) => tpl(x, i))
        ),
        str(opJoin),
        <Iterable<any>>(
            zip.apply(
                null,
                <any>syms.split(",").map(strided ? indicesStrided : indices)
            )
        )
    ),
    post,
    ret !== "" ? `return ${ret};` : "",
];

const assembleG = (
    tpl: Template,
    syms: string,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false
) => [
    pre,
    "for(let i=a.length;--i>=0;) {",
    tpl(
        syms
            .split(",")
            .map(strided ? (x) => `${x}[i${x}+i*s${x}]` : (x) => `${x}[i]`)
    ),
    "}",
    post,
    ret !== null ? `return ${ret};` : "",
];

const assembleS = (
    tpl: Template,
    syms = ARGS_VV,
    ret = "o",
    pre = DEFAULT_OUT,
    post?: string
) => [
    pre,
    "while(k-->0) {",
    tpl(syms.split(",").map((x) => `${x}[i${x}+k*s${x}]`)),
    "}",
    post,
    ret !== null ? `return ${ret};` : "",
];

/** @internal */
export const defaultOut: FnU2<string> = (o, args) =>
    `!${o} && (${o}=${args.split(",")[1]});`;

/** @internal */
export const compile = (
    dim: number,
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    opJoin?: string,
    pre?: string,
    post?: string,
    strided = false
) =>
    <any>(
        new Function(
            args,
            assemble(dim, tpl, syms, ret, opJoin, pre, post, strided).join("")
        )
    );

/** @internal */
export const compileHOF = (
    dim: number,
    fns: any[],
    tpl: Template,
    hofArgs: string,
    args: string,
    syms = args,
    ret = "a",
    opJoin = "",
    pre?: string,
    post?: string,
    strided = false
) => {
    return new Function(
        hofArgs,
        `return (${args})=>{${assemble(
            dim,
            tpl,
            syms,
            ret,
            opJoin,
            pre,
            post,
            strided
        ).join("")}}`
    )(...fns);
};

/** @internal */
export const compileG = (
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false
) =>
    <any>(
        new Function(
            args,
            assembleG(tpl, syms, ret, pre, post, strided).join("")
        )
    );

/** @internal */
export const compileS = (
    tpl: Template,
    args: string,
    syms = args,
    ret?: string,
    pre?: string,
    post?: string
) => <any>new Function(args, assembleS(tpl, syms, ret, pre, post).join(""));

/** @internal */
export const compileGHOF = (
    fns: any[],
    tpl: Template,
    hofArgs: string,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false
) =>
    <any>(
        new Function(
            hofArgs,
            `return (${args})=>{${assembleG(
                tpl,
                syms,
                ret,
                pre,
                post,
                strided
            ).join("")}}`
        )(...fns)
    );

export const defOp = <MULTI, FIXED>(
    tpl: Template,
    args = ARGS_VV,
    syms?: string,
    ret = "o",
    dispatch = 1,
    pre?: string
): [MULTI, ...FIXED[]] => {
    syms = syms || args;
    pre = pre != null ? pre : defaultOut(ret, args);
    const fn: any = vop(dispatch);
    const $ = (dim: number) =>
        fn.add(dim, compile(dim, tpl, args, syms, ret, "", pre));
    fn.default(compileG(tpl, args, syms, ret, pre));
    return [fn, $(2), $(3), $(4)];
};

export const defFnOp = <MULTI, FIXED>(op: string) =>
    defOp<MULTI, FIXED>(FN(op), ARGS_V);

export const defHofOp = <MULTI, FIXED>(
    op: any,
    tpl?: Template,
    args = ARGS_V,
    syms?: string,
    ret = "o",
    dispatch = 1,
    pre?: string
): [MULTI, ...FIXED[]] => {
    const _tpl = tpl || FN("op");
    syms = syms || args;
    pre = pre != null ? pre : defaultOut(ret, args);
    const $ = (dim: number) =>
        compileHOF(dim, [op], _tpl, "op", args, syms, ret, "", pre);
    const fn: any = vop(dispatch);
    fn.default(compileGHOF([op], _tpl, "op", args, syms, ret, pre));
    return [fn, $(2), $(3), $(4)];
};

export const defOpS = <GENERIC, FIXED>(
    tpl: Template,
    args = ARGS_VV,
    idxArgs = SARGS_VV,
    syms = ARGS_VV,
    ret = "o",
    pre?: string,
    sizes = [2, 3, 4]
): [GENERIC, ...FIXED[]] => [
    compileS(tpl, `${args},k,${idxArgs}`, syms, ret, pre),
    ...sizes.map((dim) =>
        compile(
            dim,
            tpl,
            `${args},${idxArgs}`,
            syms,
            ret,
            "",
            pre != null ? pre : defaultOut(ret, args),
            "",
            true
        )
    ),
];

export const defHofOpS = <GENERIC, FIXED>(
    op: any,
    tpl: Template,
    args = ARGS_VV,
    idxArgs = SARGS_VV,
    syms = ARGS_VV,
    ret = "o",
    pre?: string,
    sizes = [2, 3, 4]
): [GENERIC, ...FIXED[]] => [
    new Function(
        "op",
        `return (${args},k,${idxArgs})=>{${assembleS(tpl, syms, ret, pre).join(
            ""
        )}}`
    )(op),
    ...sizes.map((dim) =>
        compileHOF(
            dim,
            [op],
            tpl,
            "op",
            `${args},${idxArgs}`,
            syms,
            ret,
            "",
            pre != null ? pre : defaultOut(ret, args),
            "",
            true
        )
    ),
];

export const defMathOp = (op: string) => defOp<MultiVecOpVV, VecOpVV>(MATH(op));

export const defMathOpN = (op: string) =>
    defOp<MultiVecOpVN, VecOpVN>(MATH_N(op), ARGS_VN);

export const defBitOp = (op: string, signed = false) =>
    defOp<MultiVecOpVV, VecOpVV>((signed ? SIGNED : UNSIGNED)(op));

export const defBitOpN = (op: string, signed = false) =>
    defOp<MultiVecOpVN, VecOpVN>((signed ? SIGNED_N : UNSIGNED_N)(op), ARGS_VN);
