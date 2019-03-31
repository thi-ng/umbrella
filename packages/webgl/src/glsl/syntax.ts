import { isArray } from "@thi.ng/checks";
import {
    GLSL,
    GLSLDeclPrefixes,
    GLSLSyntax,
    GLSLVersion
} from "../api";

export const PREFIXES: GLSLDeclPrefixes = {
    a: "a_",
    v: "v_",
    u: "u_",
    o: "o_"
};

export const NO_PREFIXES: GLSLDeclPrefixes = {
    a: "",
    v: "",
    u: "",
    o: ""
};

/**
 * GLSL data declaration code generators.
 */
export const SYNTAX: Record<GLSLVersion, GLSLSyntax> = {
    /**
     * WebGL (GLSL ES 1.0)
     */
    [GLSLVersion.GLES_100]: {
        number: 100,
        attrib: (id, type, pre) =>
            `attribute ${GLSL[isArray(type) ? type[0] : type]} ${pre.a}${id};`,
        varying: {
            vs: (id, type, pre) => `varying ${GLSL[type]} ${pre.v}${id};`,
            fs: (id, type, pre) => `varying ${GLSL[type]} ${pre.v}${id};`
        },
        uniform: (id, u, pre) => {
            const type = isArray(u) ? u[0] : u;
            return `uniform ${GLSL[type]}${
                type >= GLSL.bool_array ? `[${u[1]}]` : ""
            } ${pre.u}${id};`;
        },
        output: () => ""
    },
    /**
     * WebGL 2 (GLSL ES 3)
     */
    [GLSLVersion.GLES_300]: {
        number: 300,
        attrib: (id, type, pre) =>
            isArray(type)
                ? `layout(location=${type[1]}) in ${GLSL[type[0]]} a_${
                      pre.a
                  }${id};`
                : `in ${GLSL[type]} ${id};`,
        varying: {
            vs: (id, type, pre) => `out ${GLSL[type]} v_${pre.v}${id};`,
            fs: (id, type, pre) => `in ${GLSL[type]} v_${pre.v}${id};`
        },
        uniform: (id, u, pre) => {
            const type = isArray(u) ? u[0] : u;
            return `uniform ${GLSL[type]}${
                type >= GLSL.bool_array ? `[${u[1]}]` : ""
            } u_${pre.u}${id};`;
        },
        output: (id, type, pre) =>
            isArray(type)
                ? `layout(location=${type[1]}) out ${GLSL[type[0]]} ${
                      pre.o
                  }${id};`
                : `out ${GLSL[type]} ${pre.o}${id};`
    }
};

/**
 * GLSL preprocessor macro for conditional execution based on `__VERSION__`.
 *
 * @param ver
 * @param ok
 * @param fail
 */
export const VERSION_CHECK = (ver: number, ok: string, fail = "") =>
    `#if __VERSION__ >= ${ver}
${ok}${fail ? `\n#else\n${fail}` : ""}
#endif`;

/**
 * GLSL version specific fragment shader output. If `__VERSION__ >= 300`
 * assigns `body` to `out`, else to `gl_FragColor`.
 *
 * @param body
 * @param out
 */
export const EXPORT_FRAGCOL = (body = "col", out = "fragColor") =>
    VERSION_CHECK(300, `${out}=${body};`, `gl_FragColor=${body};`);

/**
 * Default GLSL prelude.
 */
export const GLSL_HEADER = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp int;
precision highp float;
#else
precision mediump int;
precision mediump float;
#endif
#ifndef PI
#define PI 3.141592653589793
#endif
#ifndef TAU
#define TAU 6.283185307179586
#endif
#ifndef HALF_PI
#define HALF_PI 1.570796326794896
#endif
`;
