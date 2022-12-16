<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

```ts
import {
    $xy, add, distance, eq, float, FloatSym, fract,
    int, min, mix, mul, neg, ret, sin, sym,
    Vec2Sym, Vec2Term, vec3, Vec3Sym, vec4
} from "@thi.ng/shader-ast";
import { aspectCorrectedUV, fit1101 } from "@thi.ng/shader-ast-stdlib";
import { glCanvas } from "@thi.ng/webgl";
import { MainImageFn, shaderToy } from "@thi.ng/webgl-shadertoy";

const mainImage: MainImageFn = (gl, unis) => {
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
                    vec3(d1, 0, d2),
                    float(eq(unis.mouseButtons, int(1)))
                )
            )
        )),
        // return as vec4 (mandatory)
        ret(vec4(col, 1))
    ];
};

// create WebGL canvas
const canvas = glCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    parent: document.body,
    version: 1
});

// init shader toy with canvas & shader fn
const toy = shaderToy({
    canvas: canvas.canvas,
    gl: canvas.gl,
    main: mainImage
});

toy.start();
```

<!-- include ../../assets/tpl/footer.md -->
