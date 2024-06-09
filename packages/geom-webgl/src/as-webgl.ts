import { typedArrayOfVec, type IObjectOf } from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { assert } from "@thi.ng/errors/assert";
import type { IShape } from "@thi.ng/geom";
import { ComplexPolygon } from "@thi.ng/geom/api/complex-polygon";
import type { Path } from "@thi.ng/geom/api/path";
import type { Polygon } from "@thi.ng/geom/api/polygon";
import type { Polyline } from "@thi.ng/geom/api/polyline";
import { asPolygon } from "@thi.ng/geom/as-polygon";
import { asPolyline } from "@thi.ng/geom/as-polyline";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import { TESSELLATE_EARCUT_COMPLEX, tessellate } from "@thi.ng/geom/tessellate";
import { repeat } from "@thi.ng/transducers/repeat";
import type { AttribSpec } from "@thi.ng/vector-pools";
import { AttribPool } from "@thi.ng/vector-pools/attrib-pool";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { ShaderSpec, UncompiledModelSpec } from "@thi.ng/webgl";
import { DrawMode } from "@thi.ng/webgl/api/model";
import type { AsWebGLOpts } from "./api.js";

const MEM_OVERHEAD = 40;
const DEFAULT_COLOR = [1, 1, 1, 1];

/**
 * Converts given `shape` to a WebGL
 * [`UncompiledModelSpec`](https://docs.thi.ng/umbrella/webgl/interfaces/UncompiledModelSpec.html)
 * (incl. attrib & shader specs).
 *
 * @remarks
 * Conversion behavior can be customized via given `opts` and/or the `__webgl`
 * attrib, which must comply with partial {@link AsWebGLOpts}. Furthermore,
 * shape types which also require conversion to polygon or polyline (e.g.
 * circle), can control that conversion via their `__sample` control attrib (see
 * [`asPolygon()`](https://docs.thi.ng/umbrella/geom/functions/asPolygon.html)
 * for reference).
 *
 * Currently supported shape types (only 2D so far):
 *
 * - arc
 * - circle
 * - cubic
 * - complex polygon
 * - ellipse
 * - line
 * - polygon
 * - polyline
 * - quad
 * - quadratic
 * - rect
 * - triangle
 *
 * @param shape
 * @param opts
 */
export const asWebGlModel = <
	MultiFn1O<IShape, Partial<AsWebGLOpts>, Partial<UncompiledModelSpec>>
>defmulti<any, Partial<AsWebGLOpts>, Partial<UncompiledModelSpec>>(
	__dispatch,
	{
		arc: "$aspolyline",
		cubic: "$aspolyline",
		circle: "$aspoly",
		complexpoly: "poly",
		ellipse: "$aspoly",
		line: "polyline",
		quad: "poly",
		quadratic: "$aspolyline",
		rect: "$aspoly",
		tri: "poly",
	},
	{
		$aspoly: ($, opts) => asWebGlModel(asPolygon($)[0], opts),

		$aspolyline: ($, opts) => asWebGlModel(asPolyline($)[0], opts),

		path: ($: Path, opts) =>
			asWebGlModel(($.closed ? asPolygon($) : asPolyline($))[0], opts),

		poly: ($: Polygon, opts) => {
			opts = {
				tessel:
					$ instanceof ComplexPolygon
						? []
						: [TESSELLATE_EARCUT_COMPLEX()],
				...opts,
				...$.attribs?.__webgl,
			};
			const tess = tessellate($, opts.tessel!);
			const indices = typedArrayOfVec("u32", tess.indices);
			const num = indices.length;
			assert(num % 3 === 0, `tessellation must result in triangles`);
			return defModel(
				opts,
				tess.points,
				num,
				indices,
				$.attribs?.fill,
				DrawMode.TRIANGLES
			);
		},

		polyline: ({ points, attribs }: Polyline, opts) => {
			opts = { ...opts, ...attribs?.__webgl };
			return defModel(
				opts,
				points,
				points.length,
				undefined,
				attribs?.stroke,
				DrawMode.LINE_STRIP
			);
		},
	}
);

const defModel = (
	opts: Partial<AsWebGLOpts>,
	points: ReadonlyVec[],
	num: number,
	indices?: Uint32Array,
	color: any = DEFAULT_COLOR,
	mode: DrawMode = DrawMode.TRIANGLES
) => {
	let size = 8;
	const specs: IObjectOf<AttribSpec> = {
		pos: {
			type: "f32",
			size: 2,
			stride: opts.stride,
			byteOffset: 0,
			data: points,
		},
	};
	if (opts.uv) {
		specs.uv = {
			type: "f32",
			size: 2,
			stride: opts.stride,
			byteOffset: 8,
			data: points.map(opts.uv),
		};
		size += 8;
	}
	if (opts.color === "vertex") {
		assert(
			isArrayLike(color),
			`shape color must be given as [r,g,b,a] array`
		);
		specs.color = {
			type: "f32",
			size: 4,
			stride: opts.stride,
			byteOffset: opts.uv ? 16 : 8,
			data: [...repeat(color, points.length)],
		};
		size += 16;
	}
	const pool = new AttribPool({
		mem: {
			size: (opts.stride ?? size) * points.length + MEM_OVERHEAD,
		},
		num: points.length,
		attribs: specs,
	});
	const model: Partial<UncompiledModelSpec> = {
		attribPool: pool,
		mode: opts.mode ?? mode,
		num,
		uniforms: {},
	};
	if (indices) {
		model.indices = { data: indices };
	}
	if (opts.shader) {
		const shader: ShaderSpec = {
			vs: "",
			fs: "",
			attribs: {},
			uniforms: {},
			...opts.shader,
		};
		shader.attribs.pos = "vec2";
		if (opts.uv) {
			shader.attribs.uv = "vec2";
		}
		if (opts.color === "vertex") {
			shader.attribs.color = "vec4";
		}
		if (opts.color === "uniform") {
			shader.uniforms!.color = "vec4";
			model.uniforms!.color = color;
		}
		model.shader = shader;
	}
	return model;
};
