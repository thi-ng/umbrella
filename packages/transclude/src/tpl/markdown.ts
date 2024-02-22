import { repeat } from "@thi.ng/strings/repeat";
import { slugifyGH } from "@thi.ng/strings/slugify";
import { split } from "@thi.ng/strings/split";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { map } from "@thi.ng/transducers/map";
import { str } from "@thi.ng/transducers/str";
import { transduce } from "@thi.ng/transducers/transduce";
import type { TemplateFn } from "../api.js";

export const image = (url: string, alt = "") => `![${alt}](${url})`;

export const link = (title: string, href: string) => `[${title}](${href})`;

export const list = (items: string[], eol = "\n") =>
	transduce(
		map((x) => `- ${x}`),
		str(eol),
		items
	);

export interface TOCOpts {
	/**
	 * Min headline level
	 *
	 * @defaultValue 2
	 */
	min: number;
	/**
	 * Max headline level
	 *
	 * @defaultValue 4
	 */
	max: number;
	/**
	 *
	 */
	title: string;
	/**
	 * Placeholder pattern for injected TOC
	 *
	 * @defaultValue "\<!-- toc --\>"
	 */
	match: string | RegExp;
	/**
	 * Test pattern for disabling TOC. If this pattern is found no TOC will be injected.
	 *
	 * @defaultValue "\<!-- notoc --\>"
	 */
	disable: RegExp;
}

/**
 * Higher order, configurable post-processing template function. Injects a table
 * of contents for the first `<!-- toc -->` occurrence. See {@link TOCOpts} for
 * config options.
 *
 * @param opts
 */
export const toc =
	(opts: Partial<TOCOpts> = {}): TemplateFn =>
	({ src, eol }) => {
		const {
			min = 2,
			max = 4,
			match = /<\!-- toc -->/i,
			disable = /<\!-- notoc -->/i,
			title,
		} = opts;
		const isHeading = new RegExp(`^#{${min},${max}}\\s`);
		const reHeading = new RegExp(`^(#{${min},${max}})\\s(.+)`);
		const toc = transduce(
			comp(
				filter((line) => isHeading.test(line) && !disable.test(line)),
				map((hd) => {
					const [_, level, title] = reHeading.exec(hd)!;
					const indent = repeat(
						"  ",
						Math.max(0, level.length - min)
					);
					return `${indent}- ${link(title, `#${slugifyGH(title)}`)}`;
				})
			),
			str(eol),
			split(src)
		);
		return src.replace(match, title ? title + toc : toc);
	};
