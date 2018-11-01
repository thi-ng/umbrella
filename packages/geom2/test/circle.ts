import { equiv } from "@thi.ng/equiv";
import { PI, TAU, HALF_PI } from "@thi.ng/math/api";
import { eqDeltaArray } from "@thi.ng/vectors2/internal/equiv";
import * as assert from "assert";
import {
    arcLength,
    area,
    asSVG,
    circle,
    Circle2,
    Rect2,
    bounds,
    vertices,
    asPolygon,
    Polygon2
} from "../src/index";
import { Vec } from "@thi.ng/vectors2/api";

describe("circle", () => {

    let a: Circle2;
    let apts: Vec[];

    beforeEach(() => {
        a = circle([100, 200], 10, { fill: "red" });
        apts = [[110, 200], [100, 210], [90, 200], [100, 190]];
    });

    it("area", () =>
        assert.equal(area(a), a.r * a.r * PI));

    it("arcLength", () =>
        assert.equal(arcLength(a), a.r * TAU));

    it("asPolygon", () =>
        assert(equiv(asPolygon(a, 4), new Polygon2(apts))));

    it("bounds", () =>
        assert(equiv(bounds(a), new Rect2([90, 190], [20, 20]))));

    it("vertices", () =>
        assert(eqDeltaArray(vertices(a, 4), apts)));

    it("vertices (theta)", () =>
        assert(eqDeltaArray(vertices(a, { theta: HALF_PI }), apts)));

    it("svg", () => {
        assert.equal(
            asSVG(a),
            `<circle cx="100.00" cy="200.00" r="10.00" fill="red"/>`
        );
    });
});
