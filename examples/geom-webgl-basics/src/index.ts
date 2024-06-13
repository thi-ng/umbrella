import { colorFromRange, srgb } from "@thi.ng/color";
import {
	complexPolygonFromPath,
	fitIntoBounds2,
	pathFromSvg,
	rectWithCentroid,
} from "@thi.ng/geom";
import { asWebGlModel } from "@thi.ng/geom-webgl";
import { scale22 } from "@thi.ng/matrices";
import {
	clearCanvas,
	compileModel,
	draw,
	glCanvas,
	type GLMat2,
	type UncompiledModelSpec,
} from "@thi.ng/webgl";

const W = 600;
const SCALE = window.devicePixelRatio / W;

const { gl } = glCanvas({
	width: W,
	height: W,
	version: 2,
	parent: document.getElementById("app")!,
});

// parse SVG path data & construct as path shape type
const A = pathFromSvg(
	`M11.704 22.915q-5.958 3.596-8.143 5.994Q0 32.857 0 38.744q0 5.465 3.666 9.836 3.667 4.337 11.74 4.337 5.465 0 9.66-2.539 2.397-1.445 5.288-4.583l4.865 5.923h8.179l-9.201-11.176q0 .882 1.798-3.666 1.798-4.583 2.397-9.554h-6.029q-.387 2.503-.775 3.913-.353 1.375-1.305 4.196l-9.448-11.282q4.301-2.855 6.135-5.041 3.137-3.737 3.137-8.708 0-4.266-3.032-7.333T18.65 0q-5.676 0-9.06 3.314-3.385 3.279-3.385 8.285 0 2.397 1.093 4.97 1.128 2.574 4.406 6.346zm4.16 24.432q-3.42 0-6.451-2.221-2.997-2.222-2.997-6.346 0-3.808 2.327-6.452 1.516-1.763 6.487-5.076L26.934 41.53q-1.516 2.22-4.336 4.019-2.82 1.798-6.734 1.798zm1.622-27.287q-2.75-3.138-3.948-5.112-1.164-1.974-1.164-4.125 0-1.586.776-2.926 1.516-2.609 5.429-2.609 2.574 0 4.09 1.657 1.515 1.657 1.515 3.949 0 2.926-2.08 5.323-1.269 1.48-4.618 3.843z`
);

// sample path with uniform vertex distance and convert to complex polygon (w/ holes)
// scale & translate to fit into given target rect
const geo = fitIntoBounds2(
	complexPolygonFromPath(A, { dist: 2 }, { fill: [1, 1, 0, 1] }),
	rectWithCentroid([0, 0], 500)
)!;

// now convert everything to full WebGL model specs (this includes tessellation
// of polygons, declaration of more attribs & shader specs etc.) the function
// always returns an array of model specs. here we're only interested in the
// first/only result...
const model = asWebGlModel(geo, {
	// create color vertex attribute (other option is as uniform or no color at all)
	color: "vertex",
	// define a partial shader spec.
	// `asWebGLModel()` will augment attrib and/or uniform definitions
	shader: {
		vs: `void main() { gl_Position = vec4(view * pos, 0., 1.); vcol = color; }`,
		fs: `void main() { fragColor = vcol; }`,
		varying: { vcol: "vec4" },
		uniforms: { view: ["mat2", <GLMat2>scale22([], [SCALE, -SCALE])] },
	},
})[0];

// get vector view of color attribute buffer and randomize each item
//
// references:
// - https://docs.thi.ng/umbrella/vector-pools/ (readme examples)
// - https://docs.thi.ng/umbrella/vector-pools/classes/AttribPool.html
for (let col of model.attribPool?.attribValues<Float32Array>("color")!) {
	// pick random color for each vertex
	// see: https://docs.thi.ng/umbrella/color/#md:color-theme-generation
	col.set(srgb(colorFromRange("bright")));
}

// compile all attrib buffers & shader
const $model = compileModel(gl, <UncompiledModelSpec>model);

// draw
clearCanvas(gl, [0.9, 0.9, 0.9, 1]);
draw($model);
