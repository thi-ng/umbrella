import { identity, type Fn, type Fn4 } from "@thi.ng/api/fn";
import type { Attribs } from "@thi.ng/hiccup-html";
import { div } from "@thi.ng/hiccup-html/blocks";
import { section } from "@thi.ng/hiccup-html/sections";
import type { ComponentLike } from "@thi.ng/rdom";
import { $list } from "@thi.ng/rdom/list";
import { $switch } from "@thi.ng/rdom/switch";
import type { ISubscription } from "@thi.ng/rstream";
import { dedupe } from "@thi.ng/transducers/dedupe";
import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";

export interface TabOpts {
	attribs?: Partial<{
		wrapper: Partial<Attribs>;
		tab: Partial<Attribs>;
		content: Partial<Attribs>;
	}>;
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
}

export const tabs = (src: ISubscription<number, number>, opts: TabOpts) => {
	const { attribs = {}, head, sections } = opts;
	return div(
		attribs!.wrapper,
		$list(
			src.map((id) => [
				...map((i) => <const>[i, i === id], range(sections.length)),
			]),
			"div",
			attribs!.tab,
			([i, sel]) => head(src, sections[i].title, i, sel)
		),
		$switch<number>(
			src.transform(dedupe()),
			identity,
			sections.reduce((acc, { content }, i) => {
				acc[i] = async (i) =>
					section(attribs!.content, await content(i));
				return acc;
			}, <Record<number, Fn<number, Promise<ComponentLike>>>>{})
		)
	);
};
