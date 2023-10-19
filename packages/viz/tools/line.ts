import { writeText } from "@thi.ng/file-io";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { fit } from "@thi.ng/math";
import { map, range } from "@thi.ng/transducers";
import {
	linePlot,
	linearAxis,
	linearTicks,
	logAxis,
	logTicksMajor,
	logTicksMinor,
	plotCartesian,
	scatterPlot,
	uniformDomain,
} from "../src/index.js";

const xaxis = linearAxis({
	domain: [0, 100],
	range: [100, 1250],
	pos: 500,
	labelOffset: [0, 20],
	labelAttribs: { "text-anchor": "middle" },
	major: { ticks: linearTicks(10) },
	minor: { ticks: linearTicks(1) },
});

const values = uniformDomain(
	map((i) => Math.pow(10, fit(i, 0, 100, 0, 4)), range(100))
);

const line = linePlot(values, { attribs: { stroke: "black" } });

const points = scatterPlot(values, {
	attribs: { fill: "red", shape: "circle", size: 2 },
});

const docAttribs = {
	__convert: true,
	width: 1280,
	height: 560,
	"font-size": "10px",
};

writeText(
	"export/line-lin.svg",
	serialize(
		svg(
			docAttribs,
			plotCartesian({
				xaxis,
				yaxis: linearAxis({
					domain: [1, 10000],
					range: [500, 20],
					pos: 100,
					labelOffset: [-15, 3],
					labelAttribs: { "text-anchor": "end" },
					major: { ticks: linearTicks(1000) },
				}),
				plots: [line, points],
				grid: { xminor: false },
			})
		)
	)
);

writeText(
	"export/line-log.svg",
	serialize(
		svg(
			docAttribs,
			plotCartesian({
				xaxis,
				yaxis: logAxis({
					domain: [1, 10000],
					range: [500, 20],
					pos: 100,
					labelOffset: [-15, 3],
					labelAttribs: { "text-anchor": "end" },
					major: { ticks: logTicksMajor() },
					minor: { ticks: logTicksMinor() },
				}),
				plots: [line, points],
				grid: { xminor: false },
			})
		)
	)
);
