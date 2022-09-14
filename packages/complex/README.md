<!-- This file is generated - DO NOT EDIT! -->

# ![complex](https://media.thi.ng/umbrella/banners/thing-complex.svg?22eca9e2)

[![npm version](https://img.shields.io/npm/v/@thi.ng/complex.svg)](https://www.npmjs.com/package/@thi.ng/complex)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/complex.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Array-based complex number algebra.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcomplex%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/complex
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/complex"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const complex = await import("@thi.ng/complex");
```

Package sizes (gzipped, pre-treeshake): ESM: 1.05 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/complex/)

ASCII art mandelbrot fractal using complex number math
```ts
import { abs, add, Complex, mul } from "@thi.ng/complex";
import { canvas, formatCanvas, SHADES_ASCII_16 } from "@thi.ng/text-canvas";
import { map, range2d, run } from "@thi.ng/transducers";
import { fit2 } from "@thi.ng/vectors";

// mandelbrot evaluation
const mandelbrot = (pos: Complex, escapeRadius: number, maxIter: number) => {
    let i = 0;
    let z: Complex = pos;
    while (++i < maxIter && abs(z) < escapeRadius) {
        z = add(mul(z, z), pos);
    }
    return maxIter - i;
};

// text canvas setup
const canv = canvas(120, 60);
const maxSize: [number, number] = [canv.width, canv.height];

// evaluate for all pixels and visualize as ASCII art
run(
    map((p) => {
        canv.setAt(
            p[0],
            p[1],
            SHADES_ASCII_16[
                mandelbrot(
                    // map pixel pos to mandelbrot region
                    fit2([], p, [0, 0], maxSize, [-2, -1.25], [0.65, 1.25]),
                    2000,
                    15
                )
            ]
        );
    }),
    range2d(...maxSize)
);

// output canvas as string
console.log(formatCanvas(canv));
```

```text
33333333333333333333333333333333333llllllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiilllllllllllllllllllllllllll333
3333333333333333333333333333333llllllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiiilllllllllllllllllllllllll3
3333333333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiii=====iiiiiiiiiiiilllllllllllllllllllllll
3333333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiii===*+***=====iiiiiiiiiillllllllllllllllllll
3333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiii===**|,.|***=====iiiiiiiiillllllllllllllllll
33333333333333333333lllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiii=====**+:  |+++++*===iiiiiiiiiilllllllllllllll
33333333333333333lllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiii======**++|,  ,,...+*====iiiiiiiiiilllllllllllll
333333333333333lllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii=======***++||:.   .:|+**====iiiiiiiiiiilllllllllll
333333333333lllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii========****++||:.    .:|++**=====iiiiiiiiiiilllllllll
3333333333llllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii=========****++|. .       .:::+**======iiiiiiiiiiilllllll
33333333llllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiii==========*****+|,              ,|+***=======iiiiiiiiiilllll
333333llllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiii=========*******+++|:,             ,|++****========iiiiiiiillll
3333lllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiii=======******++++++||::              ,:|+++*******======iiiiiiill
33lllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiii========**+++||:|||||:::,,.             ,:::||++++***+++*===iiiiiiil
3lllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiii=========***+:     .,:,.                          |||||||, ,**==iiiiiii
lllllllllllllllllllllllliiiiiiiiiiiiiiiiiiii============****++:                                    .,,  ,.  ,:+*==iiiiii
lllllllllllllllllllllliiiiiiiiiiiiiiiii===============*****++|:,                                             :+*===iiiii
lllllllllllllllllllliiiiiiiiiiiii==================******+++||:,                                            :|+*===iiiii
llllllllllllllllliiiiiiiiiiii================**********+++|:,                                              .|+**====iiii
llllllllllllllliiiiiiiiiiii====**********************++++|:                                                ,|++**===iiii
llllllllllllliiiiiiiiiiii=====**: ,|+++++++++++++++++++||:,.                                                ,:||+*===iii
llllllllllliiiiiiiiiiiii=====**+|. :|||||||: ,||||||||||:,.                                                     |*===iii
lllllllliiiiiiiiiiiiii======***+|,   . .,,,   .,,,::::::,.                                                      |*===iii
lllllliiiiiiiiiiiii========***++|:,.               .,,,,.                                                     :|+*===iii
lllliiiiiiiiiiiii========****+++|:,                                                                           .:+*===iii
lliiiiiiiiiii=========*****+++||:,.                                                                            |**===iii
iiiiiiiii===========****++:|||::.                                                                             |+**===iii
iiiiii=========*******+++|, ...                                                                              ,+**====iii
iii=====*********++++++||:,                                                                                 :++**====iii
===*****++:,|||||:||||: ..                                                                                .:|+***====iii
                                                                                                         .:|++***====iii
===*****++:,|||||:||||: ..                                                                                .:|+***====iii
iii=====*********++++++||:,                                                                                 :++**====iii
iiiiii=========*******+++|, ...                                                                              ,+**====iii
iiiiiiiii===========****++:|||::.                                                                             |+**===iii
lliiiiiiiiiii=========*****+++||:,.                                                                            |**===iii
lllliiiiiiiiiiiii========****+++|:,                                                                           .:+*===iii
lllllliiiiiiiiiiiii========***++|:,.               .,,,,.                                                     :|+*===iii
lllllllliiiiiiiiiiiiii======***+|,   . .,,,   .,,,::::::,.                                                      |*===iii
llllllllllliiiiiiiiiiiii=====**+|. :|||||||: ,||||||||||:,.                                                     |*===iii
llllllllllllliiiiiiiiiiii=====**: ,|+++++++++++++++++++||:,.                                                ,:||+*===iii
llllllllllllllliiiiiiiiiiii====**********************++++|:                                                ,|++**===iiii
llllllllllllllllliiiiiiiiiiii================**********+++|:,                                              .|+**====iiii
lllllllllllllllllllliiiiiiiiiiiii==================******+++||:,                                            :|+*===iiiii
lllllllllllllllllllllliiiiiiiiiiiiiiiii===============*****++|:,                                             :+*===iiiii
lllllllllllllllllllllllliiiiiiiiiiiiiiiiiiii============****++:                                    .,,  ,.  ,:+*==iiiiii
3lllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiii=========***+:     .,:,.                          |||||||, ,**==iiiiiii
33lllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiii========**+++||:|||||:::,,.             ,:::||++++***+++*===iiiiiiil
3333lllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiii=======******++++++||::              ,:|+++*******======iiiiiiill
333333llllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiii=========*******+++|:,             ,|++****========iiiiiiiillll
33333333llllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiii==========*****+|,              ,|+***=======iiiiiiiiiilllll
3333333333llllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii=========****++|. .       .:::+**======iiiiiiiiiiilllllll
333333333333lllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii========****++||:.    .:|++**=====iiiiiiiiiiilllllllll
333333333333333lllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiii=======***++||:.   .:|+**====iiiiiiiiiiilllllllllll
33333333333333333lllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiii======**++|,  ,,...+*====iiiiiiiiiilllllllllllll
33333333333333333333lllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiii=====**+:  |+++++*===iiiiiiiiiilllllllllllllll
3333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiii===**|,.|***=====iiiiiiiiillllllllllllllllll
3333333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiii===*+***=====iiiiiiiiiillllllllllllllllllll
3333333333333333333333333333lllllllllllllllllllllllllllllllllllllllliiiiiiiiiiii=====iiiiiiiiiiiilllllllllllllllllllllll
3333333333333333333333333333333llllllllllllllllllllllllllllllllllllllllliiiiiiiiiiiiiiiiiiiiiilllllllllllllllllllllllll3
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-complex,
  title = "@thi.ng/complex",
  author = "Karsten Schmidt",
  note = "https://thi.ng/complex",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
