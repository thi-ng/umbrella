import type { FloatSym, Vec2Sym, Vec2Term, Vec3Sym } from "@thi.ng/shader-ast";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { aspectCorrectedUV } from "@thi.ng/shader-ast-stdlib/screen/uv";
import { ret } from "@thi.ng/shader-ast/ast/function";
import { float, int, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { add, eq, mul, neg } from "@thi.ng/shader-ast/ast/ops";
import { $xy } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import {
    distance,
    fract,
    min,
    mix,
    sin,
} from "@thi.ng/shader-ast/builtin/math";
import {
    MainImageFn,
    shaderToy,
    ShaderToyUniforms,
} from "@thi.ng/webgl-shadertoy";
import { glCanvas } from "@thi.ng/webgl/canvas";

interface DemoUniforms extends ShaderToyUniforms {
    bright: FloatSym;
}

// main shader function, supplied to `shaderToy` below
// the 2 args given are objects containing GLSL builtin vars and uniforms
//
// see:
// - https://docs.thi.ng/umbrella/shader-ast-glsl/interfaces/GLSLTarget.html
// - https://docs.thi.ng/umbrella/webgl-shadertoy/modules.html#MainImageFn
const mainImage: MainImageFn<DemoUniforms> = (gl, unis) => {
    // predeclare local vars / symbols
    let uv: Vec2Sym;
    let mp: Vec2Sym;
    let d1: FloatSym;
    let d2: FloatSym;
    let col: Vec3Sym;

    // Inline function to create ring pattern with center at `p`
    const rings = (p: Vec2Term, speed = 0.25, freq = 50) =>
        sin(mul(add(distance(uv, p), fract(mul(unis.time, speed))), freq));

    return [
        // let's work in [-1..+1] range (based on vertical resolution)
        (uv = sym(aspectCorrectedUV($xy(gl.gl_FragCoord), unis.resolution))),
        (mp = sym(aspectCorrectedUV(unis.mouse, unis.resolution))),
        // compute ring colors
        (d1 = sym(rings(mp))),
        (d2 = sym(rings(neg(mp)))),
        // combine rings and multiply with target color based on
        // mouse button state
        (col = sym(
            mul(
                vec3(fit1101(min(d1, d2))),
                mix(
                    vec3(1),
                    mul(vec3(d1, 0, d2), unis.bright),
                    float(eq(unis.mouseButtons, int(1)))
                )
            )
        )),
        // return as vec4 (mandatory)
        ret(vec4(col, 1)),
    ];
};

// create WebGL canvas
const canvas = glCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    parent: document.body,
    version: 1,
});

// init shader toy with canvas & shader fn
const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: mainImage,
    uniforms: {
        // brightness factor for colored rings
        bright: ["float", 1],
    },
});

toy.start();

// toy.stop();

// toy.recompile(/* pass new mainImage fn */);
