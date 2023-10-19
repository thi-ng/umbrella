import type { Fn, Fn2 } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { OPERATORS } from "@thi.ng/compare";
import { isFunction } from "@thi.ng/checks";
import { div, inputText, pre } from "@thi.ng/hiccup-html";
import { $compile, $klist } from "@thi.ng/rdom";
import { reactive, syncRAF } from "@thi.ng/rstream";
import { slidingWindow } from "@thi.ng/transducers";
import { $eval } from "./lang.js";
import KERNEL from "./kernel.lisp?raw";

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

(def sym val) — define new sym
(defn sym (arg ...) body-expr ...) — define new function
(fn (arg ...) body-expr ...) — anonymous function
(let (sym val ...) body-expr ...) — local symbol bindings
(if test truthy-expr else-expr) — conditional (else-expr is optional)
(print ...) — print args
(count x) — number of element in x
(first x) — first element of x
(next x) — remaining elements of x
(map fn list) — list transformation
(reduce fn acc list) — list reduction
(env) — print global environment`;

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

// helper function for basic math ops variable arity.
// with 2+ args: (+ 1 2 3 4) => 10
// and special cases for 1 arg only, i.e.
// `(+ 2)` => 0 + 2 => 2
// `(- 2)` => 0 - 2 => -2
// `(* 2)` => 1 * 2 => 2
// `(/ 2)` => 1 / 2 => 0.5
const mathOp =
	(fn: Fn2<number, number, number>, fn1: Fn<number, number>) =>
	(first: any, ...args: any[]) => {
		return args.length > 0
			? // use a reduction for 2+ args
			  args.reduce((acc, x) => fn(acc, x), first)
			: // apply special case unary function
			  fn1(first);
	};

// define initial environment, populated with some useful constants and
// functions...
const ENV: Record<string, any> = {
	// prettier-ignore
	"+": mathOp((acc, x) => acc + x, (x) => x),
	// prettier-ignore
	"*": mathOp((acc, x) => acc * x, (x) => x),
	// prettier-ignore
	"-": mathOp((acc, x) => acc - x, (x) => -x),
	// prettier-ignore
	"/": mathOp((acc, x) => acc / x, (x) => 1 / x),

	...OPERATORS,

	π: Math.PI,
	sin: Math.sin,
	cos: Math.cos,
	sqrt: Math.sqrt,
	hypot: Math.hypot,
	// print args by creating an REPL item
	print: (...args: any[]) => addItem("print", args.join(" ")),
	pr: (...args: any[]) =>
		addItem("print", args.map((x) => JSON.stringify(x)).join(" ")),
	concat: (list: any[], ...x: any) => list.concat(x),
	// returns length of first argument (presumably a list or string)
	// (e.g. `(count "abc")` => 3)
	count: (arg: any) => arg.length,
	// returns first item of list/string
	first: (arg: any) => arg[0],
	// returns remaining list/string (from 2nd item onward) or undefined if
	// there're no further items
	next: (arg: any) => (arg.length > 1 ? arg.slice(1) : undefined),
	// print a JSON version of the global env
	env: () =>
		addItem(
			"print",
			JSON.stringify(
				ENV,
				(_, val) => (isFunction(val) ? "<function>" : val),
				2
			)
		),
};

// import & eval more core language terms/functions
// (add more to kernel.lisp, if needed...)
$eval(KERNEL, ENV);

// REPL input & key event handler
// if user pressed Enter, evaluate input and update REPL stream
const processInput = (e: KeyboardEvent) => {
	if (e.key !== "Enter") return;
	const el = <HTMLInputElement>e.target;
	const src = el.value;
	// add input text as REPL item
	addItem("in", src);
	// reset input field
	el.value = "";
	try {
		// eval and add output to REPL
		addItem("out", String($eval(src, ENV)));
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
