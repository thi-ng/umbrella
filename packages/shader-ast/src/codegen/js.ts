import {
    Fn,
    Fn2,
    Fn3,
    Fn4,
    Fn5,
    Fn6
} from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import {
    clamp,
    deg,
    fract,
    mix,
    rad,
    smoothStep,
    step
} from "@thi.ng/math";
import * as m from "@thi.ng/matrices";
import * as v from "@thi.ng/vectors";
import {
    Func,
    Lit,
    Operator,
    Scope,
    Swizzle,
    Sym,
    Term
} from "../api";
import { isMat, isVec } from "../ast";
import { defTarget } from "./target";

type Mat = m.Mat;
type Vec = v.Vec;

export interface JSTarget extends Fn<Term<any>, string> {
    /**
     * Compiles given AST to JavaScript, using optional `env` as backend
     * for various operators / builtins. If `env` is not given the
     * bundled `JS_DEFAULT_ENV` is used (based on thi.ng/vectors and
     * thi.ng/matrices packages).
     *
     * Any functions defined in the given AST will be exported using
     * their defined name via the returned object.
     *
     * ```
     * const js = targetJS();
     * const module = js.compile(
     *   defn("f32", "foo", [["f32"]], (x)=> [ret(mul(x, float(10)))])
     * );
     *
     * module.foo(42)
     * // 420
     *
     * module.foo.toString()
     * // function foo(_sym0) {
     * // return (_sym0 * 10);
     * // }
     * ```
     *
     * @param tree
     * @param env
     */
    compile(tree: Term<any>, env?: JSEnv): any;
}

export interface JSBuiltins<T> {
    abs: Fn<T, T>;
    acos: Fn<T, T>;
    asin: Fn<T, T>;
    atan: Fn<T, T>;
    ceil: Fn<T, T>;
    clamp: Fn3<T, T, T, T>;
    cos: Fn<T, T>;
    degrees: Fn<T, T>;
    exp: Fn<T, T>;
    exp2: Fn<T, T>;
    floor: Fn<T, T>;
    fract: Fn<T, T>;
    inversesqrt: Fn<T, T>;
    log: Fn<T, T>;
    log2: Fn<T, T>;
    max: Fn2<T, T, T>;
    min: Fn2<T, T, T>;
    mix: Fn3<T, T, T, T>;
    mixn: Fn3<T, T, number, T>;
    mod: Fn2<T, T, T>;
    modn: Fn2<T, number, T>;
    pow: Fn2<T, T, T>;
    radians: Fn<T, T>;
    sign: Fn<T, T>;
    sin: Fn<T, T>;
    smoothstep: Fn3<T, T, T, T>;
    sqrt: Fn<T, T>;
    step: Fn2<T, T, T>;
    tan: Fn<T, T>;
}

export interface JSBuiltinsMath<T> {
    sub1: Fn<T, T>;
    add: Fn2<T, T, T>;
    sub: Fn2<T, T, T>;
    mul: Fn2<T, T, T>;
    div: Fn2<T, T, T>;
}

export interface JSBuiltinsVecScalar<T> {
    addvn: Fn2<T, number, T>;
    subvn: Fn2<T, number, T>;
    mulvn: Fn2<T, number, T>;
    divvn: Fn2<T, number, T>;
    addnv: Fn2<number, T, T>;
    subnv: Fn2<number, T, T>;
    mulnv: Fn2<number, T, T>;
    divnv: Fn2<number, T, T>;
}

export interface JSBuiltinsVec
    extends JSBuiltins<Vec>,
        JSBuiltinsMath<Vec>,
        JSBuiltinsVecScalar<Vec> {
    dot: Fn2<Vec, Vec, number>;
    normalize: Fn<Vec, Vec>;
    length: Fn<Vec, number>;
    distance: Fn2<Vec, Vec, number>;
}

export interface JSBuiltinsVec3 extends JSBuiltinsVec {
    cross: Fn2<Vec, Vec, Vec>;
}

export interface JSBuiltinsMat
    extends JSBuiltinsMath<Mat>,
        JSBuiltinsVecScalar<Mat> {
    mulm: Fn2<Mat, Mat, Mat>;
    mulvm: Fn2<Vec, Mat, Vec>;
    mulmv: Fn2<Mat, Vec, Vec>;
}

