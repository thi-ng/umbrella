import { rgbaInt } from "@thi.ng/color";
import {
    $,
    add,
    assign,
    cos,
    defn,
    div,
    dot,
    fit1101,
    float,
    mul,
    ret,
    sin,
    sym,
    targetGLSL,
    targetJS,
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
    [["vec2", "fragCoord"], ["vec2", "res"], ["vec2", "uv"], ["f32", "time"]],
    // bound args given to function body
    (frag, res, uv, time) => {
        const a = sym("f32", add(mul(sin(time), float(2)), float(3)));
        const p = sym("f32", add(mul($(frag, "y"), $(res, "x")), $(frag, "x")));
        const sp = sym("vec2", mul(uv, a));
        const dp = sym("f32", dot(sp, sp));
        const p2 = sym("f32", add(mul($(sp, "y"), $(res, "x")), $(sp, "x")));
        const m = sym(
            "f32",
            mul(
                div(add(p2, mul(p, a)), mul($(res, "x"), $(res, "y"))),
                mul($(sp, "x"), $(sp, "y"))
            )
        );
        const o = sym("vec3", sin(mul(vec3(1, 2, 3), m)));
        return [
            a,
            p,
            sp,
            dp,
            p2,
            m,
            o,
            assign(o, fit1101(cos(mul(add(o, dp), float(2))))),
            ret(vec4(o, 1))
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
