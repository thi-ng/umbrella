import type { TaggedFn1 } from "@thi.ng/shader-ast";

export type RaymarchScene = TaggedFn1<"vec3", "vec2">;

export interface RaymarchOpts {
	/**
	 * Name of generated function. Default: "raymarch"
	 */
	name: string;
	/**
	 * Near clipping plane. Default: 0.1
	 */
	near: number;
	/**
	 * Far clipping plane: Default: 10
	 */
	far: number;
	/**
	 * Max. iteration steps. Default: 100
	 */
	steps: number;
	/**
	 * Surface tolerance, i.e. search stops once distance returned from
	 * `scene` function is less than this value. Default: 0.01
	 */
	eps: number;
	/**
	 * March step distance falloff / decay factor. Default: 0.7
	 */
	bias: number;
}
