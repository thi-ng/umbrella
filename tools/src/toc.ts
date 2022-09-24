import { slugifyGH } from "@thi.ng/strings";
import {
	PATTERN_NO_TOC,
	PATTERN_TOC,
	RE_HEADING,
	RE_IS_HEADING,
} from "./api.js";
import { link } from "./partials/link.js";

export const injectTOC = (readme: string) => {
	const toc = readme
		.split("\n")
		.filter(
			(line) =>
				RE_IS_HEADING.test(line) && line.indexOf(PATTERN_NO_TOC) === -1
		)
		.map((hd) => {
			const [_, level, title] = RE_HEADING.exec(hd)!;
			const indent = "      ".substr(0, (level.length - 2) * 2);
			const href = "#" + slugifyGH(title);
			return `${indent}- ${link(title, href)}`;
		})
		.join("\n");
	return readme.replace(PATTERN_TOC, toc);
};
