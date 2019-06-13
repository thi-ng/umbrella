import { Fn } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import {
    FnCall,
    Sym,
    Term,
    Type
} from "./api";
import { sym } from "./ast";
import { defTarget } from "./target";

// TODO
export interface GLSLOpts {
    version?: 100 | 300;
}

export interface GLSLTarget extends Fn<Term<any>, string> {
    gl_FragColor: Sym<"vec4">;
    gl_FragCoord: Sym<"vec4">;
    gl_FragData: Sym<"vec4[]">;
    gl_FrontFacing: Sym<"bool">;
    gl_PointCoord: Sym<"vec2">;
    gl_PointSize: Sym<"f32">;
    gl_Position: Sym<"vec4">;
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

    const $fn = (t: FnCall<any>) => `${t.id}(${$list(t.args)})`;

    const emit = defTarget({
        arg: (t) => `${t.q ? t.q + " " : ""}${$type(t.type)} ${t.id}`,

        assign: (t) => emit(t.l) + " = " + emit(t.r),

        call: $fn,

        call_i: $fn,

        decl: (t) => `${$type(t.type)} ${emit(t.id)}`,

        fn: (t) =>
            `${$type(t.type)} ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,

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

        op1: (t) => `${t.op}${emit(t.val)}`,

        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = $list(t.body, ";\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            return !t.global ? `{\n${res}\n}` : res;
        },

        swizzle: (t) => `${emit(t.val)}.${t.id}`,

        sym: (t) => t.id
    });

    Object.assign(emit, <GLSLTarget>{
        gl_FragColor: sym("vec4", "gl_FragColor"),
        gl_FragCoord: sym("vec4", "gl_FragCoord", "in"),
        gl_FragData: sym("vec4[]", "gl_FragData", "in", 1),
        gl_FrontFacing: sym("bool", "gl_FrontFacing", "in"),
        gl_PointCoord: sym("vec2", "gl_PointCoord", "in"),
        gl_PointSize: sym("f32", "gl_PointSize"),
        gl_Position: sym("vec4", "gl_Position")
    });

    return <GLSLTarget>emit;
};
