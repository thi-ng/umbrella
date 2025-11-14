// SPDX-License-Identifier: Apache-2.0
import { writeText } from "@thi.ng/file-io";
import { asSvg, polyline, svgDoc } from "@thi.ng/geom";
import { expand, interpret, turtle2d, TURTLE_IMPL_2D } from "@thi.ng/lsys";
import { PI } from "@thi.ng/math";
import { XsAdd } from "@thi.ng/random";

writeText(
	`export/tree.svg`,
	asSvg(
		svgDoc(
			{ stroke: "#00f", "stroke-width": 0.5, width: 600, height: 600 },
			...interpret(
				// create turtle instance with customized delta (rot angle)
				turtle2d({
					step: 20,
					theta: -PI / 2,
					delta: PI / 10,
					jitter: 0.5,
					decayDelta: 0.98,
					decayStep: 0.85,
					decayAlive: 0.975,
					aliveProb: 0.999,
					rnd: new XsAdd(0xdecafbad),
				}),
				// customize implementation to process syms "a" & "g" as "f"
				{ ...TURTLE_IMPL_2D, a: TURTLE_IMPL_2D.f, g: TURTLE_IMPL_2D.f },
				// recursively expand start rule "s"
				expand(
					{
						s: "[f]",
						f: "a[kp!>/-g]/a[kp!>/+g]",
						g: "a[kp!>/+f]/a[kp!>/-f]",
					},
					"s",
					13
				)
				//convert result paths to polylines for SVG export
			).paths.map((pts) => polyline(pts))
		)
	)
);
