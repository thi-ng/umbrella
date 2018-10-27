import { FnAny } from "@thi.ng/api";
import { sign as _sign } from "@thi.ng/math/abs";
import { clamp as _clamp } from "@thi.ng/math/interval";
import { fract as _fract, trunc as _trunc } from "@thi.ng/math/prec";
import { smoothStep as _smoothStep, step as _step } from "@thi.ng/math/step";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { take } from "@thi.ng/transducers/xform/take";
import {
    abs,
    add,
    addN,
    addNew,
    addNewN,
    ceil,
    cos,
    div,
    divN,
    divNew,
    divNewN,
    exp,
    floor,
    fract,
    madd,
    maddN,
    max,
    min,
    mix,
    mixN,
    mixNew,
    mixNewN,
    mul,
    mulN,
    mulNew,
    mulNewN,
    pow,
    powN,
    set,
    setN,
    sign,
    sin,
    smoothStep,
    sqrt,
    step,
    sub,
    subN,
    subNew,
    subNewN,
    trunc,
    Vec,
    VecOpV,
    VecOpVV,
    VecOpVN,
    VecOpNewVV,
    VecOpNewVN,
    rand01,
    rand11,
    log,
    setS,
    rand,
    clamp,
    maddNew,
    maddNewN,
} from "./api";

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
 * @param pre
 * @param post
 */
export const assemble = (
    dim: number,
    tpl: Template,
    syms: string,
    ret = "a",
    pre?: string,
    post?: string) => {

    const src = transduce(
        comp(take(dim), mapIndexed((i, x: string[]) => tpl(x, i))),
        push(),
        pre ? [pre] : [],
        tuples.apply(null, [...map(indices, syms.split(","))])
    );
    post && src.push(post);
    ret !== null && src.push(`return ${ret};`);
    return src;
};

export const compile = (
    dim: number,
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string) =>

    <any>new Function(args, assemble(dim, tpl, syms, ret, pre, post).join(""));

export const compileHOF = (
    dim: number,
    fn: FnAny<any>,
    tpl: Template,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string) => {

    return new Function(
        "fn",
        `return (${args})=>{${assemble(dim, tpl, syms, ret, pre, post).join("\n")}}`
    )(fn);
};

export const genOpFnV = (dim: number, op: string): VecOpV<Vec> =>
    compile(dim, ([a]) => `${a}=${op}(${a});`, "a");

export const genOpHofV = (dim: number, fn) =>
    compileHOF(dim, fn, ([a]) => `${a}=fn(${a});`, "a");

export const genOpVV = (dim: number, op: string): VecOpVV<Vec> =>
    compile(dim, ([a, b]) => `${a}${op}=${b};`, "a,b");

export const genOpFnVV = (dim: number, fn: string): VecOpVV<Vec> =>
    compile(dim, ([a, b]) => `${a}=${fn}(${a},${b});`, "a,b");

export const genOpVN = (dim: number, op: string): VecOpVN<Vec> =>
    compile(dim, ([a]) => `${a}${op}=n;`, "a,n", "a");

export const genOpNewVV = (dim: number, op: string): VecOpNewVV<Vec> =>
    compile(dim, ([a, b, o]) => `${o}=${a}${op}${b};`, "a,b,o=[]", "a,b,o", "o");

export const genOpNewVN = (dim: number, op: string): VecOpNewVN<Vec> =>
    compile(dim, ([a, o]) => `${o}=${a}${op}n;`, "a,n,o=[]", "a,o", "o");

