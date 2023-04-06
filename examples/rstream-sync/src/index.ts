import { $compile, $refresh } from "@thi.ng/rdom";
import { reactive, stream, sync } from "@thi.ng/rstream";
import { cycle, map, slidingWindow } from "@thi.ng/transducers";

// infinite sequences of greetings & names
const greetings = cycle(["hi", "hey", "hello", "hallo", "ciao"]);
const names = cycle(["alice", "bob", "charlie", "dora", "ernie"]);

// pre-seeded reactive value
const greeting = reactive("hello");

// uninitialized reactive value
const subject = stream<string>();

// stream combinator & attached transform which only passes values downstream
// once ALL inputs have delivered values
const combined = sync({ src: { greeting, subject } }).map(
	({ greeting, subject }) => `${greeting}, ${subject}!`
);

// child subscription keeping a record of last 10 values, reformatted as single multi-line string
const log = combined.transform(
	slidingWindow(10),
	map((chunk: string[]) => chunk.join("\n"))
);

// event handlers for the buttons below
const nextGreeting = () => greeting.next(greetings.next().value!);
const nextSubject = () => subject.next(names.next().value!);

// UI/DOM construction
$compile([
	"div.bg-light-gray.w-33-ns.pa3",
	{},
	// direct embedding of reactive value
	["h3.mv2", {}, "direct use: ", combined],
	// reactive value via rdom's $refresh() component wrapper
	// (this will only become visible once `subject` has produced a value)
	["h3.mv2", {}, "$refresh #1: ", $refresh(combined, async (x) => x)],
	// similar again, only this time wrapping entire element
	$refresh(combined, async (body) => ["h3.mv2", {}, "$refresh #2: ", body]),
	// showing state of individual reactive values
	[
		"div.bt.pt2.mv2",
		{},
		["div", {}, "greeting: ", greeting],
		["div", {}, "subject: ", subject],
	],
	// control buttons to trigger reactive value changes
	[
		"div.flex.mv2",
		{},
		[
			"button.w-50.bg-light-blue.bn.pa2.mr2",
			{ onclick: nextGreeting },
			"next greeting",
		],
		[
			"button.w-50.bg-light-green.bn.pa2",
			{ onclick: nextSubject },
			"next subject",
		],
	],
	// using $refresh to wrap the `log` and display alternative "pre-loader"
	// content until `log` delivers it's first value (which will only be the
	// case once `combined` has done so too...)
	$refresh(
		log,
		// main component
		async (body) => [
			"textarea.w-100.pa2.mv2",
			{
				rows: 10,
				value: body,
			},
		],
		// unused error component (in case main component fn throws an error)
		undefined,
		// pre-loader component (shown first)
		async () => ["div.bg-washed-red.pa2.mv2", {}, "<waiting for data...>"]
	),
]).mount(document.getElementById("app")!);
