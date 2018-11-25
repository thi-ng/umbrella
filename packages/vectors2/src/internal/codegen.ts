// import { FnAny } from "@thi.ng/api";
import { sign as _sign } from "@thi.ng/math/abs";
import { clamp as _clamp } from "@thi.ng/math/interval";
import { fract as _fract, trunc as _trunc } from "@thi.ng/math/prec";
import { smoothStep as _smoothStep, step as _step } from "@thi.ng/math/step";
import { SYSTEM } from "@thi.ng/random/system";
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
    asin,
    acos,
    tan,
    atan,
    CommonOps,
} from "../api";

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
    pre?: string,
    post?: string) =>

    <any>new Function(args, assemble(dim, tpl, syms, ret, pre, post).join(""));

export const compileHOF = (
    dim: number,
    fns: any[],
    tpl: Template,
    hofArgs: string,
    args: string,
    syms = args,
    ret = "a",
    pre?: string,
    post?: string) => {

    return new Function(
        hofArgs,
        `return (${args})=>{${assemble(dim, tpl, syms, ret, pre, post).join("\n")}}`
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
    post?: string) => {

    return new Function(
        hofArgs,
        `return (${args})=>{${assembleG(tpl, syms, ret, pre, post).join("\n")}}`
    )(...fns);
};

const tplFnV = (fn) => ([a]) => `${a}=${fn}(${a});`;
const tplHofV = ([a]) => `${a}=fn(${a});`;
const tplVV = (op) => ([a, b]) => `${a}${op}=${b};`
const tplFnVV = (fn) => ([a, b]) => `${a}=${fn}(${a},${b});`
const tplVN = (op) => ([a]) => `${a}${op}=n;`
const tplNewVV = (op) => ([a, b, o]) => `${o}=${a}${op}${b};`
const tplNewVN = (op) => ([a, o]) => `${o}=${a}${op}n;`;
const tplRand01 = ([a]) => `${a}=rnd.float();`
const tplRand11 = ([a]) => `${a}=rnd.norm();`
const tplRand = ([a]) => `${a}=rnd.minmax(n,m);`
const tplMadd = ([a, b, c]) => `${a}+=${b}*${c};`
const tplMaddN = ([a, b]) => `${a}+=${b}*n;`;
const tplMaddNew = ([a, b, c, o]) => `${o}=${a}+${b}*${c};`
const tplMaddNewN = ([a, b, o]) => `${o}=${a}+${b}*n;`;
const tplPowN = ([a]) => `${a}=Math.pow(${a},n);`;
const tplClamp = ([a, b, c]) => `${a}=fn(${a},${b},${c});`;
const tplStep = ([a, e]) => `${a}=fn(${e},${a});`;
const tplSmoothStep = ([a, e1, e2]) => `${a}=fn(${e1},${e2},${a});`;
const tplMix = ([a, b, c]) => `${a}+=(${b}-${a})*${c};`;
const tplMixN = ([a, b]) => `${a}+=(${b}-${a})*n;`;
const tplMixNew = ([a, b, c, o]) => `${o}=${a}+(${b}-${a})*${c};`;
const tplMixNewN = ([a, b, o]) => `${o}=${a}+(${b}-${a})*n;`;

export const genOpFnV = (dim: number, fn: string): VecOpV<Vec> =>
    compile(dim, tplFnV(fn), "a");

export const genOpHofV = (dim: number, fn) =>
    compileHOF(dim, [fn], tplHofV, "fn", "a");

export const genOpVV = (dim: number, op: string): VecOpVV<Vec> =>
    compile(dim, tplVV(op), "a,b");

export const genOpFnVV = (dim: number, fn: string): VecOpVV<Vec> =>
    compile(dim, tplFnVV(fn), "a,b");

export const genOpVN = (dim: number, op: string): VecOpVN<Vec> =>
    compile(dim, tplVN(op), "a,n", "a");

export const genOpNewVV = (dim: number, op: string): VecOpNewVV<Vec> =>
    compile(dim, tplNewVV(op), "a,b,o=[]", "a,b,o", "o");

export const genOpNewVN = (dim: number, op: string): VecOpNewVN<Vec> =>
    compile(dim, tplNewVN(op), "a,n,o=[]", "a,o", "o");

export const genCommon = (dim: number): CommonOps => [
    set.add(dim, genOpVV(dim, "")),
    setN.add(dim, genOpVN(dim, "")),
    setS.add(dim, compile(dim, ([a], i) => `${a}=xs[${i}];`, "a,...xs", "a")),

    rand01.add(dim, compileHOF(dim, [SYSTEM], tplRand01, "_rnd", "a,rnd=_rnd", "a")),
    rand11.add(dim, compileHOF(dim, [SYSTEM], tplRand11, "_rnd", "a,rnd=_rnd", "a")),
    rand.add(dim, compileHOF(dim, [SYSTEM], tplRand, "_rnd", "a,n,m,rnd=_rnd", "a")),

    add.add(dim, genOpVV(dim, "+")),
    sub.add(dim, genOpVV(dim, "-")),
    mul.add(dim, genOpVV(dim, "*")),
    div.add(dim, genOpVV(dim, "/")),

    addNew.add(dim, genOpNewVV(dim, "+")),
    subNew.add(dim, genOpNewVV(dim, "-")),
    mulNew.add(dim, genOpNewVV(dim, "*")),
    divNew.add(dim, genOpNewVV(dim, "/")),

    addN.add(dim, genOpVN(dim, "+")),
    subN.add(dim, genOpVN(dim, "-")),
    mulN.add(dim, genOpVN(dim, "*")),
    divN.add(dim, genOpVN(dim, "/")),

    addNewN.add(dim, genOpNewVN(dim, "+")),
    subNewN.add(dim, genOpNewVN(dim, "-")),
    mulNewN.add(dim, genOpNewVN(dim, "*")),
    divNewN.add(dim, genOpNewVN(dim, "/")),

    madd.add(dim, compile(dim, tplMadd, "a,b,c")),
    maddN.add(dim, compile(dim, tplMaddN, "a,b,n", "a,b")),
    maddNew.add(dim, compile(dim, tplMaddNew, "a,b,c,o=[]", "a,b,c,o", "o")),
    maddNewN.add(dim, compile(dim, tplMaddNewN, "a,b,n,o=[]", "a,b,o", "o")),

    abs.add(dim, genOpFnV(dim, "Math.abs")),
    sign.add(dim, genOpHofV(dim, _sign)),
    sin.add(dim, genOpFnV(dim, "Math.sin")),
    cos.add(dim, genOpFnV(dim, "Math.cos")),
    tan.add(dim, genOpFnV(dim, "Math.tan")),
    asin.add(dim, genOpFnV(dim, "Math.asin")),
    acos.add(dim, genOpFnV(dim, "Math.acos")),
    atan.add(dim, genOpFnV(dim, "Math.atan")),
    floor.add(dim, genOpFnV(dim, "Math.floor")),
    ceil.add(dim, genOpFnV(dim, "Math.ceil")),
    trunc.add(dim, genOpFnV(dim, "Math.trunc")),
    fract.add(dim, genOpHofV(dim, _fract)),
    sqrt.add(dim, genOpFnV(dim, "Math.sqrt")),
    log.add(dim, genOpFnVV(dim, "Math.log")),
    exp.add(dim, genOpFnVV(dim, "Math.exp")),
    pow.add(dim, genOpFnVV(dim, "Math.pow")),
    powN.add(dim, compile(dim, tplPowN, "a,n", "a")),

    min.add(dim, genOpFnVV(dim, "Math.min")),
    max.add(dim, genOpFnVV(dim, "Math.max")),
    clamp.add(dim, compileHOF(dim, [_clamp], tplClamp, "fn", "a,b,c")),

    step.add(dim, compileHOF(dim, [_step], tplStep, "fn", "a,e")),
    smoothStep.add(dim, compileHOF(dim, [_smoothStep], tplSmoothStep, "fn", "a,e1,e2")),

    mix.add(dim, compile(dim, tplMix, "a,b,c")),
    mixN.add(dim, compile(dim, tplMixN, "a,b,n", "a,b")),
    mixNew.add(dim, compile(dim, tplMixNew, "a,b,c,o=[]", "a,b,c,o", "o")),
    mixNewN.add(dim, compile(dim, tplMixNewN, "a,b,n,o=[]", "a,b,o", "o")),
];

export const genGOpFnV = (fn: string): VecOpV<Vec> =>
    compileG(tplFnV(fn), "a");

export const genGOpHofV = (fn) =>
    compileGHOF([fn], tplHofV, "fn", "a");

export const genGOpVV = (op: string): VecOpVV<Vec> =>
    compileG(tplVV(op), "a,b");

export const genGOpFnVV = (fn: string): VecOpVV<Vec> =>
    compileG(tplFnVV(fn), "a,b");

export const genGOpVN = (op: string): VecOpVN<Vec> =>
    compileG(tplVN(op), "a,n", "a");

export const genGOpNewVV = (op: string): VecOpNewVV<Vec> =>
    compileG(tplNewVV(op), "a,b,o=[]", "a,b,o", "o");

export const genGOpNewVN = (op: string): VecOpNewVN<Vec> =>
    compileG(tplNewVN(op), "a,n,o=[]", "a,o", "o");

export const genCommonDefaults = (): CommonOps => [
    set.default(genGOpVV("")),
    setN.default(genGOpVN("")),
    setS.default(compileG(([a]) => `${a}=xs[i];`, "a,...xs", "a")),

    // rand01.default(compileG(tplRand01, "a")),
    // rand11.default(compileG(tplRand11, "a")),
    // rand.default(compileG(tplRand, "a,n,m", "a")),

    rand01.default(compileGHOF([SYSTEM], tplRand01, "_rnd", "a,rnd=_rnd", "a")),
    rand11.default(compileGHOF([SYSTEM], tplRand11, "_rnd", "a,rnd=_rnd", "a")),
    rand.default(compileGHOF([SYSTEM], tplRand, "_rnd", "a,n,m,rnd=_rnd", "a")),

    add.default(genGOpVV("+")),
    sub.default(genGOpVV("-")),
    mul.default(genGOpVV("*")),
    div.default(genGOpVV("/")),

    addNew.default(genGOpNewVV("+")),
    subNew.default(genGOpNewVV("-")),
    mulNew.default(genGOpNewVV("*")),
    divNew.default(genGOpNewVV("/")),

    addN.default(genGOpVN("+")),
    subN.default(genGOpVN("-")),
    mulN.default(genGOpVN("*")),
    divN.default(genGOpVN("/")),

    addNewN.default(genGOpNewVN("+")),
    subNewN.default(genGOpNewVN("-")),
    mulNewN.default(genGOpNewVN("*")),
    divNewN.default(genGOpNewVN("/")),

    madd.default(compileG(tplMadd, "a,b,c")),
    maddN.default(compileG(tplMaddN, "a,b,n", "a,b")),
    maddNew.default(compileG(tplMaddNew, "a,b,c,o=[]", "a,b,c,o", "o")),
    maddNewN.default(compileG(tplMaddNewN, "a,b,n,o=[]", "a,b,o", "o")),

    abs.default(genGOpFnV("Math.abs")),
    sign.default(genGOpHofV(_sign)),
    sin.default(genGOpFnV("Math.sin")),
    cos.default(genGOpFnV("Math.cos")),
    tan.default(genGOpFnV("Math.tan")),
    asin.default(genGOpFnV("Math.asin")),
    acos.default(genGOpFnV("Math.acos")),
    atan.default(genGOpFnV("Math.atan")),
    floor.default(genGOpFnV("Math.floor")),
    ceil.default(genGOpFnV("Math.ceil")),
    trunc.default(genGOpFnV("Math.trunc")),
    fract.default(genGOpHofV(_fract)),
    sqrt.default(genGOpFnV("Math.sqrt")),
    log.default(genGOpFnVV("Math.log")),
    exp.default(genGOpFnVV("Math.exp")),
    pow.default(genGOpFnVV("Math.pow")),
    powN.default(compileG(tplPowN, "a,n", "a")),

    min.default(genGOpFnVV("Math.min")),
    max.default(genGOpFnVV("Math.max")),
    clamp.default(compileGHOF([_clamp], tplClamp, "fn", "a,b,c")),

    step.default(compileGHOF([_step], tplStep, "fn", "a,e")),
    smoothStep.default(compileGHOF([_smoothStep], tplSmoothStep, "fn", "a,e1,e2")),

    mix.default(compileG(tplMix, "a,b,c")),
    mixN.default(compileG(tplMixN, "a,b,n", "a,b")),
    mixNew.default(compileG(tplMixNew, "a,b,c,o=[]", "a,b,c,o", "o")),
    mixNewN.default(compileG(tplMixNewN, "a,b,n,o=[]", "a,b,o", "o")),
];