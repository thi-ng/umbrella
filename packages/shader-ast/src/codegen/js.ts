import { Fn, Fn2 } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import { Vec as _Vec } from "@thi.ng/vectors";
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

export interface JSEnv {
    vec2n: Fn<number, _Vec>;
    vec3n: Fn<number, _Vec>;
    vec3vn: Fn2<_Vec, number, _Vec>;
    vec4n: Fn<number, _Vec>;
    vec4vn: Fn2<_Vec, number, _Vec>;
    vec4vv: Fn2<_Vec, _Vec, _Vec>;
}

export interface JSTarget extends Fn<Term<any>, string> {
    compile(tree: Term<any>, env: Partial<JSEnv>, exports: Func<any>[]): any;
}

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

    const COMPS: any = { x: 0, y: 1, z: 2, w: 3 };

    // const CTORS: any = {
    //     vec2: vec2,
    //     vec3: vec3,
    //     vec4: vec4
    // };

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $docParam = (p: Sym<any>) => ` * @param ${p.id} ${p.type}`;

    const $fn = (name: string, args: Term<any>[]) => `${name}(${$list(args)})`;

    const $vec = ({ val, info, type }: Lit<any>) =>
        !info ? `[${$list(val)}]` : `env.${type}${info}(${$list(val)})`;

    const $swizzle = (id: string) => [...id].map((x) => COMPS[x]).join(", ");

    const emit = defTarget({
        arg: (t) => t.id,

        assign: (t) =>
            t.l.tag === "swizzle"
                ? emit((<Swizzle<any>>t.l).val) +
                  " = " +
                  `env.${t.r.type}_swizzle(${emit(t.r)}, ${$swizzle(
                      (<Swizzle<any>>t.l).id
                  )})`
                : emit(t.l) + " = " + emit(t.r),

        call: (t) => $fn(t.id, t.args),

        call_i: (t) =>
            $fn(`env.${t.args[0].type}_${t.id}${t.info || ""}`, t.args),

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
                ? `env.${t.type}_${OP_IDS[t.op]}1(${emit(t.val)})`
                : `${t.op}${emit(t.val)}`,

        op2: (t) =>
            isVec(t.l) || isVec(t.r)
                ? `env.${t.l.type}_${OP_IDS[t.op]}(${emit(t.l)},${emit(t.r)})`
                : `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) =>
            `env.${t.val.type}_swizzle(${emit(t.val)}, ${$swizzle(t.id)})`,

        sym: (t) => t.id
    });

    Object.assign(emit, <JSTarget>{
        compile: (tree, env, fns) => {
            const exports = fns.map((f) => f.id + ": " + f.id).join(",\n");
            return new Function(
                "env",
                emit(tree) + "\nreturn {" + exports + "};"
            )(env);
        }
    });

    return <JSTarget>emit;
};
