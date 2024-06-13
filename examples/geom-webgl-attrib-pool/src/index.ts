import { meldDeepObj } from "@thi.ng/associative";
import { colorFromRange, srgb } from "@thi.ng/color";
import {
	TESSELLATE_TRI_FAN,
	asPolyline,
	circle,
	complexPolygonFromPath,
	fitIntoBounds2,
	group,
	pathFromSvg,
	pointAt,
	rectWithCentroid,
	star,
} from "@thi.ng/geom";
import { asWebGlModel, generateUVBounds2 } from "@thi.ng/geom-webgl";
import { fract } from "@thi.ng/math";
import { scale22 } from "@thi.ng/matrices";
import { SYSTEM } from "@thi.ng/random";
import { AttribPool } from "@thi.ng/vector-pools";
import { add2, normalize2, type Vec } from "@thi.ng/vectors";
import {
	checkerboard,
	clearCanvas,
	compileModel,
	defTexture,
	draw,
	glCanvas,
	type GLMat2,
	type UncompiledModelSpec,
} from "@thi.ng/webgl";

const W = 600;
const SCALE = window.devicePixelRatio / W;
const SPEED = 5;
const NUM_DISCS = 20;
const DISC_RES = 20;
const BG_COLOR = [0.9, 0.9, 0.9, 1];
const RND = SYSTEM;

// parse SVG path data & construct as path shape type
const A = pathFromSvg(
	`M11.704 22.915q-5.958 3.596-8.143 5.994Q0 32.857 0 38.744q0 5.465 3.666 9.836 3.667 4.337 11.74 4.337 5.465 0 9.66-2.539 2.397-1.445 5.288-4.583l4.865 5.923h8.179l-9.201-11.176q0 .882 1.798-3.666 1.798-4.583 2.397-9.554h-6.029q-.387 2.503-.775 3.913-.353 1.375-1.305 4.196l-9.448-11.282q4.301-2.855 6.135-5.041 3.137-3.737 3.137-8.708 0-4.266-3.032-7.333T18.65 0q-5.676 0-9.06 3.314-3.385 3.279-3.385 8.285 0 2.397 1.093 4.97 1.128 2.574 4.406 6.346zm4.16 24.432q-3.42 0-6.451-2.221-2.997-2.222-2.997-6.346 0-3.808 2.327-6.452 1.516-1.763 6.487-5.076L26.934 41.53q-1.516 2.22-4.336 4.019-2.82 1.798-6.734 1.798zm1.622-27.287q-2.75-3.138-3.948-5.112-1.164-1.974-1.164-4.125 0-1.586.776-2.926 1.516-2.609 5.429-2.609 2.574 0 4.09 1.657 1.515 1.657 1.515 3.949 0 2.926-2.08 5.323-1.269 1.48-4.618 3.843z`
);

// sample path with uniform vertex distance and convert to complex polygon (w/ holes)
// scale & translate to fit into given target rect
const charGeo = fitIntoBounds2(
	complexPolygonFromPath(
		A,
		{ dist: 2 },
		{
			// colors are to be given as RGBA vectors (vec4)
			fill: [1, 1, 0, 1],
			// WebGL conversion options
			__webgl: {
				// create color vertex attribute (other option is as uniform or ignore color)
				color: "vertex",
				// partial shader spec (the WebGL conversion will inject `pos` & `color` attribs automatically)
				// the `view` matrix used in the vertex shader will be defined further down
				shader: {
					vs: `void main() { gl_Position = vec4(view * pos, 0., 1.); vcol = color; }`,
					fs: `void main() { fragColor = vcol; }`,
					varying: { vcol: "vec4" },
				},
			},
		}
	),
	rectWithCentroid([0, 0], W - 100)
)!;