export const genCommon = (dim: number) => {
    set.add(dim, genOpVV(dim, ""));
    setN.add(dim, genOpVN(dim, ""));
    setS.add(dim, compile(dim, ([a], i) => `${a}=xs[${i}];`, "a,...xs", "a"));

    // TODO add IRandom support
    rand01.add(dim, compile(dim, ([a]) => `${a}=Math.random();`, "a"));
    rand11.add(dim, compile(dim, ([a]) => `${a}=Math.random()*2-1;`, "a"));
    rand.add(dim, compile(dim, ([a]) => `${a}=n+(m-n)*Math.random();`, "a,n,m", "a"));

    add.add(dim, genOpVV(dim, "+"));
    sub.add(dim, genOpVV(dim, "-"));
    mul.add(dim, genOpVV(dim, "*"));
    div.add(dim, genOpVV(dim, "/"));

    subNew.add(dim, genOpNewVV(dim, "-"));
    addNew.add(dim, genOpNewVV(dim, "+"));
    mulNew.add(dim, genOpNewVV(dim, "*"));
    divNew.add(dim, genOpNewVV(dim, "/"));

    subN.add(dim, genOpVN(dim, "-"));
    addN.add(dim, genOpVN(dim, "+"));
    mulN.add(dim, genOpVN(dim, "*"));
    divN.add(dim, genOpVN(dim, "/"));

    subNewN.add(dim, genOpNewVN(dim, "-"));
    addNewN.add(dim, genOpNewVN(dim, "+"));
    mulNewN.add(dim, genOpNewVN(dim, "*"));
    divNewN.add(dim, genOpNewVN(dim, "/"));

    madd.add(dim, compile(dim, ([a, b, c]) => `${a}+=${b}*${c};`, "a,b,c"));
    maddN.add(dim, compile(dim, ([a, b]) => `${a}+=${b}*n;`, "a,b,n", "a,b"));
    maddNew.add(dim, compile(dim, ([a, b, c, o]) => `${o}=${a}+${b}*${c};`, "a,b,c,o=[]", "a,b,c,o", "o"));
    maddNewN.add(dim, compile(dim, ([a, b, o]) => `${o}=${a}+${b}*n;`, "a,b,n,o=[]", "a,b,o", "o"));

    abs.add(dim, genOpFnV(dim, "Math.abs"));
    sign.add(dim, genOpHofV(dim, _sign));
    sin.add(dim, genOpFnV(dim, "Math.sin"));
    cos.add(dim, genOpFnV(dim, "Math.cos"));
    floor.add(dim, genOpFnV(dim, "Math.floor"));
    ceil.add(dim, genOpFnV(dim, "Math.ceil"));
    trunc.add(dim, genOpFnV(dim, "Math.trunc"));
    fract.add(dim, genOpHofV(dim, _fract));
    sqrt.add(dim, genOpFnV(dim, "Math.sqrt"));
    log.add(dim, genOpFnVV(dim, "Math.log"));
    exp.add(dim, genOpFnVV(dim, "Math.exp"));
    pow.add(dim, genOpFnVV(dim, "Math.pow"));
    powN.add(dim, compile(dim, ([a]) => `${a}=Math.pow(${a},n);`, "a,n", "a"));

    min.add(dim, genOpFnVV(dim, "Math.min"));
    max.add(dim, genOpFnVV(dim, "Math.max"));
    clamp.add(dim, compileHOF(dim, _clamp, ([a, b, c]) => `${a}=fn(${a},${b},${c});`, "a,b,c"));

    step.add(dim, compileHOF(dim, _step, ([a, e]) => `${a}=fn(${e},${a});`, "a,e"));
    smoothStep.add(dim, compileHOF(dim, _smoothStep, ([a, e1, e2]) => `${a}=fn(${e1},${e2},${a});`, "a,e1,e2"));

    mix.add(dim, compile(dim, ([a, b, c]) => `${a}+=(${b}-${a})*${c};`, "a,b,c"));
    mixN.add(dim, compile(dim, ([a, b]) => `${a}+=(${b}-${a})*n;`, "a,b,n", "a,b"));
    mixNew.add(dim, compile(dim, ([a, b, c, o]) => `${o}=${a}+(${b}-${a})*${c};`, "a,b,c,o=[]", "a,b,c,o", "o"));
    mixNewN.add(dim, compile(dim, ([a, b, o]) => `${o}=${a}+(${b}-${a})*n;`, "a,b,n,o=[]", "a,b,o", "o"));
};
