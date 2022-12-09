import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import type { Group } from "./api/group.js";
import { __dispatch } from "./internal/dispatch.js";
import { rotate } from "./rotate.js";
import { scale } from "./scale.js";
import { transform } from "./transform.js";
import { translate } from "./translate.js";

const TX_ATTRIBS = ["transform", "translate", "rotate", "scale"];

/** @internal */
const __apply = ($: IShape) => {
	let attribs = $.attribs;
	if (!attribs) return $;
	const { transform: tx, translate: t, rotate: r, scale: s } = attribs;
	if (tx)
		return transform(
			$.withAttribs(withoutKeysObj(attribs, TX_ATTRIBS)),
			tx
		);
	if (!(t || r || s)) return $;
	$ = $.withAttribs(withoutKeysObj(attribs, TX_ATTRIBS));
	if (r) $ = rotate($, r);
	if (s) $ = scale($, s);
	if (t) $ = translate($, t);
	return $;
};

/**
 * Applies any spatial transformation attributes defined (if any) for the given
 * shape. If no such attributes exist, the original shape is returned as is.
 *
 * @remarks
 * The following attributes are considered:
 *
 * - transform: A 2x3 (for 2D) or 4x4 (for 3D) transformation matrix
 * - translate: Translation/offset vector
 * - scale: A scale factor (scalar or vector)
 * - rotate: Rotation angle (in radians)
 *
 * If the `transform` attrib is given, the others will be ignored. If any of the
 * other 3 attribs is provided, the order of application is: rotate, scale,
 * translate. Any of these relevant attributes will be removed from the
 * transformed shapes to ensure idempotent behavior.
 *
 * For (@link group} shapes, the children are processed in depth-first order
 * with any transformations to the group itself applied last.
 *
 * Note: Where possible, this function delegates to {@link rotate},
 * {@link scale}, {@link translate} to realize individual/partial transformation
 * aspects to increase the likelihodd of retaining original shape types. E.g.
 * uniformly scaling a circle with a scalar factor retains a circle, but scaling
 * non-uniformly will convert it to an ellipse... Similarly, rotating a rect
 * will convert it to a quad etc.
 *
 * @param shape
 */
export const applyTransforms: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
	__dispatch,
	{},
	{
		[DEFAULT]: __apply,

		group: ($: Group) =>
			__apply($.copyTransformed((x) => <IHiccupShape>applyTransforms(x))),
	}
);
