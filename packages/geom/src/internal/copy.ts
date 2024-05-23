// thing:export
import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import type {
	Attribs,
	IShape,
	PCLike,
	PCLikeConstructor,
	PathSegment,
} from "@thi.ng/geom-api";
import { copy, copyVectors } from "@thi.ng/vectors/copy";

/**
 * Creates a shallow copy of shape's attribs. Any `exclude` keys will be removed
 * from result attribs. Syntax sugar for {@link __copyAttribsRaw}.
 *
 * @internal
 */
export const __copyAttribs = ($: IShape, ...exclude: string[]) =>
	__copyAttribsRaw($.attribs, ...exclude);

/**
 * Creates a shallow copy of given `attribs`. Any `exclude` keys will be removed
 * from result.
 *
 * @internal
 */
export const __copyAttribsRaw = (attribs?: Attribs, ...exclude: string[]) =>
	!attribs
		? undefined
		: exclude.length
		? <Attribs>withoutKeysObj({ ...attribs }, exclude)
		: { ...attribs };

/**
 * Syntax sugar for {@link __copyAttribs}, also removing `__samples` key from
 * result.
 *
 * @param x
 *
 * @internal
 */
export const __copyAttribsNoSamples = (x: IShape) =>
	__copyAttribsRaw(x.attribs, "__samples");

/** @internal */
export const __copyShape = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	inst: T
) => new ctor(copyVectors(inst.points), __copyAttribsRaw(inst.attribs));

/** @internal */
export const __copySegment = <T extends PathSegment>(s: T) => {
	const d = <T>{ type: s.type };
	if (s.geo) d.geo = <T["geo"]>s.geo.copy();
	else if (s.point) d.point = copy(s.point);
	return d;
};
