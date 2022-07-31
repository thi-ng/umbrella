import * as g from "@thi.ng/geom";
import * as lsys from "@thi.ng/lsys";
import * as fs from "fs";

// example L-Systems shown above
interface Example {
	rules: lsys.ProductionRules;
	delta: number;
	iter: number;
}

const examples: Example[] = [
	{ rules: { s: "[f++f++f]", f: "f+f--f+f" }, delta: Math.PI / 3, iter: 5 },
	{
		rules: { s: "[f-f-f-f-f-f-f-f]", f: "f---f+f+f+f+f+f+f---f" },
		delta: Math.PI / 4,
		iter: 6,
	},
	{
		rules: { s: "[x]", x: "-yf+xfx+fy-", y: "+xf-yfy-fx+" },
		delta: Math.PI / 2,
		iter: 7,
	},
	{
		rules: { s: "[a]", a: "a-b--b+a++aa+b-", b: "+a-bb--b-a++a+b" },
		delta: Math.PI / 3,
		iter: 5,
	},
];

const impl = lsys.TURTLE_IMPL_2D;

try {
	fs.mkdirSync("export");
} catch (_) {}

examples.forEach(({ rules, delta, iter }, i) =>
	fs.writeFileSync(
		`export/lsys-ex${i}.svg`,
		g.asSvg(
			g.svgDoc(
				{
					stroke: "#00f",
					"stroke-width": 0.25,
					width: 600,
					height: 600,
				},
				...lsys
					.interpret(
						// create turtle instance with customized delta (rot angle)
						lsys.turtle2d({ delta }),
						// customize implementation to process syms "a" & "b" as "f"
						{ ...impl, a: impl.f, b: impl.f },
						// recursively expand start rule "s"
						lsys.expand(rules, "s", iter)
						//convert result paths to polylines for SVG export
					)
					.paths.map((pts) => g.polyline(pts))
			)
		)
	)
);
