import { DEFAULT, MultiFn } from "@thi.ng/defmulti";
import * as assert from "assert";
import {
    area,
    asCubic,
    asPolygon,
    asPolyline,
    bounds,
    center,
    centroid,
    classifyPoint,
    clipConvex,
    closestPoint,
    convexHull,
    depth,
    difference,
    edges,
    extrude,
    flip,
    height,
    intersection,
    intersectLine,
    intersectShape,
    mapPoint,
    normalAt,
    offset,
    perimeter,
    pointAt,
    pointInside,
    resample,
    simplify,
    splitAt,
    subdivide,
    tangentAt,
    tessellate,
    transform,
    translate,
    Type,
    union,
    unmapPoint,
    vertices,
    warp,
    width
} from "../src";

const _DEFAULT = DEFAULT.toString();

const checkImpls = (fn: MultiFn<any>, types: PropertyKey[]) =>
    assert.deepEqual(
        [...fn.impls()].map((x) => x.toString()).sort(),
        types.map((x) => x.toString()).sort()
    );

describe("api", () => {

    it("area", () =>
        checkImpls(area, [
            _DEFAULT,
            Type.CIRCLE,
            Type.ELLIPSE,
            Type.GROUP,
            Type.POLYGON2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("asCubic", () =>
        checkImpls(asCubic, [
            Type.ARC2,
            Type.CUBIC2,
            Type.LINE2,
            Type.PATH2,
            Type.POLYLINE2,
            Type.QUADRATIC2,
        ]));

    it("asPolygon", () =>
        checkImpls(asPolygon, [
            _DEFAULT,
            Type.ELLIPSE,
            Type.PATH2,
            Type.POLYGON2,
        ]));

    it("asPolyline", () =>
        checkImpls(asPolyline, [
            _DEFAULT,
            Type.CUBIC2,
            Type.LINE2,
            Type.PATH2,
            Type.QUADRATIC2,
        ]));

    it("bounds", () =>
        checkImpls(bounds, [
            Type.ARC2,
            Type.CIRCLE,
            Type.CUBIC2,
            Type.ELLIPSE,
            Type.GROUP,
            Type.LINE2,
            Type.PATH2,
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.QUADRATIC2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("center", () =>
        checkImpls(center, [
            _DEFAULT,
            Type.CIRCLE,
            Type.ELLIPSE
        ]));

    it("centroid", () =>
        checkImpls(centroid, [
            Type.ARC2,
            Type.CIRCLE,
            Type.ELLIPSE,
            Type.GROUP,
            Type.LINE2,
            Type.PATH2,
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("classifyPoint", () =>
        checkImpls(classifyPoint, [
            Type.CIRCLE,
            Type.TRIANGLE2,
        ]));

    it("closestPoint", () =>
        checkImpls(closestPoint, [
            Type.CIRCLE,
        ]));

    it("clipConvex", () =>
        checkImpls(clipConvex, [
            Type.POLYGON2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("convexHull", () =>
        checkImpls(convexHull, [
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.TRIANGLE2,
        ]));

    it("depth", () =>
        checkImpls(depth, [
            _DEFAULT,
        ]));

    it("difference", () =>
        checkImpls(difference, [
            Type.POLYGON2,
        ]));

    it("edges", () =>
        checkImpls(edges, [
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("extrude", () =>
        checkImpls(extrude, [
        ]));

    it("flip", () =>
        checkImpls(flip, [
            Type.CUBIC2,
            Type.LINE2,
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.QUADRATIC2,
        ]));

    it("height", () =>
        checkImpls(height, [
            _DEFAULT,
        ]));

    it("intersection", () =>
        checkImpls(intersection, [
            Type.POLYGON2
        ]));

    it("intersectShape", () =>
        checkImpls(intersectShape, [
            "rect-circle",
            "rect-rect",
            "sphere-ray",
            "sphere-sphere"
        ]));

    it("intersectLine", () =>
        checkImpls(intersectLine, [
            Type.LINE2
        ]));

    it("mapPoint", () =>
        checkImpls(mapPoint, [
            Type.RECT
        ]));

    it("normalAt", () =>
        checkImpls(normalAt, [
            _DEFAULT,
        ]));

    it("offset", () =>
        checkImpls(offset, [
            Type.LINE2,
            Type.POLYGON2,
            Type.POLYLINE2,
            // TODO rect
        ]));

    it("perimeter", () =>
        checkImpls(perimeter, [
            Type.CIRCLE,
            Type.ELLIPSE,
            Type.LINE2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("pointAt", () =>
        checkImpls(pointAt, [
            Type.ARC2,
            Type.CIRCLE,
            Type.CUBIC2,
            Type.ELLIPSE,
            Type.LINE2,
            Type.POLYGON2,
            Type.QUADRATIC2,
            Type.RAY,
            Type.RECT,
        ]));

    it("pointInside", () =>
        checkImpls(pointInside, [
            Type.CIRCLE,
            Type.POLYGON2,
            Type.TRIANGLE2,
            Type.RECT,
        ]));

    it("resample", () =>
        checkImpls(resample, [
            Type.LINE2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("simplify", () =>
        checkImpls(simplify, [
            Type.PATH2,
            Type.POLYGON2,
            Type.POLYLINE2,
        ]));

    it("splitAt", () =>
        checkImpls(splitAt, [
            Type.CUBIC2,
            Type.QUADRATIC2,
        ]));

    it("subdivide", () =>
        checkImpls(subdivide, [
            Type.POLYGON2,
            Type.POLYLINE2
        ]));

    it("tangentAt", () =>
        checkImpls(tangentAt, [
            Type.CIRCLE,
            Type.LINE2,
            Type.POLYGON2,
            Type.POLYLINE2,
        ]));

    it("tessellate", () =>
        checkImpls(tessellate, [
            Type.POLYGON2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("transform", () =>
        checkImpls(transform, [
            Type.CUBIC2,
            Type.LINE2,
            Type.PATH2,
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.QUADRATIC2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("translate", () =>
        checkImpls(translate, [
            Type.CIRCLE,
            Type.ELLIPSE,
            Type.PATH2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.RECT,
            Type.TRIANGLE2
        ]));

    it("union", () =>
        checkImpls(union, [
            Type.POLYGON2,
            Type.RECT,
        ]));

    it("unmapPoint", () =>
        checkImpls(unmapPoint, [
            Type.QUAD2,
            Type.RECT,
        ]));

    it("vertices", () =>
        checkImpls(vertices, [
            Type.ARC2,
            Type.CIRCLE,
            Type.CUBIC2,
            Type.ELLIPSE,
            Type.LINE2,
            Type.PATH2,
            Type.POINTS2,
            Type.POLYGON2,
            Type.POLYLINE2,
            Type.QUAD2,
            Type.QUADRATIC2,
            Type.RECT,
            Type.TRIANGLE2,
        ]));

    it("warp", () =>
        checkImpls(warp, [
            _DEFAULT,
        ]));

    it("width", () =>
        checkImpls(width, [
            _DEFAULT,
        ]));
});