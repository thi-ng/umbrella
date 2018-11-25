import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { str } from "@thi.ng/transducers/rfn/str";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { take } from "@thi.ng/transducers/xform/take";
import { vop } from "./vop";

export type Template = (syms: string[], i?: number) => string;

export const indices = (sym: string) => map((i) => `${sym}[${i}]`, range());

/**
 * Takes a vector size `dim`, a code template function and an array of
 * symbol names participating in the template. For each symbol, creates
 * iterator of index lookups (e.g. `a[0]`), forms them into tuples and
 * passes them to template to generate code. If the optional `ret` arg
 * is not `null` (default `"a"`), appends a `return` statement to the
 * result array, using `ret` as return value. Returns array of source
 * code lines.
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
 */
export const assemble = (
    dim: number,
    tpl: Template,
    syms: string,
    ret = "a",
    opJoin = "",
    pre = "",
    post = "") =>

    [
        pre,
        transduce(
            comp(take(dim), mapIndexed((i, x: string[]) => tpl(x, i))),
            str(opJoin),
            tuples.apply(null, [...map(indices, syms.split(","))])
        ),
        post,
        ret !== null ? `return ${ret};` : ""
    ];

export const assembleG = (
    tpl: Template,
    syms: string,
    ret = "a",
    pre?: string,
    post?: string) => [
        pre,
        "for(let i=a.length;--i>=0;) {",
        tpl(syms.split(",").map((x) => `${x}[i]`)),
        "}",
        post,
        ret !== null ? `return ${ret};` : ""
    ];

export const compile = (
    dim: number,
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    opJoin?: string,
    pre?: string,
    post?: string) =>

    <any>new Function(args, assemble(dim, tpl, syms, ret, opJoin, pre, post).join(""));

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
    post?: string) => {

    return new Function(
        hofArgs,
        `return (${args})=>{${assemble(dim, tpl, syms, ret, opJoin, pre, post).join("\n")}}`
    )(...fns);
};

export const compileG = (
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string) =>

    <any>new Function(args, assembleG(tpl, syms, ret, pre, post).join(""));

export const compileGHOF = (
    fns: any[],
    tpl: Template,
    hofArgs: string,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string) =>

    <any>new Function(
        hofArgs,
        `return (${args})=>{${assembleG(tpl, syms, ret, pre, post).join("\n")}}`
    )(...fns);

export const defOp = <M, V>(tpl: Template, args?: string, syms?: string, ret = "o", dispatch = 1): [M, V, V, V] => {
    const fn: any = vop(dispatch);
    args = args || "o,a,b";
    syms = syms || args;
    const $ = (dim) => fn.add(dim, compile(dim, tpl, args, syms, ret));
    fn.default(compileG(tpl, args, syms, ret));
    return [fn, $(2), $(3), $(4)];
};

export const defFnOp = <M, V>(op: string, tpl?: Template, args?: string, syms?: string, ret = "o", dispatch = 1): [M, V, V, V] => {
    const fn: any = vop(dispatch);
    tpl = tpl || (([o, a]) => `${o}=${op}(${a});`);
    args = args || "o,a";
    syms = syms || args;
    const $ = (dim) => fn.add(dim, compile(dim, tpl, args, syms, ret));
    fn.default(compileG(tpl, args, syms, ret));
    return [fn, $(2), $(3), $(4)];
};

export const defHofOp = <M, V>(op, tpl?: Template, args?: string, syms?: string, ret = "o", dispatch = 1): [M, V, V, V] => {
    const fn: any = vop(dispatch);
    tpl = tpl || (([o, a]) => `${o}=op(${a});`);
    args = args || "o,a";
    syms = syms || args;
    const $ = (dim) => compileHOF(dim, [op], tpl, "op", args, syms, ret);
    fn.default(compileGHOF([op], tpl, "op", args, syms, ret));
    return [fn, $(2), $(3), $(4)];
};
