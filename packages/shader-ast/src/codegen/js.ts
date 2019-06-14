import { isNumber } from "@thi.ng/checks";
import { Operator, Sym, Term } from "../api";
import { F32_0, isVec } from "../ast";
import { defTarget } from "./target";

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

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $docParam = (p: Sym<any>) => ` * @param ${p.id} ${p.type}`;

    const $fn = (name: string, args: Term<any>[]) => `${name}(${$list(args)})`;

    const $vec = (v: Term<"f32">[]) => `[${$list(v.map((x) => x || F32_0))}]`;

    const emit = defTarget({
        arg: (t) => t.id,

        assign: (t) => emit(t.l) + " = " + emit(t.r),

        call: (t) => $fn(t.id, t.args),

        call_i: (t) => $fn(`env.${t.args[0].type}_${t.id}`, t.args),

        decl: (t) => `var ${emit(t.id)}`,

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
                    return $vec(v);
                default:
                    throw new Error(`unknown type: ${t.type}`);
            }
        },

        op1: (t) =>
            isVec(t)
                ? `env.${t.type}_${OP_IDS[t.op]}1(${emit(t.val)})`
                : `${t.op}${emit(t.val)}`,

        op2: (t) =>
            isVec(t.l) || isVec(t.r)
                ? `env.${t.l.type}_${OP_IDS[t.op]}"(${emit(t.l)},${emit(t.r)})`
                : `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) => `${emit(t.val)}.${t.id}`,

        sym: (t) => t.id
    });

    return emit;
};
