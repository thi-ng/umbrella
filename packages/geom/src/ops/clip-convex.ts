import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IHiccupShape, IShape, Type } from "@thi.ng/geom-api";
import { clipLineSegmentPoly } from "@thi.ng/geom-clip-line";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { centroid } from "@thi.ng/geom-poly-utils";
import { ReadonlyVec } from "@thi.ng/vectors";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { ensureVertices, vertices } from "./vertices";

export const clipConvex = defmulti<
    IShape,
    IShape | ReadonlyVec[],
    IShape | undefined
>(dispatch);

clipConvex.addAll(<
    IObjectOf<
        Implementation2<unknown, IShape | ReadonlyVec[], IShape | undefined>
    >
>{
    [Type.GROUP]: ({ children, attribs }: Group, boundary) => {
        boundary = ensureVertices(boundary);
        const clipped: IHiccupShape[] = [];
        for (let c of children) {
            const res = clipConvex(c, boundary);
            if (res) clipped.push(<IHiccupShape>res);
        }
        return new Group({ ...attribs }, clipped);
    },

    [Type.LINE]: ($: Line, boundary) => {
        const segments = clipLineSegmentPoly(
            $.points[0],
            $.points[1],
            ensureVertices(boundary)
        );
        return segments && segments.length
            ? new Line(segments[0], copyAttribs($))
            : undefined;
    },

    [Type.POLYGON]: ($: Polygon, boundary) => {
        boundary = ensureVertices(boundary);
        const pts = sutherlandHodgeman($.points, boundary, centroid(boundary));
        return pts.length ? new Polygon(pts, copyAttribs($)) : undefined;
    },

    [Type.RECT]: ($: IShape, boundary) => {
        boundary = ensureVertices(boundary);
        const pts = sutherlandHodgeman(
            vertices($),
            boundary,
            centroid(boundary)
        );
        return pts.length ? new Polygon(pts, copyAttribs($)) : undefined;
    },
});

clipConvex.isa(Type.CIRCLE, Type.RECT);
clipConvex.isa(Type.ELLIPSE, Type.RECT);
clipConvex.isa(Type.PATH, Type.RECT);
clipConvex.isa(Type.QUAD, Type.POLYGON);
clipConvex.isa(Type.TRIANGLE, Type.POLYGON);
