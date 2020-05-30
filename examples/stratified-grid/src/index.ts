import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { stratifiedGrid } from "@thi.ng/poisson";
import { map } from "@thi.ng/transducers";
import { dist } from "@thi.ng/vectors";

const index = new KdTreeSet(2);
index.into(stratifiedGrid({ dim: [50, 50], samples: 1 }));

document.body.innerHTML = asSvg(
    svgDoc(
        {
            width: 600,
            height: 600,
            fill: "none",
            stroke: "blue",
            "stroke-width": 0.1,
        },
        ...map(
            (p) =>
                circle(
                    p,
                    dist(p, index.queryKeys(p, 2 * Math.SQRT2, 2)[1]) / 2
                ),
            index.keys()
        )
    )
);
