import { button, div, h1, main, strong } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import {
	filter,
	map,
	mult,
	range,
	repeatedly,
	source,
} from "@thi.ng/transducers-async";

// infinite 1Hz counter, supporting multiple subscriptions.
// btw. iterables (sync or async) are usually only having a single consumer,
// to allow multiple ones, we need to wrap the iterable in `mult()`...
const counter = mult(range(1000));

// manually updated click counter (also an async iterable)
const clicks = source(0);

// infinitely cycling color values @ 2Hz (500ms) as async iterable
const colors = repeatedly(
	(i) => ["red", "green", "blue", "light-blue", "hot-pink", "gold"][i % 6],
	Infinity,
	500
);

$compile(
	main(
		{},
		h1({}, "EcmaScript async iterables in thi.ng/rdom"),
		div(
			{},
			"filtered: ",
			strong(
				{},
				// filtered version of counter
				filter(async (x) => !(x & 1), counter.subscribe())
			)
		),
		div(
			{},
			"transformed: ",
			strong(
				// transform colors into CSS classes
				{ class: map((x) => `color-${x}`, colors) },
				// transformed version of counter
				map(async (x) => x * 10, counter.subscribe())
			)
		),
		div(
			{},
			button(
				// update click count
				{ onclick: () => clicks.update((x) => x! + 1) },
				"clicks: ",
				// directly embed async iterable (for reactive update)
				clicks
			)
		)
	)
).mount(document.getElementById("app")!);
