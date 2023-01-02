import { map, normRange3d, reducer, transduce } from "@thi.ng/transducers";
import { max4, MAX4, MIN4, min4, Vec } from "@thi.ng/vectors";
import { vector } from "@thi.ng/strings";
import { ColorMode, convert } from "../src/index.js";

const FMT = vector(4, 4);

const modes: ColorMode[] = [
	"hcy",
	"hsi",
	"hsl",
	"hsv",
	"lab50",
	"lab65",
	"lch",
	"oklab",
	"srgb",
	"xyy",
	"xyz50",
	"xyz65",
	"ycc",
];

for (let mode of modes) {
	const bounds = transduce(
		map((x) => convert(null, x, mode, "rgb")),
		reducer<Vec[], Vec>(
			() => [[...MAX4], [...MIN4]],
			(acc, x) => {
				min4(null, acc[0], x);
				max4(null, acc[1], x);
				return acc;
			}
		),
		normRange3d(100, 100, 100)
	);
	console.log(mode, FMT(bounds[0]), FMT(bounds[1]));
}
