import { defmulti } from "@thi.ng/defmulti";
import { peek } from "@thi.ng/transducers";
import { Vec } from "@thi.ng/vectors3";
import {
    IShape,
    Path,
    PathSegment,
    Polygon,
    Polyline,
    SegmentType,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";
import { douglasPeucker2 } from "../internal/douglas–peucker";

export const simplify = defmulti<IShape, number, IShape>(dispatch);

simplify.addAll({

    [Type.PATH]:
        (path: Path, eps = 0.1) => {
            const res: PathSegment[] = [];
            const orig = path.segments;
            const n = orig.length;
            let points: Vec[];
            let lastP: Vec;
            for (let i = 0; i < n; i++) {
                const s = orig[i];
                if (s.type === SegmentType.LINE || s.type === SegmentType.POLYLINE) {
                    points = points ?
                        points.concat(vertices(s.geo)) :
                        vertices(s.geo);
                    lastP = peek(points);
                } else if (points) {
                    points.push(lastP);
                    res.push({
                        geo: new Polyline(douglasPeucker2(points, eps)),
                        type: SegmentType.POLYLINE,
                    });
                    points = null;
                } else {
                    res.push({ ...s });
                }
            }
            if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline(points),
                    type: SegmentType.POLYLINE,
                });
            }
            return new Path(res, { ...path.attribs });
        },

    [Type.POLYGON]:
        (poly: Polygon, eps = 0.1) =>
            new Polygon(
                douglasPeucker2(poly.points, eps, true),
                { ...poly.attribs }
            ),

    [Type.POLYLINE]:
        (poly: Polyline, eps = 0.1) =>
            new Polyline(
                douglasPeucker2(poly.points, eps),
                { ...poly.attribs }
            ),

});
