import type { Nullable } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { partial } from "@thi.ng/compose";
import { BACK_TO_TOP, withSize } from "@thi.ng/hiccup-carbon-icons";
import {
	anchor,
	button,
	details,
	div,
	img,
	inputSearch,
	span,
	summary,
} from "@thi.ng/hiccup-html";
import {
	$compile,
	$input,
	$inputToggle,
	$inputTrigger,
	$list,
	$replace,
	type ComponentLike,
} from "@thi.ng/rdom";
import { debounce, reactive } from "@thi.ng/rstream";
import { groupByObj } from "@thi.ng/transducers";
import { ASSET_BASE_URL, EXAMPLE_BASE_URL, type Item } from "./api.js";
import PKGS from "./packages.json";
import {
	commonTags,
	filteredTags,
	sortedDifference,
	taggedItems,
	uniqueItemIDs,
} from "./tags.js";

const PRE_SELECTED = location.hash.substring(1);

const branch = (items: Item[], existing: string[]): ComponentLike => {
	const isRoot = existing.length === 1;
	const tag = peek(existing);
	const state = reactive(isRoot && PRE_SELECTED === tag);
	return details(
		{ id: isRoot ? tag : undefined, open: state.deref() },
		summary(
			{
				onclick: () => {
					state.next(!state.deref());
					if (isRoot && state.deref()) location.hash = `#${tag}`;
				},
			},
			tag
		),
		$replace(state.map((x) => (x ? branchBody(items, existing) : null)))
	);
};

const branchBody = (items: Item[], existing: string[]) => {
	const selItems = taggedItems(items, existing);
	const sharedTags = sortedDifference(
		commonTags(selItems),
		new Set(existing)
	);
	return div(
		{},
		selItems.length > 5 ? itemListReveal(selItems) : itemList(selItems),
		selItems.length > 1
			? div(
					".tags",
					{},
					...sharedTags.map((x) => branch(selItems, [...existing, x]))
			  )
			: null
	);
};

const itemList = (items: Item[]) => {
	const { "@thi.ng": pkgs, "@example": examples } = groupByObj<Item, Item[]>(
		{ key: (x) => x.id.split("/")[0] },
		items
	);
	return pkgs && examples
		? div(
				".grid",
				{},
				div({}, ...pkgs.map(branchItem)),
				div({}, ...examples.map(branchItem))
		  )
		: div({}, ...(pkgs || examples).map(branchItem));
};

const itemListReveal = (items: Item[]) => {
	const show = reactive(false);
	return $replace(
		show.map((state) =>
			state
				? itemList(items)
				: button(
						".show",
						{ onclick: $inputTrigger(show) },
						`show ${items.length} items`
				  )
		)
	);
};

const branchItem = ({ id, desc, img: imgSrc }: Item) => {
	const href = id.startsWith("@example")
		? `${EXAMPLE_BASE_URL}/${id.substring(9)}`
		: `https://${id.substring(1)}`;
	const body = [
		anchor(".link", { href, target: "_blank" }, id),
		span(".desc", {}, ...withLinks(desc)),
	];
	return imgSrc
		? div(
				".project.with-img",
				{},
				img({ src: `${ASSET_BASE_URL}/${imgSrc}`, alt: "screenshot" }),
				div({}, ...body)
		  )
		: div(".project", {}, ...body);
};

const withLinks = (body: string) => {
	const re = /@?(thi\.ng\/[a-z0-9-]+)/g;
	const res: (string | ComponentLike)[] = [];
	let prev = 0;
	let match: Nullable<RegExpMatchArray>;
	while ((match = re.exec(body))) {
		if (match.index) res.push(body.substring(prev, match.index));
		res.push(
			anchor({ href: `https://${match[1]}`, target: "_blank" }, match[0])
		);
		prev = match.index! + match[0].length;
	}
	if (prev < body.length) res.push(body.substring(prev));
	return res;
};

const TAGS = commonTags(PKGS);

const search = reactive("");
const searchResults = search
	.subscribe(debounce(50))
	.map(partial(filteredTags, TAGS));

await $compile(
	div(
		{},
		inputSearch({
			oninput: $input(search),
			placeholder: "Fuzzy tag search",
			value: search,
		}),
		div(
			{},
			searchResults.map((tags) => tags.length),
			" tag(s), ",
			searchResults.map((tags) => uniqueItemIDs(PKGS, tags).size),
			" project(s)"
		),
		$list(searchResults, "div", {}, (tag) => branch(PKGS, [tag])),
		anchor("#up", { href: "#" }, withSize(BACK_TO_TOP, "24px"))
	)
).mount(document.getElementById("app")!);

if (PRE_SELECTED) {
	setTimeout(
		() => document.getElementById(PRE_SELECTED)?.scrollIntoView(),
		100
	);
}
