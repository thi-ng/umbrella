// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Nullable } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { partial } from "@thi.ng/compose";
import { BACK_TO_TOP, LAUNCH } from "@thi.ng/hiccup-carbon-icons";
import {
	anchor,
	button,
	details,
	div,
	i,
	img,
	inputSearch,
	span,
	summary,
} from "@thi.ng/hiccup-html";
import {
	$compile,
	$inputTrigger,
	$list,
	$replace,
	type ComponentLike,
} from "@thi.ng/rdom";
import { debounce, reactive, type Stream } from "@thi.ng/rstream";
import { groupByObj } from "@thi.ng/transducers";
import {
	ASSET_BASE_URL,
	DEMO_BASE_URL,
	DOCS_BASE_URL,
	EXAMPLE_BASE_URL,
	GLOSSARY_URL,
	LINK_TARGET,
	MAX_RELATED_TAGS,
	WIKI_URL,
	type Item,
} from "./api.js";
import { GLOSSARY } from "./glossary.js";
import PKGS from "./packages.json";
import {
	commonTags,
	filteredTags,
	sortedDifference,
	taggedItems,
	tagsByInitial,
	uniqueItemIDs,
} from "./tags.js";

// object of reactive root tag branch states (open/closed)
// will be populated when branches are initializing
const ROOTS: IObjectOf<Stream<boolean>> = {};

const branch = (items: Item[], existing: string[]): ComponentLike => {
	const isRoot = existing.length === 1;
	const tag = peek(existing);
	const state = reactive(isRoot && location.hash.substring(1) === tag);
	if (isRoot) ROOTS[tag] = state;
	return details(
		{ id: isRoot ? tag : undefined, open: state.deref() },
		summary(
			{
				onclick: () => {
					state.next(!state.deref());
					if (isRoot && state.deref()) location.hash = `#${tag}`;
				},
			},
			tag,
			glossaryDesc(tag),
			$replace(state.map((x) => (!isRoot && x ? openAsRoot(tag) : null)))
		),
		$replace(state.map((x) => (x ? branchBody(items, existing) : null)))
	);
};

const branchBody = (items: Item[], existing: string[]) => {
	const selItems = taggedItems(items, existing);
	const sharedTags = sortedDifference(
		commonTags(selItems, MAX_RELATED_TAGS),
		new Set(existing)
	);
	return div(
		{},
		glossaryLink(peek(existing)),
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
	const isExample = id.startsWith("@example");
	const name = id.split("/")[1];
	const href = isExample
		? `${EXAMPLE_BASE_URL}/${name}`
		: `https://${id.substring(1)}`;
	const body: any[] = [
		anchor(".link", { href, target: LINK_TARGET }, id),
		div(".desc", {}, ...withLinks(desc)),
	];
	if (isExample) {
		body.push(
			anchor(
				{ href: `${DEMO_BASE_URL}/${name}/`, target: LINK_TARGET },
				"Live demo"
			),
			" / ",
			anchor(
				{
					href: `${EXAMPLE_BASE_URL}/${name}/src/index.ts`,
					target: LINK_TARGET,
				},
				"Source code"
			)
		);
	} else {
		body.push(
			anchor(
				{ href: `${DOCS_BASE_URL}/${name}/`, target: LINK_TARGET },
				"Documentation"
			)
		);
	}
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
			anchor(
				{ href: `https://${match[1]}`, target: LINK_TARGET },
				match[0]
			)
		);
		prev = match.index! + match[0].length;
	}
	if (prev < body.length) res.push(body.substring(prev));
	return res;
};

const openAsRoot = (tag: string) =>
	button(
		".asroot",
		{
			onclick: (e) => {
				const el = document.getElementById(tag);
				location.hash = `#${tag}`;
				search.next("");
				if (el) {
					el.setAttribute("open", "");
					ROOTS[tag].next(true);
				}
				jumpToTag(tag);
				e.stopImmediatePropagation();
				e.preventDefault();
			},
		},
		"open as root"
	);

const jumpToTag = (tag: string) => {
	const fn = () => {
		const el = document.getElementById(tag);
		if (el) {
			setTimeout(() => el.scrollIntoView(true), 100);
		} else {
			requestAnimationFrame(fn);
		}
	};
	requestAnimationFrame(fn);
};

const glossaryDesc = (tag: string) => {
	const entry = GLOSSARY[tag];
	return entry ? span(".glossary-desc", {}, `(${entry[0]})`) : "";
};

const glossaryLink = (tag: string) => {
	const entry = GLOSSARY[tag];
	if (!entry) return;
	const [desc, gloss, wiki] = entry;
	if (!(gloss || wiki)) return;
	return div(
		".glossary",
		{},
		gloss
			? externalLink(GLOSSARY_URL + gloss, "Glossary")
			: wiki
			? externalLink(WIKI_URL + wiki, "Wikipedia")
			: desc
	);
};

const externalLink = (href: string, label: string) =>
	anchor({ href, target: LINK_TARGET }, i({}, LAUNCH), label);

const inflect = (word: string, n: number) => word + (n > 1 ? "s" : "");

const ALL_TAGS = commonTags(PKGS);

const search = reactive("");
const searchResults = search
	.subscribe(debounce(50))
	.map(partial(filteredTags, ALL_TAGS));
const tagInitials = searchResults.map(tagsByInitial);

await $compile(
	div(
		{},
		div(
			"#inputs",
			{},
			inputSearch({
				id: "search",
				oninput: (e) => {
					const val = (<HTMLInputElement>(
						e.target
					)).value.toLowerCase();
					if (!val) location.hash = "#";
					search.next(val);
				},
				placeholder: "Fuzzy tag search",
				value: search,
			}),
			button({ onclick: () => search.next("") }, "reset filter")
		),
		div(
			{},
			searchResults.map(
				(tags) => `${tags.length} ${inflect("tag", tags.length)}`
			),
			", ",
			searchResults.map((tags) => {
				const n = uniqueItemIDs(PKGS, tags).size;
				return `${n} ${inflect("project", n)}`;
			})
		),
		$list(tagInitials, "div#initials", {}, ([id, tag]) =>
			anchor({ href: `#${tag}` }, id)
		),
		$list(searchResults, "div", {}, (tag) => branch(PKGS, [tag])),
		anchor(
			"#up",
			{
				href: "#",
				title: "back to top",
				onclick: () => document.getElementById("search")?.focus(),
			},
			BACK_TO_TOP
		)
	)
).mount(document.getElementById("app")!);

const preSelected = location.hash.substring(1);
if (preSelected) jumpToTag(preSelected);
