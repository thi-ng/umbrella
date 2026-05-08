import { shuffle } from "@thi.ng/arrays";
import {
	button,
	div,
	h3,
	table,
	td,
	tfoot,
	thead,
	tr,
} from "@thi.ng/hiccup-html";
import { pickRandom, SYSTEM } from "@thi.ng/random";
import { $compile, $klist, $list } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

type ListItem = { id: number; name: string };

let nextID = 1;

// function to create a randomized list item
const newItem = (): ListItem => ({
	id: nextID++,
	name: pickRandom([
		"alice",
		"bob",
		"charlie",
		"dora",
		"emily",
		"fred",
		"gemma",
		"hanna",
	]),
});

// reactive wrapper for list of items
const items = reactive([...repeatedly(newItem, 3)]);

// helper subscription to disable UI controls if no items in list
const disabled = items.map((x) => !x.length);

// reactive UI controls to manipulate list
const controls = div(
	".controls",
	{},
	button(
		{
			onclick: () => items.next([...items.deref()!, newItem()]),
		},
		"add"
	),
	button(
		{
			disabled,
			onclick: () => items.next(shuffle(items.deref()!)),
		},
		"shuffle"
	),
	button(
		{
			disabled,
			onclick: () => {
				const buf = items.deref()!;
				buf.splice(SYSTEM.int() % items.deref()!.length, 1);
				items.next(buf);
			},
		},
		"delete"
	)
);

// represent items as table using an embedded bare rdom $list component
const itemTable = table(
	{},
	// static table header
	thead({}, td({}, "id"), td({}, "name")),
	// insert bare list, i.e. directly attached to parent table without any
	// further nesting (alternatively, comment out the `tbody` line below to
	// switch to wrapped list)
	$list(items, {
		// el: "tbody"
		item: ({ id, name }) => tr({}, td({}, id), td({}, name)),
		equiv: (a, b) => a.id === b.id,
	}),
	// static table footer
	tfoot({}, td({}, "id"), td({}, "name"))
);

const gridCell = ({ id, name }: ListItem, type = "dynamic") =>
	div(`.cell.${type}`, { data: { id } }, name);

// represent items in a CSS grid container using an embedded bare rdom $klist
const itemGrid = div(
	".grid",
	{},
	// static content
	gridCell({ id: -1, name: "header" }, "static"),
	// insert bare list, i.e. directly attached to parent grid container without
	// any further nesting (unlike with the other table-list above, here we
	// really can't introduce any further nesting)
	$klist(items, { item: gridCell, key: (x) => x.id }),
	// back to static content
	gridCell({ id: -2, name: "footer" }, "static")
);

// combine & compile everything
$compile(
	div({}, controls, h3({}, "$klist"), itemGrid, h3({}, "$list"), itemTable)
).mount(document.getElementById("app")!);
