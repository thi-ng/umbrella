// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn3 } from "@thi.ng/api";
import type { Attribs, IShape, ITessellation, Tessellator } from "@thi.ng/geom";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { DrawMode, ShaderSpec } from "@thi.ng/webgl";

export interface AsWebGLOpts {
	stride: number;
	uv: UVGen;
	color: "uniform" | "vertex";
	mode: DrawMode;
	shader: Partial<ShaderSpec>;
	tessel: { passes: Tessellator[]; impl?: ITessellation };
}

export interface AsWebGLAttribs extends Attribs {
	__webgl: Partial<AsWebGLOpts>;
}

export type UVGen = Fn<IShape, Fn3<ReadonlyVec, number, ReadonlyVec[], Vec>>;
