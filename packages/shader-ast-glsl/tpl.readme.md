<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

GLSL code generator for
[@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast).
Currently supports GLSL ES 1.00 (WebGL) & GLSL ES 3.00 (WebGL 2).

This package is also used for shader assembly by
[@thi.ng/webgl](https://github.com/thi-ng/umbrella/tree/develop/packages/webgl).

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

### Basic GLSL code generation

```ts
import { assign, defMain, output, program, uniform, vec4 } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";

const glsl = targetGLSL({
    // target WebGL2
    version: GLSLVersion.GLSL_300,
    // emit #version pragma
    versionPragma: true,
    // fragment shader
    type: "fs",
    // custom prelude
    prelude: `
// custom GLSL source string injection, e.g.
#define PI 3.1415926`
});

let color: Vec3Symbol;
let fragColor: Vec4Symbol;

glsl(
    program([
        color = uniform("vec3", "color"),
        fragColor = output("vec4", "fragColor", { loc: 0 }),
        defMain(()=> [
            assign(fragColor, vec4(color, 1))
        ])
    ])
)
```

```glsl
#version 300 es

// custom GLSL source string injection, e.g.
#define PI 3.1415926
uniform vec3 color;
layout(location=0) out vec4 fragColor;
void main() {
fragColor = vec4(color, 1.0);
}
```

<!-- include ../../assets/tpl/footer.md -->
