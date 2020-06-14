import {
    $xy,
    add,
    distance,
    eq,
    float,
    FloatSym,
    fract,
    int,
    min,
    mix,
    mul,
    neg,
    ret,
    sin,
    sym,
    Vec2Sym,
    Vec2Term,
    vec3,
    Vec3Sym,
    vec4,
} from "@thi.ng/shader-ast";
import { aspectCorrectedUV, fit1101 } from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import {
    MainImageFn,
    shaderToy,
    ShaderToyUniforms,
} from "@thi.ng/webgl-shadertoy";

interface DemoUniforms extends ShaderToyUniforms {
    bright: FloatSym;
}

// main shader function, supplied to `shaderToy` below
// the 2 args given are objects containing GLSL builtin vars and uniforms
//
// see:
// https://github.com/thi-ng/umbrella/blob/develop/packages/shader-ast-glsl/src/api.ts#L22
// https://github.com/thi-ng/umbrella/blob/develop/packages/webgl-shadertoy/src/api.ts#L13
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
