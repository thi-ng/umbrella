import type { Fn, FnAny, IObjectOf } from "@thi.ng/api";
import { isArray, isNumber } from "@thi.ng/checks";
import {
	Group,
	circle as _circle,
	transform as _transform,
	centroid,
	group,
	polygon,
	tessellate,
	text,
	transformVertices,
	vertices as _vertices,
} from "@thi.ng/geom";
import type { IHiccupShape, Tessellator } from "@thi.ng/geom-api";
import { quadFan, tesselInset, triFan } from "@thi.ng/geom-tessellate";
import {
	rotation23,
	scale23,
	scaleWithCenter23,
	transform23,
	translation23,
	type Mat,
} from "@thi.ng/matrices";
import {
	at,
	cpdr,
	defWord,
	ensureStack,
	exec,
	movrd,
	swap,
	vmul,
	type StackContext,
	type StackFn,
} from "@thi.ng/pointfree";
import { ffi, runU } from "@thi.ng/pointfree-lang";
import { map, range2d } from "@thi.ng/transducers";

// this file provides various language bindings to extend the
// thi.ng/pointfree-lang core constructs with geometry specific operations.
// please consult the detailed thi.ng/pointfree and thi.ng/pointfree-lang
// readme's for further information! in short, thi.ng/pointfree words operate on
// a stack-machine like setup (without needing an actual VM), and all operations
// are using merely a `StackContext` object to receive & return data/state. this
// context includes a data stack, return stack and a current environment (aka
// variable bindings)...

// main evaluator/interpreter function. parses and executes the given source
// code and assumes the result is some form of geometry/shapes. the result is
// then wrapped inside a thi.ng/geom group and returned. if an error occurred
// during parsing or execution, the function will return a different group, only
// containing a text() shape with the error message...
export const evalSketch = (src: string, env?: IObjectOf<StackFn>) => {
	try {
		let res = runU(src, { ...POINTFREE_GEOM, ...env }) || [];
		if (!isArray(res)) res = [res];
		return group({ __clear: true, stroke: "#fff", lineJoin: "round" }, res);
	} catch (e) {
		return group({ __background: "#f00" }, [
			text([10, 20], (<Error>e).message, {
				fill: "#fff",
				font: "16px sans-serif",
			}),
		]);
	}
};

// stack helper & guard, checking data stack for underflow
const stack = (ctx: StackContext, n: number) => {
	const ds = ctx[0];
	ensureStack(ds, n);
	return ds;
};

// DSL word to create a circle shape
// stack comment: ( radius -- circle )
const circle: StackFn = (ctx) => {
	const ds = stack(ctx, 1);
	ds.push(_circle(ds.pop()));
	return ctx;
};

// DSL word to create a polygon shape from an array of points
// stack comment: ( points -- polygon )
const poly: StackFn = (ctx) => {
	const ds = stack(ctx, 1);
	ds.push(polygon(ds.pop()));
	return ctx;
};

// DSL word to sample N points on a shape's boundary
// stack comment: ( shape n -- points )
const vertices: StackFn = (ctx) => {
	const ds = stack(ctx, 2);
	const n = ds.pop();
	ds.push(_vertices(ds.pop(), n));
	return ctx;
};

// DSL word to sample & convert a shape to a polygon
// stack comment: ( shape n -- poly )
const asPoly = defWord([vertices, poly]);

// DSL word to wrap an array of shapes as group
// stack comment: ( array -- group )
// const asGroup: StackFn = (ctx) => {
// 	const ds = stack(ctx, 1);
// 	ds.push(group({}, ds.pop()));
// 	return ctx;
// };

// internal helper to define transformation matrices
const defTransformMat =
	(fn: FnAny<Mat>): StackFn =>
	(ctx) => {
		const ds = stack(ctx, 1);
		ds.push(fn([], ds.pop()));
		return ctx;
	};

// DSL word to define a scale matrix: ( factor -- matrix )
const scaleMat = defTransformMat(scale23);
// DSL word to define a rotation matrix: ( theta -- matrix )
const rotateMat = defTransformMat(rotation23);
// DSL word to define a translation matrix: ( offset -- matrix )
const translateMat = defTransformMat(translation23);

// DSL word to scale a shape around its centroid
// stack comment: ( shape factor -- newshape )
const scaleCenter: StackFn = (ctx) => {
	const ds = stack(ctx, 2);
	const scale = ds.pop();
	const shape = ds.pop();
	const $ = isNumber(scale)
		? (shape: IHiccupShape) => {
				const c = centroid(shape)!;
				return <IHiccupShape>(
					_transform(shape, scaleWithCenter23([], c, scale))
				);
		  }
		: (shape: IHiccupShape) => {
				const c = centroid(shape)!;
				ds.push(c, scale);
				exec(ctx);
				return <IHiccupShape>(
					_transform(shape, scaleWithCenter23([], c, ds.pop()))
				);
		  };
	if (shape instanceof Group) {
		ds.push(group({}, shape.children.map($)));
	} else {
		ds.push($(shape));
	}
	return ctx;
};

