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
    fract,
    mix,
    smoothStep,
    step
} from "@thi.ng/math";
import * as m from "@thi.ng/matrices";
import * as v from "@thi.ng/vectors";
import {
    Func,
    Lit,
    Operator,
    Swizzle,
    Sym,
    Term
} from "../api";
import { isVec } from "../ast";
import { defTarget } from "./target";

type Mat = m.Mat;
type Vec = v.Vec;

export interface JSBuiltins<T> {
    abs: Fn<T, T>;
    acos: Fn<T, T>;
    asin: Fn<T, T>;
    atan: Fn<T, T>;
    ceil: Fn<T, T>;
    clamp: Fn3<T, T, T, T>;
    cos: Fn<T, T>;
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

export interface JSBuiltinsVec extends JSBuiltins<Vec>, JSBuiltinsMath<Vec> {
    dot: Fn2<Vec, Vec, number>;
    normalize: Fn<Vec, Vec>;
    length: Fn<Vec, number>;
    distance: Fn2<Vec, Vec, number>;
}

export interface JSBuiltinsVec3 extends JSBuiltinsVec {
    cross: Fn2<Vec, Vec, Vec>;
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
    swizzle1: Fn2<Vec, number, number>;
    swizzle2: Fn3<Vec, number, number, Vec>;
    swizzle3: Fn4<Vec, number, number, number, Vec>;
    swizzle4: Fn5<Vec, number, number, number, number, Vec>;
    set_swizzle1: Fn3<Vec, number, number, Vec>;
    set_swizzle2: Fn4<Vec, Vec, number, number, Vec>;
    set_swizzle3: Fn5<Vec, Vec, number, number, number, Vec>;
    set_swizzle4: Fn6<Vec, Vec, number, number, number, number, Vec>;
    f32: JSBuiltins<number>;
    vec2: JSBuiltinsVec;
    vec3: JSBuiltinsVec3;
    vec4: JSBuiltinsVec;
}

export interface JSTarget extends Fn<Term<any>, string> {
    compile(tree: Term<any>, env: JSEnv, exports: Func<any>[]): any;
}

export const JS_DEFAULT_ENV: JSEnv = {
    vec2n: (n) => v.setN2([], n),
    vec3n: (n) => v.setN3([], n),
    vec4n: (n) => v.setN4([], n),
    vec3vn: (a, n) => v.setVN3([], a, n),
    vec4vn: (a, n) => v.setVN4([], a, n),
    vec4vv: (a, b) => v.setVV4([], a, b),
    mat2n: (n) => m.mat2n([], n),
    mat2vv: (a, b) => m.mat2v([], a, b),
    mat3n: (n) => m.mat3n([], n),
    mat3vvv: (a, b, c) => m.mat33v([], a, b, c),
    mat4n: (n) => m.mat4n([], n),
    mat4vvvv: (a, b, c, d) => m.mat44v([], a, b, c, d),
    swizzle1: (a, n) => a[n],
    swizzle2: (a, b, c) => v.swizzle2([], a, b, c),
    swizzle3: (a, b, c, d) => v.swizzle3([], a, b, c, d),
    swizzle4: (a, b, c, d, e) => v.swizzle4([], a, b, c, d, e),
    set_swizzle1: v.setSwizzle1,
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
        asin: (a) => v.asin2([], a),
        atan: (a) => v.atan2([], a),
        ceil: (a) => v.ceil2([], a),
        clamp: (x, a, b) => v.clamp2([], x, a, b),
        cos: (a) => v.cos2([], a),
        distance: v.dist,
        div: (a, b) => v.div2([], a, b),
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
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow2([], a, b),
        sign: (a) => v.sign2([], a),
        sin: (a) => v.sin2([], a),
        smoothstep: (a, b, t) => v.smoothStep2([], a, b, t),
        sqrt: (a) => v.sqrt2([], a),
        step: (a, b) => v.step2([], a, b),
        sub: (a, b) => v.sub2([], a, b),
        sub1: (a) => v.neg([], a),
        tan: (a) => v.tan2([], a)
    },
    vec3: {
        abs: (a) => v.abs3([], a),
        acos: (a) => v.acos3([], a),
        add: (a, b) => v.add3([], a, b),
        asin: (a) => v.asin3([], a),
        atan: (a) => v.atan3([], a),
        ceil: (a) => v.ceil3([], a),
        clamp: (x, a, b) => v.clamp3([], x, a, b),
        cos: (a) => v.cos3([], a),
        cross: (a, b) => v.cross3([], a, b),
        distance: v.dist,
        div: (a, b) => v.div3([], a, b),
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
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow3([], a, b),
        sign: (a) => v.sign3([], a),
        sin: (a) => v.sin3([], a),
        smoothstep: (a, b, t) => v.smoothStep3([], a, b, t),
        sqrt: (a) => v.sqrt3([], a),
        step: (a, b) => v.step3([], a, b),
        sub: (a, b) => v.sub3([], a, b),
        sub1: (a) => v.neg([], a),
        tan: (a) => v.tan3([], a)
    },
    vec4: {
        abs: (a) => v.abs4([], a),
        acos: (a) => v.acos4([], a),
        add: (a, b) => v.add2([], a, b),
        asin: (a) => v.asin4([], a),
        atan: (a) => v.atan4([], a),
        ceil: (a) => v.ceil4([], a),
        clamp: (x, a, b) => v.clamp4([], x, a, b),
        cos: (a) => v.cos4([], a),
        distance: v.dist,
        div: (a, b) => v.div2([], a, b),
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
        normalize: (a) => v.normalize([], a),
        pow: (a, b) => v.pow4([], a, b),
        sign: (a) => v.sign4([], a),
        sin: (a) => v.sin4([], a),
        smoothstep: (a, b, t) => v.smoothStep4([], a, b, t),
        sqrt: (a) => v.sqrt4([], a),
        step: (a, b) => v.step4([], a, b),
        sub: (a, b) => v.sub2([], a, b),
        sub1: (a) => v.neg([], a),
        tan: (a) => v.tan4([], a)
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
                return `env.set_swizzle${s.id.length}(${emit(s.val)}, ${emit(
                    t.r
                )}, ${$swizzle(s.id)})`;
            }
            return emit(t.l) + " = " + emit(t.r);
        },

        call: (t) => $fn(t.id, t.args),

        call_i: (t) => $fn(`${t.args[0].type}.${t.id}${t.info || ""}`, t.args),

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
                case "i32":
                case "u32":
                    return isNumber(v) ? String(v) : emit(v);
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
        op2: (t) =>
            isVec(t.l) || isVec(t.r)
                ? `${t.l.type}.${OP_IDS[t.op]}(${emit(t.l)},${emit(t.r)})`
                : `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) =>
            `env.swizzle${t.id.length}(${emit(t.val)}, ${$swizzle(t.id)})`,

        sym: (t) => t.id
    });

    Object.assign(emit, <JSTarget>{
        compile: (tree, env, fns) => {
            const exports = fns.map((f) => f.id + ": " + f.id).join(",\n");
            return new Function(
                "env",
                PRELUDE + emit(tree) + "\nreturn {\n" + exports + "\n};"
            )(env);
        }
    });

    return <JSTarget>emit;
};