export interface JSEnv {
    vec2n: Fn<number, Vec>;
    vec3n: Fn<number, Vec>;
    vec3vn: Fn2<Vec, number, Vec>;
    vec4n: Fn<number, Vec>;
    vec4vn: Fn2<Vec, number, Vec>;
    vec4vv: Fn2<Vec, Vec, Vec>;
    mat2n: Fn<number, Mat>;
    mat2vv: Fn2<Vec, Vec, Mat>;
    mat3n: Fn<number, Mat>;
    mat3vvv: Fn3<Vec, Vec, Vec, Mat>;
    mat4n: Fn<number, Mat>;
    mat4vvvv: Fn4<Vec, Vec, Vec, Vec, Mat>;
    // swizzle1: Fn2<Vec, number, number>;
    swizzle2: Fn3<Vec, number, number, Vec>;
    swizzle3: Fn4<Vec, number, number, number, Vec>;
    swizzle4: Fn5<Vec, number, number, number, number, Vec>;
    // set_swizzle1: Fn3<Vec, number, number, Vec>;
    set_swizzle2: Fn4<Vec, Vec, number, number, Vec>;
    set_swizzle3: Fn5<Vec, Vec, number, number, number, Vec>;
    set_swizzle4: Fn6<Vec, Vec, number, number, number, number, Vec>;
    f32: JSBuiltins<number>;
    vec2: JSBuiltinsVec;
    vec3: JSBuiltinsVec3;
    vec4: JSBuiltinsVec;
    mat2: JSBuiltinsMat;
    mat3: JSBuiltinsMat;
    mat4: JSBuiltinsMat;
}

