import type { Fn } from "@thi.ng/api";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
    Func,
    Lit,
    Operator,
    Scope,
    Swizzle,
    Sym,
    Term,
} from "@thi.ng/shader-ast";
import {
    isBool,
    isInt,
    isMat,
    isUint,
    isVec,
} from "@thi.ng/shader-ast/ast/checks";
import { defTarget } from "@thi.ng/shader-ast/target";
import type { JSTarget } from "./api";
import { JS_DEFAULT_ENV } from "./env";

const CMP_OPS: Partial<Record<Operator, string>> = {
    "!": "not",
    "<": "lt",
    "<=": "lte",
    "==": "eq",
    "!=": "neq",
    ">=": "gte",
    ">": "gt",
};
const OP_IDS: Record<Operator, string> = {
    ...(<any>CMP_OPS),
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div",
    "%": "modi",
    "++": "inc",
    "--": "dec",
    "||": "or",
    "&&": "and",
    "|": "bitor",
    "&": "bitand",
    "^": "bitxor",
    "~": "bitnot",
    "<<": "lshift",
    ">>": "rshift",
};

const PRELUDE = [
    "float",
    "int",
    "uint",
    "vec2",
    "vec3",
    "vec4",
    "bvec2",
    "bvec3",
    "bvec4",
    "ivec2",
    "ivec3",
    "ivec4",
    "uvec2",
    "uvec3",
    "uvec4",
    "mat2",
    "mat3",
    "mat4",
    "sampler2D",
    "sampler3D",
    "samplerCube",
    "sampler2DShadow",
    "samplerCubeShadow",
]
    .map((x) => `const ${x} = env.${x};`)
    .join("\n");

const COMPS: any = { x: 0, y: 1, z: 2, w: 3 };

const RE_SEMI = /[};]$/;

const isIntOrBool = (l: Term<any>) => isInt(l) || isUint(l) || isBool(l);

const isVecOrMat = (l: Term<any>) => isVec(l) || isMat(l);

const swizzle = (id: string) => [...id].map((x) => COMPS[x]).join(", ");

const buildComments = (t: Func<any>) =>
    `/**\n${t.args.map((p) => ` * @param ${p.id} ${p.type}`).join("\n")}\n */`;

const buildExports = (tree: Term<any>) =>
    tree.tag === "scope"
        ? (<Scope>tree).body
              .filter((x) => x.tag === "fn")
              .map((f) => `${(<Func<any>>f).id}: ${(<Func<any>>f).id}`)
              .join(",\n")
        : tree.tag === "fn"
        ? `${(<Func<any>>tree).id}: ${(<Func<any>>tree).id}`
        : "";

export const targetJS = () => {
    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $fn = (name: string, args: Term<any>[]) => `${name}(${$list(args)})`;

    const $vec = ({ val, info, type }: Lit<any>) =>
        !info ? `[${$list(val)}]` : `env.${type}${info}(${$list(val)})`;

    const $num = (v: any, f: Fn<any, string>) =>
        isNumber(v) ? String(v) : f(v);

    const emit: Fn<Term<any>, string> = defTarget({
        arg: (t) => t.id,

        array_init: (t) => `[${$list(t.init)}]`,

        assign: (t) => {
            const rhs = emit(t.r);
            if (t.l.tag === "swizzle") {
                const s = <Swizzle<any>>t.l;
                const id = swizzle(s.id);
                const val = emit(s.val);
                return s.id.length > 1
                    ? `env.set_swizzle${s.id.length}(${val}, ${rhs}, ${id})`
                    : `(${val}[${id}] = ${rhs})`;
            }
            return `${emit(t.l)} = ${rhs}`;
        },

        ctrl: (t) => t.id,

        call: (t) => $fn(t.id, t.args),

        call_i: (t) => $fn(`${t.args[0].type}.${t.id}${t.info || ""}`, t.args),

        decl: ({ type, id }) => {
            const res: string[] = [];
            res.push(id.opts.const ? "const" : "let", `/*${type}*/`, id.id);
            id.init
                ? res.push(`= ${emit(id.init)}`)
                : id.opts.num !== undefined
                ? res.push(`= new Array(${id.opts.num})`)
                : undefined;
            return res.join(" ");
        },

        fn: (t) =>
            `${buildComments(t)}\nfunction ${t.id}(${$list(t.args)}) ${emit(
                t.scope
            )}`,

        for: (t) =>
            `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${
                t.iter ? emit(t.iter) : ""
            }) ${emit(t.scope)}`,

        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,

        idxm: (t) => `${t.val.type}.idx(${emit(t.val)},${emit(t.id)})`,

        if: (t) => {
            const res = `if (${emit(t.test)}) ${emit(t.t)}`;
            return t.f ? `${res} else ${emit(t.f)}` : res;
        },

        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return isBoolean(v) ? String(v) : `!!(${emit(v)})`;
                case "float":
                    return $num(v, () =>
                        isBool(v) ? `(${emit(v)} & 1)` : emit(v)
                    );
                case "int":
                    return $num(v, () => `(${emit(v)} | 0)`);
                case "uint":
                    return $num(v, () => `(${emit(v)} >>> 0)`);
                case "vec2":
                case "vec3":
                case "vec4":
                case "bvec2":
                case "bvec3":
                case "bvec4":
                case "ivec2":
                case "ivec3":
                case "ivec4":
                case "uvec2":
                case "uvec3":
                case "uvec4":
                case "mat2":
                case "mat3":
                case "mat4":
                    return $vec(t);
                default:
                    return unsupported(`unknown type: ${t.type}`);
            }
        },

        op1: (t) => {
            const complex = isVecOrMat(t) || isInt(t);
            const op = t.op;
            const val = emit(t.val);
            return complex && t.post
                ? `${(<Sym<any>>t.val).id} = ${t.type}.${OP_IDS[op]}(${val})`
                : complex
                ? `${t.type}.${OP_IDS[op]}1(${val})`
                : t.post
                ? `(${val}${op})`
                : `${op}${val}`;
        },

        op2: (t) => {
            const { l, r } = t;
            const vec = isVecOrMat(l)
                ? l.type
                : isVecOrMat(r)
                ? r.type
                : undefined;
            const int = !vec
                ? isIntOrBool(l)
                    ? l.type
                    : isIntOrBool(r)
                    ? r.type
                    : undefined
                : undefined;
            const el = emit(l);
            const er = emit(r);
            return vec || (int && !CMP_OPS[t.op])
                ? `${vec || int}.${OP_IDS[t.op]}${t.info || ""}(${el}, ${er})`
                : `(${el} ${t.op} ${er})`;
        },

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += t.body.length && !RE_SEMI.test(res) ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) =>
            t.id.length > 1
                ? `env.swizzle${t.id.length}(${emit(t.val)}, ${swizzle(t.id)})`
                : `${emit(t.val)}[${swizzle(t.id)}]`,

        sym: (t) => t.id,

        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,

        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`,
    });

    Object.assign(emit, <JSTarget>{
        compile: (tree, env = JS_DEFAULT_ENV) => {
            const exports = buildExports(tree);
            return new Function(
                "env",
                [PRELUDE, emit(tree), "return {", exports, "};"].join("\n")
            )(env);
        },
    });

    return <JSTarget>emit;
};
