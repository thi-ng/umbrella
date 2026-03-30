import { div, h1 } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { compileForm, container } from "@thi.ng/rdom-forms";
import { areaScale } from "./area-scale.js";
import { solutionAddition } from "./solution-addition.js";
import { twoPartSolutionRatio } from "./two-part-solution-ratio.js";

$compile(
	div(
		{},
		h1({}, "Darkroom calculators"),
		compileForm(
			container(
				{},
				areaScale(),
				twoPartSolutionRatio(),
				solutionAddition()
			),
			{
				wrapperAttribs: { class: "input" },
				typeAttribs: { rangeLabel: { class: "vlabel" } },
				descAttribs: { class: "desc" },
			}
		)
	)
).mount(document.getElementById("app")!);
