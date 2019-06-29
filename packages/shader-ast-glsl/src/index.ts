import { Fn } from "@thi.ng/api";
import { isBoolean, isNumber } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import {
    defTarget,
    FloatSym,
    FnCall,
    FuncArg,
    isMat,
    isVec,
    itemType,
    Sym,
    sym,
    Term,
    Type,
    Vec2Sym,
    Vec4Sym
} from "@thi.ng/shader-ast";

export const enum GLSLVersion {
    GLES_100 = "100",
    GLES_300 = "300 es"
}

export interface GLSLOpts {
    type: "vs" | "fs";
    version: GLSLVersion;
    versionPragma: boolean;
    prelude: string;
}

export interface GLSLTarget extends Fn<Term<any>, string> {
    gl_FragColor: Vec4Sym;
    gl_FragCoord: Vec4Sym;
    gl_FragData: Sym<"vec4[]">;
    gl_FrontFacing: Sym<"bool">;
    gl_PointCoord: Vec2Sym;
    gl_PointSize: FloatSym;
    gl_Position: Vec4Sym;
}

/**
 * GLSL code gen, targets GLSL ES 3.00 (WebGL2) by default.
 *
 * Use options object to configure shader type and GLSL version: `100`
 * for WebGL, 300 for WebGL2. Currently, the only differences in terms
 * of code generation, not correctness, are:
 *
 * - attribute, varying, uniform declarations
 * - texture lookup function naming
 *
 * Unsupported features in GLSL 100:
 *
 * - Fragment shader output vars
 *
 * @param opts
 */
export const targetGLSL = (opts?: Partial<GLSLOpts>) => {
    const _opts: GLSLOpts = {
        type: "fs",
        version: GLSLVersion.GLES_300,
        versionPragma: true,
        prelude: "",
        ...opts
    };
    const isVS = _opts.type === "vs";

    // TODO update once we have struct support
    const $type = (t: Type) => t;

    const $list = (body: Term<any>[], sep = ", ") => body.map(emit).join(sep);

    const $fn = (t: FnCall<any>) => `${t.id}(${$list(t.args)})`;

    const $decl = (sym: Sym<any> | FuncArg<any>, arg = false) => {
        const { id, type, opts, init } = <Sym<any>>sym;
        const res: string[] = [];
        if (opts.type) {
            let type: string;
            if (_opts.version < GLSLVersion.GLES_300) {
                if (isVS) {
                    type = (<any>{
                        in: "attribute",
                        out: "varying",
                        uni: "uniform"
                    })[opts.type];
                } else {
                    type = (<any>{
                        in: "varying",
                        out: null,
                        uni: "uniform"
                    })[opts.type];
                    !type &&
                        unsupported(
                            "GLSL 100 doesn't support fragment shader output variables"
                        );
                }
            } else {
                opts.loc != null && res.push(`layout(location=${opts.loc}) `);
                type = opts.type === "uni" ? "uniform" : opts.type;
            }
            res.push(type + " ");
        } else {
            opts.const && res.push("const ");
            arg && opts.q && res.push(opts.q + " ");
        }
        opts.prec && res.push(opts.prec + " ");
        res.push($type(itemType(type)), " ", id);
        opts.num && res.push(`[${opts.num}]`);
        init && res.push(" = ", emit(init));
        return res.join("");
    };

    const emit: Fn<Term<any>, string> = defTarget({
        arg: (t) => $decl(t, true),

        assign: (t) => emit(t.l) + " = " + emit(t.r),

        break: () => "break",

        call: $fn,

        call_i: (t) =>
            t.id === "texture" && _opts.version < GLSLVersion.GLES_300
                ? `${t.id}${(<Sym<any>>t.args[0]).type.substr(7)}(${$list(
                      t.args
                  )})`
                : $fn(t),

        cont: () => "continue",

        decl: (t) => $decl(t.id),

        fn: (t) =>
            `${$type(t.type)} ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,

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
                    return isBoolean(v) ? String(v) : `bool(${emit(v)})`;
                case "float":
                    return isNumber(v)
                        ? v === Math.trunc(v)
                            ? v + ".0"
                            : String(v)
                        : `float(${emit(v)})`;
                case "int":
                case "uint":
                    return isNumber(v) ? String(v) : `${t.type}(${emit(v)})`;
                default: {
                    if (isVec(t) || isMat(t)) {
                        return `${t.type}(${$list(v)})`;
                    }
                    return unsupported(`unknown type: ${t.type}`);
                }
            }
        },

        op1: (t) =>
            t.post ? `(${emit(t.val)}${t.op})` : `(${t.op}${emit(t.val)})`,

        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,

        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),

        scope: (t) => {
            let res = t.body
                .map(emit)
                .reduce(
                    (acc, x) => (acc.push(x.endsWith("}") ? x : x + ";"), acc),
                    <string[]>[]
                )
                .join("\n");
            res += res[res.length - 1] != "}" && t.body.length ? ";" : "";
            if (!t.global) {
                return `{\n${res}\n}`;
            }
            if (_opts.prelude) {
                res = _opts.prelude + "\n" + res;
            }
            if (_opts.versionPragma) {
                res = `#version ${_opts.version}\n` + res;
            }
            return res;
        },

        swizzle: (t) => `${emit(t.val)}.${t.id}`,

        sym: (t) => t.id,

        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,

        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`
    });

    Object.assign(emit, <GLSLTarget>{
        gl_FragColor: sym("vec4", "gl_FragColor"),
        gl_FragCoord: sym("vec4", "gl_FragCoord", { const: true }),
        gl_FragData: sym("vec4[]", "gl_FragData", { num: 1 }),
        gl_FrontFacing: sym("bool", "gl_FrontFacing", { const: true }),
        gl_PointCoord: sym("vec2", "gl_PointCoord", { const: true }),
        gl_PointSize: sym("float", "gl_PointSize"),
        gl_Position: sym("vec4", "gl_Position")
    });

    return <GLSLTarget>emit;
};
