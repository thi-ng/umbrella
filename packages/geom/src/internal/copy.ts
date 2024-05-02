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
 * from result attribs.
 *
 * @internal
 */
export const __copyAttribs = ($: IShape, ...exclude: string[]) => {
	if (!$.attribs) return;
	const attribs = <Attribs>{ ...$.attribs };
	return exclude.length ? <Attribs>withoutKeysObj(attribs, exclude) : attribs;
};

/**
 * Syntax sugar for {@link __copyAttribs}, also removing `__samples` key from
 * result.
 *
 * @param x
 *
 * @internal
 */
export const __copyAttribsNoSamples = (x: IShape) =>
	__copyAttribs(x, "__samples");

/** @internal */
export const __copyShape = <T extends PCLike>(
	ctor: PCLikeConstructor,
	inst: T
) => <T>new ctor(copyVectors(inst.points), __copyAttribs(inst));

/** @internal */
export const __copySegment = (s: PathSegment) => {
	const d: PathSegment = { type: s.type };
	s.point && (d.point = copy(s.point));
	s.geo && (d.geo = <any>s.geo.copy());
	return d;
};
