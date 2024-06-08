import { adaptiveCanvas2d } from "@thi.ng/canvas";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { fiber } from "@thi.ng/fibers";
import {
	TESSELLATE_QUAD_FAN,
	TESSELLATE_TRI_FAN_SPLIT,
	circle,
	edgePointsFromTessellation,
	group,
	line,
	tessellate,
	withAttribs,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { map } from "@thi.ng/transducers";

const gradient = COSINE_GRADIENTS["rainbow1"];
const scale = window.devicePixelRatio;

const tess = tessellate(circle([250, 250], 240, { __samples: 6 }), [
	TESSELLATE_TRI_FAN_SPLIT,
	TESSELLATE_QUAD_FAN,
	TESSELLATE_QUAD_FAN,
]);

const geo = group({ __background: "#f0f0f0", stroke: "#000", scale }, [
	...map((e) => line(e), edgePointsFromTessellation(tess)),
]);

const num = geo.children.length;
console.log("num edges", num);

const { ctx } = adaptiveCanvas2d(500, 500, document.getElementById("app"));

fiber(function* () {
	while (true) {
		draw(ctx, geo);
		for (let i = 0; i < num; i++) {
			draw(
				ctx,
				withAttribs(geo.children[i], {
					scale,
					stroke: cosineColor(gradient, i / num),
					weight: 5,
				})
			);
			yield;
		}
	}
}).run();
