// thing:export
import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import type { Vec } from "@thi.ng/vectors";
import { copy, copyVectors } from "@thi.ng/vectors/copy";
import type {
	Attribs,
	IShape,
	PCLike,
	PCLikeConstructor,
	PathSegment,
} from "../api.js";

/**
 * Creates a shallow copy of given `attribs`. Any `exclude` keys will be removed
 * from result.
 *
 * @internal
 */
export const __copyAttribs = (attribs?: Attribs, ...exclude: string[]) =>
	!attribs
		? undefined
		: exclude.length
		? <Attribs>withoutKeysObj({ ...attribs }, exclude)
		: { ...attribs };

/**
 * Syntax sugar for {@link __copyShapeAttribs}, also removing `__samples` key from
 * result.
 *
 * @param x
 *
 * @internal
 */
export const __copyAttribsNoSamples = (x: IShape) =>
	__copyAttribs(x.attribs, "__samples");

/** @internal */
export const __copyShape = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	inst: T,
	points?: Vec[]
) => new ctor(points || copyVectors(inst.points), __copyAttribs(inst.attribs));

/** @internal */
export const __copySegment = <T extends PathSegment>(s: T) => {
	const d = <T>{ type: s.type };
	if (s.geo) d.geo = <T["geo"]>s.geo.copy();
	else if (s.point) d.point = copy(s.point);
	return d;
};
