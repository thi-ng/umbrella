import { DEFAULT, defmulti, MultiFn1O } from "@thi.ng/defmulti";
import {
    ReadonlyVec,
    set2,
    set3,
    submN,
    ZERO2,
    ZERO3
} from "@thi.ng/vectors";
import {
    Arc,
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

    [Type.ARC]:
        ($: Arc, origin = ZERO2) =>
            new Arc(set2([], origin), set2([], $.r), $.axis, $.start, $.end, $.xl, $.cw, { ...$.attribs }),

    [Type.CIRCLE]:
        ($: Circle, origin = ZERO2) =>
            new Circle(set2([], origin), $.r, { ...$.attribs }),

    [Type.ELLIPSE]:
        ($: Ellipse, origin = ZERO2) =>
            new Ellipse(set2([], origin), set2([], $.r), { ...$.attribs }),

    [Type.SPHERE]:
        ($: Sphere, origin = ZERO3) =>
            new Sphere(set3([], origin), $.r, { ...$.attribs }),

});
