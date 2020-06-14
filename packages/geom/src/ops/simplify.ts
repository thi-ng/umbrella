import { peek } from "@thi.ng/arrays";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IShape, PathSegment, SegmentType, Type } from "@thi.ng/geom-api";
import { simplify as _simplify } from "@thi.ng/geom-resample";
import { Path } from "../api/path";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";
import type { IObjectOf } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export const simplify = defmulti<IShape, number, IShape>(dispatch);

simplify.addAll(<IObjectOf<Implementation2<unknown, number, IShape>>>{
    [Type.PATH]: ($: Path, eps = 0.1) => {
        const res: PathSegment[] = [];
        const orig = $.segments;
        const n = orig.length;
        let points!: Vec[] | null;
        let lastP!: Vec;
        for (let i = 0; i < n; i++) {
            const s = orig[i];
            if (
                s.type === SegmentType.LINE ||
                s.type === SegmentType.POLYLINE
            ) {
                points = points
                    ? points.concat(vertices(s.geo!))
                    : vertices(s.geo!);
                lastP = peek(points);
            } else if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline(_simplify(points, eps)),
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
        return new Path(res, copyAttribs($));
    },

    [Type.POLYGON]: ($: Polygon, eps = 0.1) =>
        new Polygon(_simplify($.points, eps, true), copyAttribs($)),

    [Type.POLYLINE]: ($: Polyline, eps = 0.1) =>
        new Polyline(_simplify($.points, eps), copyAttribs($)),
});