// create a fill circle/disc and configure WebGL model to use both texturing & instancing
// (i.e. later we gonna be drawing multiple discs with a single draw call, using WebGL instancing)
const discGeo = circle(1, {
	// color as RGBA vec4
	fill: [1, 0, 0, 1],
	// circles are converted to polygons for WebGL conversion
	// this attribs defines the number of vertices to use (constant defined above)
	__samples: DISC_RES,
	// WebGL conversion options
	__webgl: {
		// UV texture coordinate generation strategy
		// this one maps 2D shape vertices into [0,1] UV rect (by default), using the shape's bounding rect.
		uv: generateUVBounds2(),
		// partial shader spec
		shader: {
			// note the additional `ipos` and `r` attribs used here
			// these are instance attribs which will be defined & initialized further below
			vs: `void main() { gl_Position = vec4(view * (pos * r + ipos), 0., 1.); vUV = uv; }`,
			fs: `void main() { fragColor = texture(tex, vUV); }`,
			// pre-declare additional instance attribs
			attribs: { ipos: "vec2", r: "float" },
			varying: { vUV: "vec2" },
			uniforms: { tex: "sampler2D" },
		},
	},
});

// convert the character polygon into polylines (outlines only)
// note: we're only specifying a vertex shader here, the fragment shader part
// will be defined via the attribs of the group this shape will belong to
// (defined below)...
const outlineGeo = group(
	{
		// outline color
		stroke: [0, 0, 1, 1],
		__webgl: {
			shader: {
				vs: `void main() { gl_Position = vec4(view * pos, 0., 1.); }`,
			},
		},
	},
	asPolyline(charGeo)
);

// create a star polygon to later sweep along the outlines of the character.
// the character has 1 boundary and 2 holes, so we will later create 3
// instances of this shape
const cursorGeo = star(10, 6, [1, 0.5], {
	fill: [0, 0, 1, 1],
	__webgl: {
		// use a custom tessellator (here to create a triangle fan)
		tessel: { passes: [TESSELLATE_TRI_FAN] },
		// we want to easily reposition this shape later, so define a
		shader: {
			vs: `void main() { gl_Position = vec4(view * (pos + ipos), 0., 1.); }`,
			// declare the instance position attrib
			attribs: { ipos: "vec2" },
		},
	},
});

// group outlines & cursor and merge their WebGL configs with the shared config
// of the group (shape opts will always override group opts)
const outlineGroup = group(
	{
		__webgl: {
			// here we only want to use a single color, hence declare a uniform.
			// the uniform decl for the shader will be auto-injected by the
			// WebGL conversion process
			color: "uniform",
			shader: { fs: `void main() { fragColor = color; }` },
		},
	},
	[outlineGeo, cursorGeo]
);

// group all geometry created so far...
const geo = group({}, [discGeo, charGeo, outlineGroup]);

// now convert everything to full WebGL model specs (this includes tessellation
// of polygons, declaration of more attribs & shader specs etc.) the function
// always returns an array of model specs. the returned array is always flat,
// i.e. has no more group-hierarchies! (and again, we can provide additional
// WebGL conversion opts to merge with those given to individual shapes/groups,
// i.e. shader uniforms which are also injected for each shape/shader defined in
// the group...)
const models = asWebGlModel(geo, {
	shader: {
		uniforms: {
			// create view/scale matrix, incl. flipping the Y-axis
			// (SVG Yaxis is pointing down vs.WebGL is pointing up)
			view: ["mat2", <GLMat2>scale22([], [SCALE, -SCALE])],
		},
	},
});

// destructure the model array to obtain named references for legibility
const [discModel, charModel, _, __, ___, cursorModel] = models;

// create WebGL canvas & attach to DOM
const { gl } = glCanvas({
	width: W,
	height: W,
	version: 2,
	parent: document.getElementById("app")!,
});

// we earlier mentioned that the disc will use WebGL instancing to draw multiple
// copies of the base model, each with instance-specific attributes. this is how
// we initialize & configure it all...

// create managed memory views with specific config for each attribute
// we can then pass this attrib pool to the WebGL model spec
const discInstances = new AttribPool({
	num: NUM_DISCS,
	// ensure we reserve sufficient memory (here 20 bytes per instance)
	mem: { size: NUM_DISCS * 20 + 64 },
	attribs: {
		// instance position (vec2)
		ipos: { type: "f32", size: 2, byteOffset: 0 },
		// direction (vec2)
		dir: { type: "f32", size: 2, byteOffset: 8 },
		// radius (float)
		r: { type: "f32", size: 1, byteOffset: 16 },
	},
});

