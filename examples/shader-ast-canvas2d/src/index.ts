import { rgbaInt } from "@thi.ng/color";
import {
    $x,
    $y,
    add,
    cos,
    defn,
    div,
    dot,
    fit1101,
    float,
    FloatSym,
    mul,
    ret,
    sin,
    sym,
    targetGLSL,
    targetJS,
    Vec2Sym,
    vec3,
    vec4
} from "@thi.ng/shader-ast";

const js = targetJS();
const gl = targetGLSL();

/*
// http://glslsandbox.com/e#55242.0

float a = sin(time) * 2.0 + 3.0;

float p = gl_FragCoord.y * resolution.x + gl_FragCoord.x;

vec2 sp = surfacePosition * a;

float dp = dot(sp,sp);

float p2 = sp.y * resolution.x + sp.x;

float m = (p2 + p * a) / (resolution.x * resolution.y);

m *= sp.x*sp.y;

vec3 o = sin( vec3( 1.0, 2.0, 3.0 ) * m );

o = cos( o + dp * 2.0 ) * 0.5 + 0.5;

gl_FragColor = vec4( o, 1.0 );

*/

const main = defn(
    // return type
    "vec4",
    // func name
    "main",
    // args (names are optional)
    [["vec2", "fragCoord"], ["vec2", "res"], ["vec2", "uv"], ["float", "time"]],
    // bound args given to function body
    (frag, res, uv, time) => {
        let a: FloatSym;
        let p: FloatSym;
        let sp: Vec2Sym;
        let dp: FloatSym;
        let p2: FloatSym;
        let m: FloatSym;
        return [
            (a = sym(add(mul(sin(time), float(2)), float(3)))),
            (p = sym(add(mul($y(frag), $x(res)), $x(frag)))),
            (sp = sym(mul(uv, a))),
            (dp = sym(dot(sp, sp))),
            (p2 = sym(add(mul($y(sp), $x(res)), $x(sp)))),
            (m = sym(
                mul(
                    div(add(p2, mul(p, a)), mul($x(res), $y(res))),
                    mul($x(sp), $y(sp))
                )
            )),
            ret(
                vec4(
                    fit1101(
                        cos(mul(add(sin(mul(vec3(1, 2, 3), m)), dp), float(2)))
                    ),
                    1
                )
            )
        ];
    }
);

console.log("JS:");
console.log(js(main));
console.log("GLSL:");
console.log(gl(main));

const fn = js.compile(main).main;

const W = 640;
const H = 480;
const size = [W, H];
const canvas = document.createElement("canvas");
canvas.width = W;
canvas.height = H;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
const img = ctx!.getImageData(0, 0, W, H);
const u32 = new Uint32Array(img.data.buffer);
const t0 = Date.now();

setInterval(() => {
    const time = (Date.now() - t0) * 0.001;
    const du = 2 / W;
    const dv = 2 / H;
    const frag = [];
    const uv = [];
    for (let y = 0, i = 0; y < H; y++) {
        const v = -1 + y * dv;
        frag[1] = y;
        uv[1] = v;
        for (let x = 0; x < W; x++) {
            frag[0] = x;
            uv[0] = -1 + x * du;
            const col = rgbaInt(fn(frag, size, uv, time));
            u32[i++] = col;
        }
    }
    ctx!.putImageData(img, 0, 0);
}, 16);
