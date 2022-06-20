import { writeText } from "@thi.ng/file-io";
import {
    asSvg,
    bounds,
    circle,
    group,
    Polygon,
    simplify,
    svgDoc,
} from "@thi.ng/geom";
import { asPolygons, asSDF, sample2d } from "@thi.ng/geom-sdf";
import { XsAdd } from "@thi.ng/random";
import { range, repeatedly } from "@thi.ng/transducers";
import { randMinMax2 } from "@thi.ng/vectors";

const RND = new XsAdd(0xdecafbad);
const RES = [512, 512];

const scene = group({ stroke: "red", __sdf: { smooth: 20 } }, [
    ...repeatedly(
        () =>
            circle(
                randMinMax2([], [-100, -100], [100, 100], RND),
                RND.minmax(5, 20)
            ),
        20
    ),
]);

const sceneBounds = bounds(scene, 40)!;
const sdf = sample2d(asSDF(scene), sceneBounds, RES);

const polys = asPolygons(sdf, sceneBounds, RES, range(0, 32, 4)).map(
    (p) => <Polygon>simplify(p, 0.25)
);

console.log(polys.map((p) => p.points.length));

writeText(
    "export/points.svg",
    asSvg(
        svgDoc(
            { fill: "none" },
            // contours
            group({ stroke: "#000", weight: 0.5 }, polys),
            // original scene
            scene
        )
    )
);
