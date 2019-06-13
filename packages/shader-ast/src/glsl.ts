import { Fn } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { Sym, Term, Type } from "./api";
import { sym } from "./ast";
import { defTarget } from "./target";

// TODO
export interface GLSLOpts {
    version?: 100 | 300;
}

export interface GLSLTarget extends Fn<Term<any>, string> {
    gl_FragColor: Sym<"vec4">;
    gl_FragCoord: Sym<"vec2">;
    gl_Position: Sym<"vec4">;
    gl_PointSize: Sym<"f32">;
}

/**
 * GLSL code gen.
 *
 * @param version
 */
export const targetGLSL = (_ = 300) => {
    const TYPE_NAMES: any = {
        f32: "float",
        i32: "int",
        u32: "uint"
    };

    const $type = (t: Type) => TYPE_NAMES[t] || t;

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $vec = (v: Term<"f32">[]) =>
        `vec${v.length}(${$list(
            v.slice(0, v[3] ? 4 : v[2] ? 3 : v[1] ? 2 : 1)
        )})`;

    // TODO refactor as sep node type, update fn, if
    const $scope = (body: Term<any>[]) => {
        const res = "{\n" + $list(body, ";\n");
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
                    return $vec(v);
                default:
                    throw new Error(`unknown type: ${t.type}`);
            }
        },

        swizzle: (t) => `${emit(t.val)}.${t.id}`,

        call: (t) => `${t.id}(${$list(t.args)})`,

        op1: (t) => `${t.op}${emit(t.val)}`,

        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        fn: (t) =>
            `${$type(t.type)} ${t.id}(${$list(t.args)}) ${$scope(t.body)}`,

        arg: (t) => `${t.q ? t.q + " " : ""}${$type(t.type)} ${t.id}`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        if: (t) => {
            const res = `if (${emit(t.test)}) ` + $scope(t.t);
            return t.f ? res + " else " + $scope(t.f) : res;
        },

        assign: (t) => emit(t.l) + " = " + emit(t.r)
    });

    Object.assign(emit, {
        gl_FragColor: sym("vec4", "gl_FragColor"),
        gl_Position: sym("vec4", "gl_Position"),
        gl_PointSize: sym("f32", "gl_PointSize")
    });

    return <GLSLTarget>emit;
};
