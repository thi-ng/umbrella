import {
    comp,
    map,
    mapIndexed,
    range,
    str,
    take,
    transduce,
    tuples
} from "@thi.ng/transducers";
import {
    MultiVecOpVN,
    MultiVecOpVV,
    VecOpVN,
    VecOpVV
} from "../api";
import { FN, MATH, MATH_N } from "./templates";
import { vop } from "./vop";

export const ARGS_V = "o,a";
export const ARGS_VV = "o,a,b";
export const ARGS_VVV = "o,a,b,c";
export const ARGS_VN = "o,a,n";
export const ARGS_VVN = "o,a,b,n";

export const SARGS_V = "io=0,ia=0,so=1,sa=1";
export const SARGS_VV = "io=0,ia=0,ib=0,so=1,sa=1,sb=1";
export const SARGS_VVV = "io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1";

export const DEFAULT_OUT = "!o&&(o=a);";
export const NEW_OUT = "!o&&(o=[]);";

export type Template = (syms: string[], i?: number) => string;

/**
 * HOF array index lookup gen to provide optimized versions of:
 *
 * ```
 * lookup("a")(0) // a[ia]
 * lookup("a")(1) // a[ia * sa]
 * lookup("a")(2) // a[ia + 2 * sa]
 * ```
 *
 * @param sym
 */
const lookup =
    (sym: string) =>
        (i) => i > 1 ?
            `${sym}[i${sym}+${i}*s${sym}]` :
            i == 1 ? `${sym}[i${sym}+s${sym}]` :
                `${sym}[i${sym}]`;

/**
 * Infinite iterator of strided index lookups for `sym`.
 *
 * @param sym
 */
const indicesStrided =
    (sym: string) => map(lookup(sym), range());

/**
 * Infinite iterator of simple (non-strided) index lookups for `sym`.
 *
 * @param sym
 */
const indices =
    (sym: string) => map((i) => `${sym}[${i}]`, range());

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
 * @param dim
 * @param tpl
 * @param syms
 * @param ret
 * @param opJoin
 * @param pre
 * @param post
 * @param strided
 */
const assemble = (
    dim: number,
    tpl: Template,
    syms: string,
    ret = "a",
    opJoin = "",
    pre = "",
    post = "",
    strided = false) =>

    [
        pre,
        transduce(
            comp(
                take(dim),
                mapIndexed((i, x: string[]) => tpl(x, i))
            ),
            str(opJoin),
            tuples.apply(
                null,
                syms.split(",").map(
                    strided ?
                        indicesStrided :
                        indices,
                )
            )
        ),
        post,
        ret !== null ? `return ${ret};` : ""
    ];

const assembleG = (
    tpl: Template,
    syms: string,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false) => [
        pre,
        "for(let i=a.length;--i>=0;) {",
        tpl(
            syms.split(",").map(
                strided ?
                    (x) => `${x}[i${x}+i*s${x}]` :
                    (x) => `${x}[i]`
            )
        ),
        "}",
        post,
        ret !== null ? `return ${ret};` : ""
    ];

export const defaultOut =
    (o: string, args: string) => `!${o} && (${o}=${args.split(",")[1]});`

export const compile = (
    dim: number,
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    opJoin?: string,
    pre?: string,
    post?: string,
    strided = false) =>

    <any>new Function(
        args,
        assemble(dim, tpl, syms, ret, opJoin, pre, post, strided).join("")
    );

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
    strided = false) => {

    return new Function(
        hofArgs,
        `return (${args})=>{${
        assemble(dim, tpl, syms, ret, opJoin, pre, post, strided).join("")
        }}`
    )(...fns);
};

export const compileG = (
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false) =>

    <any>new Function(
        args,
        assembleG(tpl, syms, ret, pre, post, strided).join("")
    );

export const compileGHOF = (
    fns: any[],
    tpl: Template,
    hofArgs: string,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string,
    strided = false) =>

    <any>new Function(
        hofArgs,
        `return (${args})=>{${
        assembleG(tpl, syms, ret, pre, post, strided).join("")
        }}`
    )(...fns);

export const defOp = <M, V>(
    tpl: Template,
    args = ARGS_VV,
    syms?: string,
    ret = "o",
    dispatch = 1,
    pre?: string): [M, V, V, V] => {

    syms = syms || args;
    pre = pre != null ? pre : defaultOut(ret, args);
    const fn: any = vop(dispatch);
    const $ = (dim) => fn.add(dim, compile(dim, tpl, args, syms, ret, "", pre));
    fn.default(compileG(tpl, args, syms, ret, pre));
    return [fn, $(2), $(3), $(4)];
};

export const defFnOp =
    <M, V>(op: string) => defOp<M, V>(FN(op), ARGS_V);

export const defHofOp = <M, V>(
    op,
    tpl?: Template,
    args = ARGS_V,
    syms?: string,
    ret = "o",
    dispatch = 1,
    pre?: string): [M, V, V, V] => {

    tpl = tpl || FN("op");
    syms = syms || args;
    pre = pre != null ? pre : defaultOut(ret, args);
    const $ = (dim) => compileHOF(dim, [op], tpl, "op", args, syms, ret, "", pre);
    const fn: any = vop(dispatch);
    fn.default(compileGHOF([op], tpl, "op", args, syms, ret, pre));
    return [fn, $(2), $(3), $(4)];
};

export const defOpS = <V>(
    tpl: Template,
    args = `${ARGS_VV},${SARGS_VV}`,
    syms = ARGS_VV,
    ret = "o",
    pre?: string,
    sizes = [2, 3, 4]): V[] =>

    sizes.map(
        (dim) => compile(dim, tpl, args, syms, ret, "", pre != null ? pre : defaultOut(ret, args), "", true)
    );

export const defMathOp =
    (op: string) => defOp<MultiVecOpVV, VecOpVV>(MATH(op));

export const defMathNOp =
    (op: string) => defOp<MultiVecOpVN, VecOpVN>(MATH_N(op), ARGS_VN);
