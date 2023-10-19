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

ASCII art mandelbrot fractal using complex number math
```ts tangle:export/mandelbrot.ts
import { abs, madd, type Complex } from "@thi.ng/complex";
import { SHADES_ASCII_16, canvas, formatCanvas } from "@thi.ng/text-canvas";
import { map, range2d, run } from "@thi.ng/transducers";
import { fit2 } from "@thi.ng/vectors";

// mandelbrot evaluation
const mandelbrot = (pos: Complex, escapeRadius: number, maxIter: number) => {
	let i = 0;
	for (
		let z: Complex = pos;
		++i < maxIter && abs(z) < escapeRadius;
		z = madd(z, z, pos)
	);
	return maxIter - i;
};

// text canvas setup
const canv = canvas(120, 60);

// evaluate for all pixels and visualize as ASCII art
run(
	map((pos) => {
		// compute fractal at pos
		const m = mandelbrot(
			// map pixel pos to mandelbrot region
			fit2([], pos, [0, 0], canv.size, [-2, -1.25], [0.65, 1.25]),
			// escape radius
			2000,
			// max iter = number of chars/shades
			16
		);
		// set pixel using corresponding shade
		canv.setAt(pos[0], pos[1], SHADES_ASCII_16[m]);
	}),
	range2d(...canv.size)
);

// output canvas as string
console.log(formatCanvas(canv));
```

```text
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333GGGGGGGGGGGGGGGGGGGGGGGGGGGXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333GGGGGGGGGGGGGGGGGGGGGGGGGX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333lllll333333333333GGGGGGGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333llli=iiilllll3333333333GGGGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333lllii+-,+iiilllll333333333GGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333lllllii=:  +=====illl3333333333GGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333333llllllii==+-  --,,,=illll3333333333GGGGGGGGGGGGG
XXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333llllllliii==++:,   ,:+=iillll33333333333GGGGGGGGGGG
XXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333lllllllliiii==++:,    ,:+==iilllll33333333333GGGGGGGGG
XXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333llllllllliiii==+, ,.      ,:::=iillllll33333333333GGGGGGG
XXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333lllllllllliiiii=+-              -+=iiilllllll3333333333GGGGG
XXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333333333llllllllliiiiiii===+:-             -+==iiiillllllll33333333GGGG
XXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333333llllllliiiiii======++::              -:+===iiiiiiillllll3333333GG
XXGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333llllllllii===++:+++++:::--,            .-:::++====iii===illl3333333G
XGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333llllllllliii=:     ,-:-,                     ..   +++++++- -iill3333333
GGGGGGGGGGGGGGGGGGGGGGGG33333333333333333333lllllllllllliiii==:        .                           ,-- .-,. -:=ill333333
GGGGGGGGGGGGGGGGGGGGGG33333333333333333llllllllllllllliiiii==+:-                                             :=illl33333
GGGGGGGGGGGGGGGGGGGG3333333333333lllllllllllllllllliiiiii===++:-.                                          .:+=illl33333
GGGGGGGGGGGGGGGGG333333333333lllllllllllllllliiiiiiiiii===+:- ..                                           ,+=iillll3333
GGGGGGGGGGGGGGG333333333333lllliiiiiiiiiiiiiiiiiiiiii====+:                                               .-+==iilll3333
GGGGGGGGGGGGG333333333333lllllii: -+===================++:-,                                                -:++=illl333
GGGGGGGGGGG3333333333333lllllii=+, :+++++++: -++++++++++:-,                                                     +illl333
GGGGGGGG33333333333333lllllliii=+- .., ,---   ,---::::::-,                                                      +illl333
GGGGGG3333333333333lllllllliii==+:-,              .,----,                                                    .:+=illl333
GGGG3333333333333lllllllliiii===+:-.                 ...                                                      ,:=illl333
GG33333333333llllllllliiiii===++:-,.                                                                           +iilll333
333333333llllllllllliiii==:+++::,                                                                            .+=iilll333
333333llllllllliiiiiii===+- ,,,..                                                                            -=iillll333
333llllliiiiiiiii======++:-.                                                                                :==iillll333
llliiiii==:-+++++:++++:.,,                                                                                ,:+=iiillll333
                                                                                                         ,:+==iiillll333
llliiiii==:-+++++:++++:.,,                                                                                ,:+=iiillll333
333llllliiiiiiiii======++:-.                                                                                :==iillll333
333333llllllllliiiiiii===+- ,,,..                                                                            -=iillll333
333333333llllllllllliiii==:+++::,                                                                            .+=iilll333
GG33333333333llllllllliiiii===++:-,.                                                                           +iilll333
GGGG3333333333333lllllllliiii===+:-.                 ...                                                      ,:=illl333
GGGGGG3333333333333lllllllliii==+:-,              .,----,                                                    .:+=illl333
GGGGGGGG33333333333333lllllliii=+- .., ,---   ,---::::::-,                                                      +illl333
GGGGGGGGGGG3333333333333lllllii=+, :+++++++: -++++++++++:-,                                                     +illl333
GGGGGGGGGGGGG333333333333lllllii: -+===================++:-,                                                -:++=illl333
GGGGGGGGGGGGGGG333333333333lllliiiiiiiiiiiiiiiiiiiiii====+:                                               .-+==iilll3333
GGGGGGGGGGGGGGGGG333333333333lllllllllllllllliiiiiiiiii===+:- ..                                           ,+=iillll3333
GGGGGGGGGGGGGGGGGGGG3333333333333lllllllllllllllllliiiiii===++:-.                                          .:+=illl33333
GGGGGGGGGGGGGGGGGGGGGG33333333333333333llllllllllllllliiiii==+:-                                             :=illl33333
GGGGGGGGGGGGGGGGGGGGGGGG33333333333333333333lllllllllllliiii==:        .                           ,-- .-,. -:=ill333333
XGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333llllllllliii=:     ,-:-,                     ..   +++++++- -iill3333333
XXGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333llllllllii===++:+++++:::--,            .-:::++====iii===illl3333333G
XXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333333llllllliiiiii======++::              -:+===iiiiiiillllll3333333GG
XXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333333333llllllllliiiiiii===+:-             -+==iiiillllllll33333333GGGG
XXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333lllllllllliiiii=+-              -+=iiilllllll3333333333GGGGG
XXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333llllllllliiii==+, ,.      ,:::=iillllll33333333333GGGGGGG
XXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333lllllllliiii==++:,    ,:+==iilllll33333333333GGGGGGGGG
XXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333333333llllllliii==++:,   ,:+=iillll33333333333GGGGGGGGGGG
XXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333333llllllii==+-  --,,,=illll3333333333GGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333lllllii=:  +=====illl3333333333GGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG33333333333333lllii+-,+iiilllll333333333GGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333llli=iiilllll3333333333GGGGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG333333333333lllll333333333333GGGGGGGGGGGGGGGGGGGGGGG
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG3333333333333333333333GGGGGGGGGGGGGGGGGGGGGGGGGX
```

<!-- include ../../assets/tpl/footer.md -->
