// SPDX-License-Identifier: Apache-2.0
import { swap } from "@thi.ng/arrays";
import { defAtom } from "@thi.ng/atom";
import { uniqueIndices } from "@thi.ng/random";
import { $compile, $klist } from "@thi.ng/rdom";
import { fromAtom, fromView } from "@thi.ng/rstream";

const db = defAtom({
	sel: -1,
	items: ["one", "two", "three", "four"],
});

// reactive view of the atom
const $db = fromAtom(db);

// create a subscription on the selection ID only
// this will be more efficient when list items will later subscribe to this value
// since these downstream subs will only be triggered if the selection changes and
// not if ANY value in the atom changes
const $sel = fromView(db, { path: ["sel"] });

// similar to $sel, but for the list items only
const $items = fromView(db, { path: ["items"] });

// color chooser helper fn
const highlight = (sel: number, i: number) => (sel === i ? "red" : "blue");

// onclick handler to select/deselect items
const selectItem = (id: number) =>
	db.swapIn(["sel"], (sel) => (id === sel ? -1 : id));

$compile([
	"div",
	{},
	["div", {}, "Open DOM inspector to observe element/attribute changes..."],

	["h2", {}, "Version 1"],
	// version 1: subscribes to the entire atom (therefore triggers a list
	// update when ANYTHING changes). here the key function for each list item
	// also includes the current selection, supposedly to for each list item to
	// determine if it's selected or not. this means though, that once the
	// selection changes, *ALL* items will change and update (because their key
	// changes too), regardless if the new selection impacts that item or not.
	// in summary, this approach counteracts the entire purpose of using a keyed
	// list and better solution is shown below...
	$klist(
		$db.map(({ sel, items }) =>
			items.map((x, i) => <[number, number, string]>[sel, i, x])
		),
		"ul",
		{},
		([sel, i, x]) => [
			"li",
			{
				style: { color: highlight(sel, i) },
				onclick: () => selectItem(i),
				// include key for debug
				data: { key: `${sel}|${i}|${x}` },
			},
			x,
		],
		// key is "selection|index|item"
		(item) => item.join("|")
	),

	["h2", {}, "Version 2"],

	// version 2: subscribe to `items` array only and don't include selection in
	// item keys. to update an item's color, we use a reactive attribute
	// subscription attached to `$sel`. the result of this arrangement is that
	// only max. 2 items (current & previous selected item) will be updated when
	// the selection changes or when items are being re-ordered in the list (see
	// shuffle button below).
	//
	// the general advice is: keep the information used in the item key to a
	// minimum and only include those values relevant to an item's unique
	// definition & position in the list (in this case here, if an item is
	// selected has zero influence on its position or content).
	$klist(
		$items.map((items) => items.map((x, i) => <[number, string]>[i, x])),
		"ul",
		{},
		([i, x]) => [
			"li",
			{
				// reactive color attrib
				style: { color: $sel.map((sel) => highlight(sel, i)) },
				onclick: () => selectItem(i),
				// include key for debug
				data: { key: `${i}|${x}` },
			},
			x,
		],
		// key is only "index|item"
		(item) => item.join("|")
	),

	// button to trigger swapping of 2 random list items & update selection if needed
	[
		"button",
		{
			onclick: () => {
				let { items, sel } = db.deref();
				// updates to values in atoms always should be immutable!
				items = items.slice();
				// pick 2 unique indices to swap
				const [idx, idx2] = uniqueIndices(2, items.length);
				swap(items, idx, idx2);
				// swap selection if needed
				if (sel === idx) sel = idx2;
				else if (sel === idx2) sel = idx;
				// update atom, trigger $klist updates
				db.reset({ sel, items });
			},
		},
		"swap items",
	],
]).mount(document.getElementById("app")!);
