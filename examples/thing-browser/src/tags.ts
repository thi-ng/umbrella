// SPDX-License-Identifier: Apache-2.0
import { compareLex } from "@thi.ng/compare";
import {
	comp,
	conj,
	filter,
	filterFuzzy,
	groupByObj,
	iterator,
	map,
	mapcat,
	pluck,
	pushKeys,
	sortedFrequencies,
	take,
	transduce,
} from "@thi.ng/transducers";
import type { Item } from "./api.js";

export const taggedItems = (items: Item[], tags: string[]) =>
	items
		.filter((item) => tags.every((x) => item.tags.includes(x)))
		.sort((a, b) => compareLex(a.id, b.id));

export const taggedItemIDs = (items: Item[], tag: string) =>
	iterator(
		comp(
			filter((x) => x.tags.includes(tag)),
			pluck("id")
		),
		items
	);

export const uniqueItemIDs = (items: Item[], tags: string[]) =>
	new Set(mapcat((tag) => taggedItemIDs(items, tag), tags));

export const filteredTags = (tags: Set<string>, search: string) =>
	[...filterFuzzy(search.toLowerCase(), {}, tags)].sort(compareLex);

export const itemsByTag = (items: Item[]) =>
	groupByObj<string[], string[]>(
		{ key: (x) => x[0], group: pushKeys(1) },
		mapcat((x) => map((t) => [t, x.id], x.tags), items)
	);

export const commonTags = (items: Item[], thresh = Infinity) =>
	transduce(
		comp(take(thresh), pluck(0)),
		conj<string>(),
		sortedFrequencies(mapcat((x) => x.tags, items))
	);

export const difference = (base: Set<string>, exclusions: Set<string>) =>
	new Set(filter((x) => !exclusions.has(x), base));

export const sortedDifference = (base: Set<string>, exclusions: Set<string>) =>
	[...difference(base, exclusions)].sort(compareLex);

export const tagsByInitial = (tags: string[]) => {
	const groups = groupByObj<string, string[]>({ key: (x) => x[0] }, tags);
	return Object.keys(groups)
		.sort()
		.map((id) => [id.toUpperCase(), groups[id][0]]);
};