// DSL word to transform the vertices of a shape (or group) using a given
// quotation which will be applied to each vertex individually
// stack comment: ( shape xform -- newshape )
const transformPoints: StackFn = (ctx) => {
	const ds = stack(ctx, 2);
	const xform = ds.pop();
	const shape = ds.pop();
	ds.push(
		transformVertices(shape, (p) => {
			ds.push(p, xform);
			exec(ctx);
			return ds.pop();
		})
	);
	return ctx;
};

// DSL word to transform a shape using a matrix: ( shape mat -- newshape )
const transform: StackFn = (ctx) => {
	const ds = stack(ctx, 2);
	const mat = ds.pop();
	ds.push(_transform(ds.pop(), mat));
	return ctx;
};

// DSL word to create a TRS transformation matrix:
// stack comment: ( pos theta scale -- matrix )
const defTransform: StackFn = (ctx) => {
	const ds = stack(ctx, 3);
	const scale = ds.pop();
	const theta = ds.pop();
	const pos = ds.pop();
	ds.push(transform23([], pos, theta, scale));
	return ctx;
};

// DSL word to form a transformation matrix from a position and scale factor
// only (rotation always zero): ( pos scale -- matrix )
const regular = defWord([cpdr, vmul, 0, movrd, defTransform]);

// contant for hex grid modifier
const SIN60 = Math.sin(Math.PI / 3);

// DSL word to modify a 2d grid coordinate to form a hex layoud
// stack comment: ( pos -- newpos )
const hex: StackFn = (ctx) => {
	const ds = stack(ctx, 1);
	const p = ds[ds.length - 1];
	const [x, y] = p;
	p[0] = x * 0.75;
	p[1] = (y + (x & 1 ? 0 : 0.5)) * SIN60;
	return ctx;
};

// DSL word to modify a 2d grid coordinate to form a brick layoud
// stack comment: ( pos -- newpos )
const brick: StackFn = (ctx) => {
	const ds = stack(ctx, 1);
	const p = ds[ds.length - 1];
	p[0] += p[1] & 1 ? 0 : 0.5;
	return ctx;
};

// DSL word to replicate a base shape to form a 2d grid and return as group.
// stack comment: ( shape xform col rows -- group )
// the shape will be replicated by repeatedly executing the given `xform`
// quotation to produce a transformation matrix for each grid cell, which MUST
// have this stack behavior: ( pos scale -- matrix )
const grid: StackFn = (ctx) => {
	const ds = stack(ctx, 4);
	const rows: number = ds.pop();
	const cols: number = ds.pop();
	const xform = ds.pop();
	const shape: IHiccupShape = ds.pop();
	ds.push(
		group(
			{},
			map((p) => {
				ds.push(p, xform);
				exec(ctx);
				return <IHiccupShape>_transform(shape, ds.pop());
			}, range2d(cols, rows))
		)
	);
	return ctx;
};

// internal helper to define a tessellator word which subdivides a shape using
// provided tessellation function and returns a group of resulting polygons

// if `isHOF` is true, the generated word will require a 2nd arg on the stack
// stack comment: ( shape -- group) or ( shape arg -- group )
const defTessellator =
	(fn: Tessellator | Fn<number, Tessellator>, isHOF = false): StackFn =>
	(ctx) => {
		const ds = stack(ctx, isHOF ? 2 : 1);
		const arg = isHOF ? ds.pop() : undefined;
		const shape = ds.pop();
		const tessel = <Tessellator>(isHOF ? fn(arg) : fn);
		ds.push(
			group(
				{},
				map((pts) => polygon(pts), tessellate(shape, [tessel]))
			)
		);
		return ctx;
	};

// the entire set of custom words for use with evalSketch() (above)
// the keys of this object are the word names to be used in the pointfree DSL
const POINTFREE_GEOM = ffi(
	{},
	{
		// accessors
		".x": defWord([0, at]),
		".y": defWord([1, at]),
		time: (ctx) => {
			ctx[0].push(Date.now() * 0.001);
			return ctx;
		},
		// shape creation
		circle,
		poly,
		npoly: defWord([0.5, circle, swap, asPoly]),
		"->poly": asPoly,
		vertices,
		// grid generation
		grid,
		hex,
		brick,
		regular,
		// matrices & transformations
		"scale-tx": scaleMat,
		"rotate-tx": rotateMat,
		"translate-tx": translateMat,
		scale: defWord([scaleMat, transform]),
		rotate: defWord([rotateMat, transform]),
		translate: defWord([translateMat, transform]),
		transform,
		"transform-points": transformPoints,
		"scale-center": scaleCenter,
		// tessellators
		trifan: defTessellator(triFan),
		quadfan: defTessellator(quadFan),
		inset: defTessellator(tesselInset, true),
	}
);
