import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import {
    copy,
    ReadonlyVec,
    submN,
    ZERO2,
    ZERO3
} from "@thi.ng/vectors3";
import {
    Circle,
    Ellipse,
    IShape,
    Sphere,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { centroid } from "./centroid";
import { translate } from "./translate";

export const center: MultiFn1O<IShape, ReadonlyVec, IShape> = defmulti(dispatch);

center.add(
    DEFAULT,
    ($, origin = ZERO3) =>
        translate($, submN(null, centroid($), origin, -1))
);

center.addAll({

    [Type.CIRCLE]:
        ($: Circle, origin = ZERO2) =>
            new Circle(copy(origin), $.r, { ...$.attribs }),

    [Type.ELLIPSE]:
        ($: Ellipse, origin = ZERO2) =>
            new Ellipse(copy(origin), copy($.r), { ...$.attribs }),

    [Type.SPHERE]:
        ($: Sphere, origin = ZERO3) =>
            new Sphere(copy(origin), $.r, { ...$.attribs }),

});
