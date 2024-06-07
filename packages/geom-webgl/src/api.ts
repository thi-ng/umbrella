import type { Fn3 } from "@thi.ng/api";
import type { Attribs, Tessellator } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { DrawMode, ShaderSpec } from "@thi.ng/webgl";

export interface AsWebGLOpts {
	stride: number;
	uv: UVGen;
	color: "uniform" | "vertex";
	mode: DrawMode;
	shader: Partial<ShaderSpec>;
	tessel: Tessellator[];
}

export interface AsWebGLAttribs extends Attribs {
	__webgl: Partial<AsWebGLOpts>;
}

export type UVGen = Fn3<ReadonlyVec, number, ReadonlyVec[], Vec>;
