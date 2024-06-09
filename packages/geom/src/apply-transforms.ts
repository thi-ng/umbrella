import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type {
	IHiccupShape2,
	IHiccupShape3,
	IShape,
	IShape2,
	IShape3,
} from "./api.js";
import type { Arc } from "./api/arc.js";
import type { Circle } from "./api/circle.js";
import type { Ellipse } from "./api/ellipse.js";
import type { Group } from "./api/group.js";
import type { Group3 } from "./api/group3.js";
import type { Rect } from "./api/rect.js";
import { __dispatch } from "./internal/dispatch.js";
import { rotateX, rotateY, rotateZ } from "./rotate-around-axis.js";
import { rotate } from "./rotate.js";
import { scale } from "./scale.js";
import { transform } from "./transform.js";
import { translate } from "./translate.js";

/**
 * Function overrides for {@link applyTransforms}.
 */
export type ApplyTransformsFn = {
	(shape: Arc): IShape2;
	(shape: Circle): IShape2;
	(shape: Ellipse): IShape2;
	(shape: Rect): IShape2;
	<T extends IShape2>(shape: T): T;
	<T extends IShape3>(shape: T): T;
} & MultiFn1<IShape, IShape>;

const TX_ATTRIBS = [
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"scale",
	"transform",
	"translate",
];

/** @internal */
const __apply = ($: IShape) => {
	let attribs = $.attribs;
	if (!attribs) return $;
	const {
		transform: tx,
		translate: t,
		rotate: r,
		scale: s,
		rotateX: rx,
		rotateY: ry,
		rotateZ: rz,
	} = attribs;
	if (tx)
		return transform(
			$.withAttribs(withoutKeysObj(attribs, TX_ATTRIBS)),
			tx
		);
	if (!(t || r || s)) return $;
	$ = $.withAttribs(withoutKeysObj(attribs, TX_ATTRIBS));
	if (r != null && $.dim === 2) $ = rotate(<IShape2>$, r);
	if (rx != null && $.dim === 3) $ = rotateX(<IShape3>$, rx);
	if (ry != null && $.dim === 3) $ = rotateY(<IShape3>$, ry);
	if (rz != null && $.dim === 3) $ = rotateZ(<IShape3>$, rz);
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
 * - `transform`: A 2x3 (for 2D) or 4x4 (for 3D) transformation matrix
 * - `translate`: Translation/offset vector
 * - `scale`: A scale factor (scalar for uniform or vector for non-uniform)
 * - `rotate`: Rotation angle (in radians, 2D only)
 * - `rotate[XYZ]`: Rotation angle (in radians, 3D only)
 *
 * If the `transform` attrib is given, the others will be ignored. If any of the
 * other 3 attribs is provided, the order of application is: rotate, scale,
 * translate. Any of these relevant attributes will be removed from the
 * transformed shapes to ensure idempotent behavior.
 *
 * For (@link group} shapes, the children are processed in depth-first order
 * with any transformations to the group itself applied post-order.
 *
 * Note: Where possible, this function delegates to {@link rotate} (for 2D),
 * {@link rotateX}, {@link rotateY}, {@link rotateZ} (all for 3D), {@link scale}
 * and {@link translate} to realize individual/partial transformation aspects to
 * increase the likelihood of retaining original shape types. E.g. uniformly
 * scaling a circle with a scalar factor retains a circle, but scaling
 * non-uniformly will convert it to an ellipse... Similarly, rotating a rect
 * will convert it to a quad etc.
 *
 * For those shape types for which a shape conversion _might_ be involved, the
 * function only returns a generic `IShape2` or `IShape3` type. To find out if a
 * shape conversion will apply, please consult the docs for the above linked
 * transformation functions.
 *
 * @param shape
 */
export const applyTransforms = <ApplyTransformsFn>defmulti<any, IShape>(
	__dispatch,
	{},
	{
		[DEFAULT]: __apply,

		group: ($: Group) =>
			__apply(
				$.copyTransformed((x) => <IHiccupShape2>applyTransforms(x))
			),

		group3: ($: Group3) =>
			__apply(
				$.copyTransformed((x) => <IHiccupShape3>applyTransforms(x))
			),
	}
);
