import type { Fn, Fn4 } from "@thi.ng/api";
import type { Attribs } from "@thi.ng/hiccup-html";
import { div } from "@thi.ng/hiccup-html/blocks";
import { section } from "@thi.ng/hiccup-html/sections";
import type { ComponentLike } from "@thi.ng/rdom";
import { $list } from "@thi.ng/rdom/list";
import { $promise } from "@thi.ng/rdom/promise";
import type { ISubscription } from "@thi.ng/rstream";
import { dedupe } from "@thi.ng/transducers/dedupe";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";

export interface AccordionOpts {
	attribs: {
		wrapper?: Partial<Attribs>;
		sectionOn?: Partial<Attribs>;
		sectionOff?: Partial<Attribs>;
		content?: Partial<Attribs>;
	};
	head: Fn4<
		ISubscription<number, number>,
		string,
		number,
		boolean,
		ComponentLike
	>;
	sections: {
		title: string;
		content: Fn<number, Promise<ComponentLike>>;
	}[];
	error?: Fn<Error, any>;
}

export const accordion = (
	src: ISubscription<number, number>,
	{ attribs, head, sections, error }: AccordionOpts
) => {
	return $list(
		src.transform(
			dedupe(),
			map((id) => [
				...map((i) => <const>[i, i === id], range(sections.length)),
			])
		),
		"div",
		attribs.wrapper,
		([i, sel]) =>
			section(
				sel ? attribs.sectionOn : attribs.sectionOff,
				head(src, sections[i].title, i, sel),
				sel
					? div(
							attribs.content,
							$promise(sections[i].content(i), error)
					  )
					: null
			)
	);
};
