import type { CSSOpts } from "./api.js";
import { formatDecls, indent } from "./impl.js";

export interface FontFaceSpec {
	family: string;
	src: { format: string; url: string }[];
	style: string;
	weight: string;
	stretch?: string;
	display?: string;
	unicode?: string[];
	ascent?: string;
	descent?: string;
	feature?: string;
	variation?: string;
	lineGap?: string;
	size?: string;
}

export const at_fontface = (spec: FontFaceSpec) => {
	return (acc: string[], $opts: CSSOpts) => {
		const outer = indent($opts);
		acc.push(
			`${outer}@font-face${$opts.format.declStart}${formatDecls(
				{
					"font-family": spec.family,
					"font-style": spec.style,
					"font-weight": spec.weight,
					"font-stretch": spec.stretch,
					"font-display": spec.display,
					src: spec.src.map(
						({ format, url }) => `url(${url}) format(${format})`
					),
					"unicode-range": spec.unicode,
					"ascent-override": spec.ascent,
					"descent-override": spec.ascent,
					"font-feature-settings": spec.feature,
					"font-variation-settings": spec.variation,
					"line-gap-override": spec.lineGap,
					"size-adjust": spec.size,
				},
				$opts
			)}${outer}${$opts.format.declEnd}`
		);
		return acc;
	};
};