export const JS_DEFAULT_ENV: JSEnv = {
    vec2n: (n) => v.setN2([], n),
    vec3n: (n) => v.setN3([], n),
    vec4n: (n) => v.setN4([], n),
    vec3vn: (a, n) => v.setVN3([], a, n),
    vec4vn: (a, n) => v.setVN4([], a, n),
    vec4vv: (a, b) => v.setVV4([], a, b),
    mat2n: (n) => m.mat22n([], n),
    mat2vv: (a, b) => m.mat22v([], a, b),
    mat3n: (n) => m.mat33n([], n),
    mat3vvv: (a, b, c) => m.mat33v([], a, b, c),
    mat4n: (n) => m.mat44n([], n),
    mat4vvvv: (a, b, c, d) => m.mat44v([], a, b, c, d),
    swizzle2: (a, b, c) => v.swizzle2([], a, b, c),
    swizzle3: (a, b, c, d) => v.swizzle3([], a, b, c, d),
    swizzle4: (a, b, c, d, e) => v.swizzle4([], a, b, c, d, e),
    set_swizzle2: v.setSwizzle2,
    set_swizzle3: v.setSwizzle3,
    set_swizzle4: v.setSwizzle4,
    f32: {
        abs: Math.abs,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        ceil: Math.ceil,
        clamp,
        cos: Math.cos,
        degrees: deg,
        exp: Math.exp,
        exp2: (x) => Math.pow(2, x),
        floor: Math.floor,
        fract,
        inversesqrt: (x) => 1 / Math.sqrt(x),
        log: Math.log,
        log2: Math.log2,
        max: Math.max,
        min: Math.min,
        mix,
        mixn: mix,
        mod: (a, b) => a % b,
        modn: (a, b) => a % b,
        pow: Math.pow,
        radians: rad,
        sign: Math.sign,
        sin: Math.sin,
        smoothstep: smoothStep,
        sqrt: Math.sqrt,
        step,
        tan: Math.tan
    },
    vec2: {
        abs: (a) => v.abs2([], a),
        acos: (a) => v.acos2([], a),
        add: (a, b) => v.add2([], a, b),
        addnv: (a, b) => v.addN2([], b, a),
        addvn: (a, b) => v.addN2([], a, b),
        asin: (a) => v.asin2([], a),
        atan: (a) => v.atan2([], a),
        ceil: (a) => v.ceil2([], a),
        clamp: (x, a, b) => v.clamp2([], x, a, b),
        cos: (a) => v.cos2([], a),
        degrees: (a) => v.degrees2([], a),
        distance: v.dist,
        div: (a, b) => v.div2([], a, b),
        divnv: (a, b) => v.mulN2([], b, 1 / a),
        divvn: (a, b) => v.divN2([], a, b),
        dot: (a, b) => v.dot2(a, b),
        exp: (a) => v.exp2([], a),
        exp2: (a) => v.exp_22([], a),
        floor: (a) => v.floor2([], a),
        fract: (a) => v.fract2([], a),
        inversesqrt: (a) => v.invSqrt2([], a),
        length: v.mag,
        log: (a) => v.log2([], a),
        log2: (a) => v.log_22([], a),
        max: (a, b) => v.max2([], a, b),
        min: (a, b) => v.min2([], a, b),
        mix: (a, b, t) => v.mix2([], a, b, t),
        mixn: (a, b, t) => v.mixN2([], a, b, t),
        mod: (a, b) => v.mod2([], a, b),
        modn: (a, b) => v.modN2([], a, b),
        mul: (a, b) => v.mul2([], a, b),
        mulnv: (a, b) => v.mulN2([], b, a),
        mulvn: (a, b) => v.mulN2([], a, b),
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow2([], a, b),
        radians: (a) => v.radians2([], a),
        sign: (a) => v.sign2([], a),
        sin: (a) => v.sin2([], a),
        smoothstep: (a, b, t) => v.smoothStep2([], a, b, t),
        sqrt: (a) => v.sqrt2([], a),
        step: (a, b) => v.step2([], a, b),
        sub: (a, b) => v.sub2([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => v.sub2(null, [a, a], b),
        subvn: (a, b) => v.subN2([], a, b),
        tan: (a) => v.tan2([], a)
    },
    vec3: {
        abs: (a) => v.abs3([], a),
        acos: (a) => v.acos3([], a),
        add: (a, b) => v.add3([], a, b),
        addnv: (a, b) => v.addN3([], b, a),
        addvn: (a, b) => v.addN3([], a, b),
        asin: (a) => v.asin3([], a),
        atan: (a) => v.atan3([], a),
        ceil: (a) => v.ceil3([], a),
        clamp: (x, a, b) => v.clamp3([], x, a, b),
        cos: (a) => v.cos3([], a),
        cross: (a, b) => v.cross3([], a, b),
        degrees: (a) => v.degrees3([], a),
        distance: v.dist,
        div: (a, b) => v.div3([], a, b),
        divnv: (a, b) => v.mulN3([], b, 1 / a),
        divvn: (a, b) => v.divN3([], a, b),
        dot: (a, b) => v.dot3(a, b),
        exp: (a) => v.exp3([], a),
        exp2: (a) => v.exp_23([], a),
        floor: (a) => v.floor3([], a),
        fract: (a) => v.fract3([], a),
        inversesqrt: (a) => v.invSqrt3([], a),
        length: v.mag,
        log: (a) => v.log3([], a),
        log2: (a) => v.log_23([], a),
        max: (a, b) => v.max3([], a, b),
        min: (a, b) => v.min3([], a, b),
        mix: (a, b, t) => v.mix3([], a, b, t),
        mixn: (a, b, t) => v.mixN3([], a, b, t),
        mod: (a, b) => v.mod3([], a, b),
        modn: (a, b) => v.modN3([], a, b),
        mul: (a, b) => v.mul3([], a, b),
        mulnv: (a, b) => v.mulN3([], b, a),
        mulvn: (a, b) => v.mulN3([], a, b),
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow3([], a, b),
        radians: (a) => v.radians3([], a),
        sign: (a) => v.sign3([], a),
        sin: (a) => v.sin3([], a),
        smoothstep: (a, b, t) => v.smoothStep3([], a, b, t),
        sqrt: (a) => v.sqrt3([], a),
        step: (a, b) => v.step3([], a, b),
        sub: (a, b) => v.sub3([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => v.sub3(null, v.vec3n(a), b),
        subvn: (a, b) => v.subN3([], a, b),
        tan: (a) => v.tan3([], a)
    },
    vec4: {
        abs: (a) => v.abs4([], a),
        acos: (a) => v.acos4([], a),
        add: (a, b) => v.add4([], a, b),
        addnv: (a, b) => v.addN4([], b, a),
        addvn: (a, b) => v.addN4([], a, b),
        asin: (a) => v.asin4([], a),
        atan: (a) => v.atan4([], a),
        ceil: (a) => v.ceil4([], a),
        clamp: (x, a, b) => v.clamp4([], x, a, b),
        cos: (a) => v.cos4([], a),
        degrees: (a) => v.degrees4([], a),
        distance: v.dist,
        div: (a, b) => v.div4([], a, b),
        divnv: (a, b) => v.mulN4([], b, 1 / a),
        divvn: (a, b) => v.divN4([], a, b),
        dot: (a, b) => v.dot4(a, b),
        exp: (a) => v.exp4([], a),
        exp2: (a) => v.exp_24([], a),
        floor: (a) => v.floor4([], a),
        fract: (a) => v.fract4([], a),
        inversesqrt: (a) => v.invSqrt4([], a),
        length: v.mag,
        log: (a) => v.log4([], a),
        log2: (a) => v.log_24([], a),
        max: (a, b) => v.max4([], a, b),
        min: (a, b) => v.min4([], a, b),
        mix: (a, b, t) => v.mix4([], a, b, t),
        mixn: (a, b, t) => v.mixN4([], a, b, t),
        mod: (a, b) => v.mod4([], a, b),
        modn: (a, b) => v.modN4([], a, b),
        mul: (a, b) => v.mul2([], a, b),
        mulnv: (a, b) => v.mulN4([], b, a),
        mulvn: (a, b) => v.mulN4([], a, b),
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow4([], a, b),
        radians: (a) => v.radians4([], a),
        sign: (a) => v.sign4([], a),
        sin: (a) => v.sin4([], a),
        smoothstep: (a, b, t) => v.smoothStep4([], a, b, t),
        sqrt: (a) => v.sqrt4([], a),
        step: (a, b) => v.step4([], a, b),
        sub: (a, b) => v.sub2([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => v.sub4(null, v.vec4n(a), b),
        subvn: (a, b) => v.subN4([], a, b),
        tan: (a) => v.tan4([], a)
    },
    mat2: {
        add: (a, b) => m.add22([], a, b),
        addnv: (a, b) => m.addN22([], b, a),
        addvn: (a, b) => m.addN22([], a, b),
        div: (a, b) => m.div22([], a, b),
        divnv: (a, b) => m.mulN22([], b, 1 / a),
        divvn: (a, b) => m.divN22([], a, b),
        mul: (a, b) => m.mul22([], a, b),
        mulm: (a, b) => m.mulM22([], a, b),
        mulmv: (a, b) => m.mulV22([], a, b),
        mulnv: (a, b) => m.mulN22([], b, a),
        mulvm: (a, b) => m.mulVM22([], a, b),
        mulvn: (a, b) => m.mulN22([], a, b),
        sub: (a, b) => m.sub22([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => m.sub22(null, v.vec4n(a), b),
        subvn: (a, b) => m.subN22([], a, b)
    },
    mat3: {
        add: (a, b) => m.add33([], a, b),
        addnv: (a, b) => m.addN33([], b, a),
        addvn: (a, b) => m.addN33([], a, b),
        div: (a, b) => m.div33([], a, b),
        divnv: (a, b) => m.mulN33([], b, 1 / a),
        divvn: (a, b) => m.divN33([], a, b),
        mul: (a, b) => m.mul33([], a, b),
        mulm: (a, b) => m.mulM33([], a, b),
        mulmv: (a, b) => m.mulV33([], a, b),
        mulnv: (a, b) => m.mulN33([], b, a),
        mulvm: (a, b) => m.mulVM33([], a, b),
        mulvn: (a, b) => m.mulN33([], a, b),
        sub: (a, b) => m.sub33([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => m.sub33(null, v.vecOf(9, a), b),
        subvn: (a, b) => m.subN33([], a, b)
    },
    mat4: {
        add: (a, b) => m.add44([], a, b),
        addnv: (a, b) => m.addN44([], b, a),
        addvn: (a, b) => m.addN44([], a, b),
        div: (a, b) => m.div44([], a, b),
        divnv: (a, b) => m.mulN44([], b, 1 / a),
        divvn: (a, b) => m.divN44([], a, b),
        mul: (a, b) => m.mul44([], a, b),
        mulm: (a, b) => m.mulM44([], a, b),
        mulmv: (a, b) => m.mulV44([], a, b),
        mulnv: (a, b) => m.mulN44([], b, a),
        mulvm: (a, b) => m.mulVM44([], a, b),
        mulvn: (a, b) => m.mulN44([], a, b),
        sub: (a, b) => m.sub44([], a, b),
        sub1: (a) => v.neg([], a),
        subnv: (a, b) => m.sub44(null, v.vecOf(16, a), b),
        subvn: (a, b) => m.subN44([], a, b)
    }
};

export const targetJS = () => {
    const OP_IDS: Record<Operator, string> = {
        "!": "not",
        "<": "lt",
        "<=": "lte",
        "==": "eq",
        "!=": "neq",
        ">=": "gte",
        ">": "gt",
        "+": "add",
        "-": "sub",
        "*": "mul",
        "/": "div",
        "||": "or",
        "&&": "and",
        // TODO below
        "|": "bitor",
        "&": "bitand",
        "^": "bitxor",
        "~": "bitnot",
        "<<": "lshift",
        ">>": "rshift"
    };

    const PRELUDE = `
const f32 = env.f32;
const vec2 = env.vec2;
const vec3 = env.vec3;
const vec4 = env.vec4;
const mat2 = env.mat2;
const mat3 = env.mat3;
const mat4 = env.mat4;
`;

    const COMPS: any = { x: 0, y: 1, z: 2, w: 3 };

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $docParam = (p: Sym<any>) => ` * @param ${p.id} ${p.type}`;

    const $fn = (name: string, args: Term<any>[]) => `${name}(${$list(args)})`;

    const $vec = ({ val, info, type }: Lit<any>) =>
        !info ? `[${$list(val)}]` : `env.${type}${info}(${$list(val)})`;

    const $swizzle = (id: string) => [...id].map((x) => COMPS[x]).join(", ");

    const emit = defTarget({
        arg: (t) => t.id,

        assign: (t) => {
            if (t.l.tag === "swizzle") {
                const s = <Swizzle<any>>t.l;
                return s.id.length > 1
                    ? `env.set_swizzle${s.id.length}(${emit(s.val)}, ${emit(
                          t.r
                      )}, ${$swizzle(s.id)})`
                    : `(${emit(s.val)}[${$swizzle(s.id)}] = ${emit(t.r)})`;
            }
            return emit(t.l) + " = " + emit(t.r);
        },

        break: () => "break",

        call: (t) => $fn(t.id, t.args),

        call_i: (t) => $fn(`${t.args[0].type}.${t.id}${t.info || ""}`, t.args),

        cont: () => "continue",

        decl: ({ type, id }) => {
            const res: string[] = [];
            res.push(id.opts.const ? "const" : "let");
            res.push(`/*${type}*/`);
            res.push(id.id);
            id.init
                ? res.push("=", emit(id.init))
                : id.opts.num !== undefined
                ? res.push("=", `new Array(${id.opts.num})`)
                : undefined;
            return res.join(" ");
        },

        fn: (t) =>
            "/**\n" +
            t.args.map($docParam).join("\n") +
            "\n */\n" +
            `function ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,

        for: (t) =>
            `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${
                t.iter ? emit(t.iter) : ""
            }) ${emit(t.scope)}`,

        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,

        if: (t) => {
            const res = `if (${emit(t.test)}) ` + emit(t.t);
            return t.f ? res + " else " + emit(t.f) : res;
        },

        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return String(!!v);
                case "f32":
                    return isNumber(v) ? String(v) : emit(v);
                case "i32":
                    return isNumber(v) ? String(v) : `(${emit(v)} | 0)`;
                case "u32":
                    return isNumber(v) ? String(v) : `(${emit(v)} >>> 0)`;
                case "vec2":
                case "vec3":
                case "vec4":
                case "mat2":
                case "mat3":
                case "mat4":
                    return $vec(t);
                default:
                    return unsupported(`unknown type: ${t.type}`);
            }
        },

        op1: (t) =>
            isVec(t)
                ? `${t.type}.${OP_IDS[t.op]}1(${emit(t.val)})`
                : `${t.op}${emit(t.val)}`,

        // TODO mat-vec multiply special case
        op2: (t) => {
            const vl = isVec(t.l) || isMat(t.l);
            const vr = isVec(t.r) || isMat(t.r);
            const el = emit(t.l);
            const er = emit(t.r);
            return vl || vr
                ? `${t.l.type}.${OP_IDS[t.op]}${t.info || ""}(${el},${er})`
                : `(${el} ${t.op} ${er})`;
        },

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) =>
            t.id.length > 1
                ? `env.swizzle${t.id.length}(${emit(t.val)}, ${$swizzle(t.id)})`
                : `${emit(t.val)}[${$swizzle(t.id)}]`,

        sym: (t) => t.id,

        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`
    });

    Object.assign(emit, <JSTarget>{
        compile: (tree, env = JS_DEFAULT_ENV) => {
            const exports =
                tree.tag === "scope"
                    ? (<Scope>tree).body
                          .filter((x) => x.tag === "fn")
                          .map(
                              (f) =>
                                  (<Func<any>>f).id + ": " + (<Func<any>>f).id
                          )
                          .join(",\n")
                    : tree.tag === "fn"
                    ? `${(<Func<any>>tree).id}: ${(<Func<any>>tree).id}`
                    : "";
            return new Function(
                "env",
                PRELUDE + emit(tree) + "\nreturn {\n" + exports + "\n};"
            )(env);
        }
    });

    return <JSTarget>emit;
};
