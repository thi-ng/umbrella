import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";
import {
	anchor,
	body,
	div,
	h1,
	head,
	html,
	linkCSS,
	metaUTF8,
	para,
	style,
	title,
} from "@thi.ng/hiccup-html";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import * as icons from "../src/index.js";

const REV = execSync('git log --pretty="%h %cI" -1').toString().trim();

const doc = html(
	{ lang: "en" },
	head(
		{},
		metaUTF8(),
		title({}, `@thi.ng/hiccup-carbon-icons contact sheet (${REV})`),
		linkCSS("https://unpkg.com/tachyons@4/css/tachyons.min.css"),
		style(
			{},
			`svg:hover * { fill: #357edd; transition: fill 0.15s ease-in-out; }`
		)
	),
	body(
		".sans-serif.ma3",
		{},
		div(
			{},
			h1(".f2.fw2.mv2", {}, "@thi.ng/hiccup-carbon-icons"),
			para(
				".measure.lh-copy",
				{},
				"This document lists all icons provided by the ",
				anchor(
					".link.b.black.hover-blue",
					{
						href: "https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup-carbon-icons",
					},
					"@thi.ng/hiccup-carbon-icons"
				),
				` package, including their exported variable names. These icons were converted to hiccup format from the original icons designed by IBM and published in the `,
				anchor(
					".link.b.black.hover-blue",
					{
						href: "https://github.com/carbon-design-system/carbon",
					},
					"carbon-design-system/carbon"
				),
				` repository.`
			)
		),
		div(
			{ style: { "font-size": "0.5rem" } },
			Object.keys(icons)
				.filter((id) => Array.isArray((<any>icons)[id]))
				.map((id) => {
					return [
						`div#${id}.dib.ma2`,
						[
							"div.w4.h4.bg-light-gray.dark-gray.flex.items-center.tc",
							[
								"div.w-100",
								icons.withSize((<any>icons)[id], "2rem"),
								["div.mt3", id],
							],
						],
					];
				})
		)
	)
);

writeFileSync("contact-sheet.html", serialize([DOCTYPE_HTML, doc]), "utf-8");
