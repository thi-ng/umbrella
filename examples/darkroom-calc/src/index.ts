// SPDX-License-Identifier: Apache-2.0
import { div, h1 } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { compileForm, container } from "@thi.ng/rdom-forms";
import { areaScale } from "./area-scale.js";
import { dilutionConcentration } from "./dilution-concentration.js";
import { dilutionVolume } from "./dilution-volume.js";
import { solutionAddition } from "./solution-addition.js";
import { twoPartSolutionRatio } from "./two-part-solution-ratio.js";

// all calculators here are based on reactive form fields
// we're using thi.ng/rstream & thi.ng/rdom-forms to produce & compile
// these form field specs (plain objects) into thi.ng/hiccup
// elements/tags (nested JS arrays), which are then compiled into actual
// reactive DOM elements by thi.ng/rdom's main `$compile()`
$compile(
	div(
		{},
		h1({}, "Darkroom calculators"),
		compileForm(
			container(
				{},
				areaScale(),
				twoPartSolutionRatio(),
				dilutionVolume(),
				dilutionConcentration(),
				solutionAddition()
			),
			// common form field opts/attribs
			{
				wrapperAttribs: { class: "input" },
				typeAttribs: { rangeLabel: { class: "vlabel" } },
				descAttribs: { class: "desc" },
			}
		)
	)
).mount(document.getElementById("app")!);
