import * as assert from "assert";
import * as iges from "../src";

describe("iges", () => {
    it("basic", () => {
        const doc = iges.newDocument({
            maxCoord: 100,
            precision: 3,
            author: "toxi",
            authorOrg: "thi.ng",
            created: new Date(123456789),
            modified: new Date(123456789),
        });

        doc.start = ["Example file for @thi.ng/iges"];

        iges.addPolyline(doc, [
            [0, 0],
            [0, 100],
            [50, 150],
            [100, 100],
            [0, 100],
            [100, 0],
            [0, 0],
            [100, 100],
            [100, 0],
        ]);

        assert.strictEqual(
            iges.serialize(doc),
            `Example file for @thi.ng/iges                                           S      1
1H,,1H;,,,12H@thi.ng/iges,5H0.0.1,32,38,6,308,15,,1.000,2,2HMM,1,0.254, G      1
15H19700102.101736,0.001,100.000,4Htoxi,6Hthi.ng,11,0,                  G      2
15H19700102.101736;                                                     G      3
     106       1       0       0       0       0       0       000000000D      1
     106       0       0       3      11       0       0               0D      2
106,1,9,0.000,0.000,0.000,0.000,100.000,50.000,150.000,100.000,  0000001P      1
100.000,0.000,100.000,100.000,0.000,0.000,0.000,100.000,100.000, 0000001P      2
100.000,0.000;                                                   0000001P      3
S0000001G0000003D0000002P0000003                                        T      1`
        );
    });
});
