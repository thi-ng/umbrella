import {
    add,
    bitand,
    defn,
    distance,
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
    vec4
} from "@thi.ng/shader-ast";
import { aspectCorrectedUV, fit1101 } from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import { shaderToy } from "@thi.ng/webgl-shadertoy";

// main shader function, supplied to `shaderToy` below
const mainImage = defn(
    "vec4",
    "mainImage",
    ["vec2", "vec2", "vec2", "int", "float"],
    (fragCoord, res, mouse, buttons, time) => {
        let uv: Vec2Sym;
        let mp: Vec2Sym;
        let d1: FloatSym;
        let d2: FloatSym;
        let col: Vec3Sym;

        /**
         * Inline function to create ring pattern with center at `p`
         *
         * @param p
         * @param speed
         * @param freq
         */
        const rings = (p: Vec2Term, speed: number, freq: number) =>
            sin(mul(add(distance(uv, p), fract(mul(time, speed))), freq));

        return [
            // let's work in [-1..+1] range
            (uv = sym(aspectCorrectedUV(fragCoord, res))),
            (mp = sym(aspectCorrectedUV(mouse, res))),
            // compute ring colors
            (d1 = sym(rings(mp, 0.25, 50))),
            (d2 = sym(rings(neg(mp), 0.25, 50))),
            // combine rings and multiply with target color based on
            // mouse button state
            (col = sym(
                mul(
                    vec3(fit1101(min(d1, d2))),
                    mix(
                        vec3(1),
                        vec3(d1, 0, d2),
                        float(bitand(buttons, int(1)))
                    )
                )
            )),
            // return as vec4 (mandatory)
            ret(vec4(col, 1))
        ];
    }
);

// create WebGL2 canvas
const canvas = glCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    parent: document.body,
    version: 2
});

// init shader toy with canvas & shader fn
const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: mainImage
});

toy.start();

// toy.stop();

// toy.recompile(/* pass new mainImage fn */);
