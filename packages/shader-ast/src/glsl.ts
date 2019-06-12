import { isNumber } from "@thi.ng/checks";
import { Term, Type } from "./api";
import { defTarget } from "./target";

/**
 * GLSL code gen.
 *
 * @param version
 */
export const emitGLSL = (_ = 300) => {
    const TYPE_NAMES: any = {
        f32: "float",
        i32: "int",
        u32: "uint"
    };

    const emitType = (t: Type) => TYPE_NAMES[t] || t;

    const emitVec = (v: Term<"f32">[]) =>
        `vec${v.length}(${v
            .slice(0, v[3] ? 4 : v[2] ? 3 : v[1] ? 2 : 1)
            .map(emit)
            .join(", ")})`;

    const emitScope = (body: Term<any>[]) => {
        const res = "{\n" + body.map(emit).join(";\n");
        return (
            res + (res[res.length - 1] != "}" && body.length ? ";" : "") + "\n}"
        );
    };

    const emit = defTarget({
        sym: (t) => t.id,

        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return String(!!v);
                case "f32":
                    return isNumber(v)
                        ? v === Math.trunc(v)
                            ? v + ".0"
                            : String(v)
                        : emit(v);
                case "i32":
                case "u32":
                    return isNumber(v) ? String(v) : emit(v);
                case "vec2":
                case "vec3":
                case "vec4":
                    return emitVec(v);
                default:
                    throw new Error(`unknown type: ${t.type}`);
            }
        },

        swizzle: (t) => `${emit(t.val)}.${t.id}`,

        call: (t) => `${t.id}(${t.args.map(emit).join(", ")})`,

        op1: (t) => `${t.op}${emit(t.val)}`,

        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        fn: (t) =>
            `${emitType(t.type)} ${t.id}(${t.args
                .map(emit)
                .join(", ")}) ${emitScope(t.body)}`,

        arg: (t) => `${t.q ? t.q + " " : ""}${emitType(t.type)} ${t.id}`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        if: (t) => {
            const res = `if (${emit(t.test)}) ` + emitScope(t.t);
            return t.f ? res + " else " + emitScope(t.f) : res;
        },

        // TODO
        assign: (_) => "// TODO"
    });

    return emit;
};
