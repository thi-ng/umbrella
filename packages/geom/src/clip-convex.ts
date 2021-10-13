import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import { clipLineSegmentPoly } from "@thi.ng/geom-clip-line/clip-poly";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { ensureVertices, vertices } from "./vertices.js";

export const clipConvex: MultiFn2<
    IShape,
    IShape | ReadonlyVec[],
    IShape | undefined
> = defmulti<any, IShape | ReadonlyVec[], IShape | undefined>(
    __dispatch,
    {
        circle: "rect",
        ellipse: "rect",
        path: "rect",
        quad: "poly",
        tri: "poly",
    },
    {
        group: ({ children, attribs }: Group, boundary) => {
            boundary = ensureVertices(boundary);
            const clipped: IHiccupShape[] = [];
            for (let c of children) {
                const res = clipConvex(c, boundary);
                if (res) clipped.push(<IHiccupShape>res);
            }
            return new Group({ ...attribs }, clipped);
        },

        line: ($: Line, boundary) => {
            const segments = clipLineSegmentPoly(
                $.points[0],
                $.points[1],
                ensureVertices(boundary)
            );
            return segments && segments.length
                ? new Line(segments[0], __copyAttribs($))
                : undefined;
        },

        poly: ($: Polygon, boundary) => {
            boundary = ensureVertices(boundary);
            const pts = sutherlandHodgeman(
                $.points,
                boundary,
                centroid(boundary)
            );
            return pts.length ? new Polygon(pts, __copyAttribs($)) : undefined;
        },

        rect: ($: IShape, boundary) => {
            boundary = ensureVertices(boundary);
            const pts = sutherlandHodgeman(
                vertices($),
                boundary,
                centroid(boundary)
            );
            return pts.length ? new Polygon(pts, __copyAttribs($)) : undefined;
        },
    }
);
