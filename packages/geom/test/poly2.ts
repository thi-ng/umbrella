import { equiv } from "@thi.ng/equiv";
import * as assert from "assert";
import { polygon2, Polygon2, HiccupPolygon2 } from "../src/index";

describe("polygon2", () => {

    it("area", () => {
        const a = polygon2([0, 0, 100, 0, 100, 100, 0, 100]);
        assert.equal(a.area(), 100 * 100);
        a.points.pop()
        assert.equal(a.area(), 100 * 100 / 2);
    });

    it("circumference", () => {
        const a = polygon2([0, 0, 100, 0, 100, 100, 0, 100]);
        assert.equal(a.arcLength(), 400);
        a.points.pop()
        assert.equal(a.arcLength(), 200 + Math.sqrt(2) * 100);
    });

    it("hiccup", () => {
        const src: HiccupPolygon2 = ["polygon", { fill: "red" }, [[0, 0], [100, 0], [100, 100], [0, 100]]];
        const src2: HiccupPolygon2 = ["polygon", { fill: "red" }, [0, 0, 100, 0, 100, 100, 0, 100]];
        let a = Polygon2.fromHiccup(src);
        assert(equiv(a.points, src[2]));
        assert.deepEqual(a.attribs, src[1]);
        a = Polygon2.fromHiccup(src2);
        assert(equiv(a.points, src[2]));
        assert.deepEqual(a.attribs, src2[1]);
        assert(
            equiv(
                a.toHiccup(),
                src
            )
        );
    });
});