// initialize both the discs direction vectors & radii to random values
for (let i = 0; i < NUM_DISCS; i++) {
	// create a random direction vector, normalize to random length
	discInstances.setAttribValue(
		"dir",
		i,
		normalize2(
			[],
			[RND.norm(0.66), RND.norm()],
			RND.minmax(0.25, 1) * SPEED
		)
	);
	// randomize radius
	discInstances.setAttribValue("r", i, RND.minmax(20, 60));
}

// deep-merge instancing configuration into the disc's model spec
// (btw. there's also a `mergeDeepObj()` sibling function which creates a new
// object instead of merging into an existing one, as done here...)
meldDeepObj(discModel, <Partial<UncompiledModelSpec>>{
	// use the attrib pool to define instance attribs
	instancePool: discInstances,
	// create a simple procedural texture and associate it with this model
	textures: [
		defTexture(gl, { image: checkerboard({ size: 8, col2: 0xffff0000 }) }),
	],
});

const NUM_CURSORS = outlineGeo.children.length;

// similar to above, create another attrib pool for the star cursor instances
const cursorInstances = new AttribPool({
	num: NUM_CURSORS,
	mem: { size: NUM_CURSORS * 8 + 64 },
	attribs: { ipos: { type: "f32", size: 2, byteOffset: 0 } },
});

// and again merge into the model spec of the cursor model
meldDeepObj(cursorModel, <Partial<UncompiledModelSpec>>{
	instancePool: cursorInstances,
});

// onwards to the next model customization, here the `ampersand`:
// get a vector view of the color attribute buffer and randomize each item
//
// references:
// - https://docs.thi.ng/umbrella/vector-pools/ (readme examples)
// - https://docs.thi.ng/umbrella/vector-pools/classes/AttribPool.html
for (let col of charModel.attribPool?.attribValues<Float32Array>("color")!) {
	// pick random color for each vertex
	// see: https://docs.thi.ng/umbrella/color/#md:color-theme-generation
	col.set(srgb(colorFromRange("bright")));
}

// print all the model specs (still uncompiled) for debugging
console.log(models);

// big moment: compile all model specs, actually creating the WebGL buffers & shaders
const $models = models.map((m) => compileModel(gl, <UncompiledModelSpec>m));

// store a direct handles to the disc & cursor instance positions attrib buffers
// (note: we can only reference these _after_ compiling the model specs, since
// those buffers are only being created as part of that compilation process...)
const discPositions = discModel.instances!.attribs.ipos.buffer!;
const cursorPositions = cursorModel.instances!.attribs.ipos.buffer!;

// animation loop
const t0 = performance.now();
const update = () => {
	const time = (performance.now() - t0) * 0.001;

	// update all discs/balls, bounce them on the canvas edges
	for (let i = 0; i < NUM_DISCS; i++) {
		const pos = <Vec>discInstances.attribValue("ipos", i);
		const dir = <Vec>discInstances.attribValue("dir", i);
		const r = <number>discInstances.attribValue("r", i);
		const bounce = W / 2 - r;
		add2(pos, pos, dir);
		for (let j = 0; j < 2; j++) {
			if (pos[j] < -bounce) {
				pos[j] += 2 * (-bounce - pos[j]);
				dir[j] *= -1;
			} else if (pos[j] > bounce) {
				pos[j] += 2 * (bounce - pos[j]);
				dir[j] *= -1;
			}
		}
	}

	// update the cursor positions by sampling the outlines at
	// normalized positions ([0,1] interval, i.e. 0=start, 1=end)
	// `fract(x)` returns the fractional part of x
	const t = fract(time * 0.05);
	for (let i = 0; i < NUM_CURSORS; i++) {
		const p = pointAt(outlineGeo.children[i], t)!;
		cursorInstances.setAttribValue("ipos", i, p);
	}

	// reflect all changes on the GPU side by updating the instance buffers
	discPositions.update();
	cursorPositions.update();

	clearCanvas(gl, BG_COLOR);
	// draw all models
	draw($models);
	requestAnimationFrame(update);
};

update();
