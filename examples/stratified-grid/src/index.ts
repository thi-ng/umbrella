import { asSvg, group, line, points, svgDoc } from "@thi.ng/geom";
import { stratifiedGrid2 } from "@thi.ng/poisson";
import { map, range } from "@thi.ng/transducers";

const W = 50;

document.body.innerHTML = asSvg(
	svgDoc(
		{
			width: 600,
			height: 600,
			fill: "blue",
			stroke: "none",
			weight: 0.05,
		},
		group({ stroke: "#fcc" }, [
			...map((x) => line([x, 0], [x, W]), range(1, W)),
			...map((y) => line([0, y], [W, y]), range(1, W)),
		]),
		points(
			[
				...stratifiedGrid2({
					dim: [W, W],
					separation: Math.SQRT1_2,
				}),
			],
			{ shape: "circle", size: 0.25 }
		)
	)
);
