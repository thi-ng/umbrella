// SPDX-License-Identifier: Apache-2.0
import { peek } from "@thi.ng/arrays";
import { div, inputText, pre } from "@thi.ng/hiccup-html";
import { ENV, evalSource } from "@thi.ng/lispy";
import { $compile, $klist } from "@thi.ng/rdom";
import { reactive, syncRAF } from "@thi.ng/rstream";
import { ESCAPES } from "@thi.ng/strings";
import { slidingWindow } from "@thi.ng/transducers";

// type definition for a single REPL item
interface REPLItem {
	type: REPLItemType;
	value: string;
	id: number;
}

type REPLItemType = "in" | "out" | "err" | "print" | "intro";

// REPL history length (scrollback limit)
const MAX_HISTORY = 25;

// intro message
const INTRO = `Welcome to Lispy

Type your S-expressions in the input box below.
Press Enter to evaluate.
Click on a previous input to place it back in the prompt.

See https://thi.ng/lispy readme for details.

Examples:

(env)
    Show current environment
(print (join "\\n" (syms)))
    Print symbols in current environment
(def name value)
    Define new global symbol
(defn name (args...) ...body)
    Define new function`;

// CSS classes for various REPL item types
const STYLES: Record<REPLItemType, string> = {
	err: "bg-dark-red white",
	in: "bg-light-yellow",
	intro: "bg-purple white",
	out: "bg-light-blue",
	print: "bg-gold",
};

// create a stream of REPL items, seeded with intro message and transformed with
// `slidingWindow()` transducer to enforce scrollback limit. the UI will
// subscribe to this stream, further transform it (into UI/DOM components) and
// then update with each change
const repl = reactive<REPLItem>({
	id: 0,
	type: "intro",
	value: INTRO,
}).transform(slidingWindow(MAX_HISTORY, true));

// helper function to add a new REPL item to the stream. the internal `id`
// attrib is only used by the UI (see further below) and the auto-incrementing
// item ID works by looking up the ID of the most recent REPL item in the stream
// and using that ID + 1 for the new item...
const addItem = (type: REPLItemType, value: string) =>
	repl.next({ id: peek(repl.deref()!).id + 1, type, value });

// override built-in print method to redirect outputs to REPL
ENV.print = (...args: any[]) => addItem("print", args.join(" "));

// REPL input & key event handler
// if user pressed Enter, evaluate input and update REPL stream
const processInput = (e: KeyboardEvent) => {
	if (e.key !== "Enter") return;
	const el = <HTMLInputElement>e.target;
	const src = el.value.replace(/\\(\w)/g, (_, x) => ESCAPES[x] ?? `\\${x}`);
	// add input text as REPL item
	addItem("in", el.value);
	// reset input field
	el.value = "";
	try {
		// eval and add output to REPL
		addItem("out", String(evalSource(src)));
	} catch (e) {
		// add error message as REPL item
		addItem("err", (<Error>e).message);
	}
};

// thi.ng/rdom UI component function for a single REPL item
const replItem = (item: REPLItem) =>
	pre(
		".ma0.pa2",
		{
			class: STYLES[item.type],
			// add click handler for input items to copy text into input field
			onclick:
				item.type === "in"
					? () => {
							const el = <HTMLInputElement>(
								document.getElementById("input")
							);
							el.value = item.value;
							el.focus();
					  }
					: undefined,
		},
		item.value
	);

// create & mount reactive UI/DOM
$compile(
	div(
		".vh-100.flex.flex-column",
		{},
		// keyed list component wrapper for REPL item stream
		// see: https://docs.thi.ng/umbrella/rdom/functions/_klist.html
		$klist(
			repl,
			// list wrapper element and its attribs
			"div#repl.flex-grow-1.code.f6.overflow-y-scroll.overflow-x-hidden",
			{},
			// single list item component function
			replItem,
			// item key function/accessor
			// (used to determine if item needs to be updated)
			(x) => x.id
		),
		// REPL input text field
		inputText("#input.w-100.bg-black.white.pa2.code.f6.bn", {
			placeholder: "(input...)",
			onkeydown: processInput,
			autofocus: true,
		})
	)
).mount(document.getElementById("app")!);

// secondary REPL stream subscription (and synchronized with RAF events) to
// scroll the REPL <div> to bottom position (in order to show latest output)
// each time a new item is being added to the stream.
syncRAF(repl).subscribe({
	next() {
		document.getElementById("repl")!.scrollTo({ top: 10000 });
	},
});
