import { peek } from "@thi.ng/arrays";
import { objectFromKeys } from "@thi.ng/associative";
import { isString } from "@thi.ng/checks";
import { div, li, span, ul } from "@thi.ng/hiccup-html";
import { $compile, $replace } from "@thi.ng/rdom";
import { fromDOMEvent, merge, reactive, trigger } from "@thi.ng/rstream";
import { capitalize } from "@thi.ng/strings";
import {
	comp,
	filter,
	map,
	reducer,
	scan,
	sideEffect,
} from "@thi.ng/transducers";
import { fsm } from "@thi.ng/transducers-fsm";

// list of keys we're interested in
const MODIFIERS = ["shift", "control"];
const ALL_KEYS = ["w", "a", "s", "d", "z", "x", "k", ...MODIFIERS];

// object type for tracking multiple pressed keys
type KeyStates = Record<string, boolean>;

// type for finite state machine (further below)
type KeySeqState = { state: string; choices: Trie };

// recursive type definition for multi-key command sequences
// https://en.wikipedia.org/wiki/Trie
type Trie = { [id: string]: TrieData };
type TrieData = string | Trie;

// command sequences as nested data structure:
// - nested objects represent key sub-sequences/choices
// - string values are command IDs
const COMMANDS: Trie = {
	control: {
		a: "select-all",
		d: "duplicate",
		k: { w: "close-all", s: "save-all", control: { x: "open-explorer" } },
		z: "undo",
		shift: { z: "redo" },
	},
	shift: { control: { z: "redo" } },
};

// FSM initial state
const FSM_INIT: KeySeqState = { state: "seq", choices: COMMANDS };

// create stream of key states from merging DOM event streams and attaching a
// transducer (`xform`) to transform the raw events into a stream of
// `KeyStates` objects...
const keys = merge({
	// source streams to merge
	src: [fromDOMEvent(window, "keydown"), fromDOMEvent(window, "keyup")],
	// composes transducer (to transform incoming values/events)
	xform: comp(
		// skip key repeats & non-configured keys
		filter(
			(e: KeyboardEvent) =>
				!e.repeat && ALL_KEYS.includes(e.key.toLowerCase())
		),
		// disable event propagation
		sideEffect((e) => e.preventDefault()),
		// scan is a higher-order transducer to build stepwise reductions
		// in this case, the "reductions" are objects keeping track of pressed keys
		// see: https://docs.thi.ng/umbrella/transducers/functions/scan.html
		// see: https://is.gd/sqJjQm (blog post section)
		scan(
			reducer<KeyStates, KeyboardEvent>(
				// initialize all key states to false
				() => objectFromKeys(ALL_KEYS, false),
				// state update function (triggered for each key event)
				(acc, e) => ({
					...acc,
					[e.key.toLowerCase()]: e.type !== "keyup",
				})
			)
		)
	),
});

// dummy subscription for debugging
keys.subscribe({ next: console.log });
// { w: true, a: false, s: false, d: false, z: false, x: false, ... }

// now transform keys stream with finite state machine to extract command seqs.
// for matched sequences, this stream will emit their respective command IDs
// the FSM is implemented as transducer (see: https://thi.ng/transducers-fsm)
const commands = keys.transform(
	fsm<KeySeqState, KeyStates, string>({
		states: {
			// default FSM state: checks all possible next keys according to
			// current command trie branch
			seq: (fsmState, keys) => {
				for (let k in fsmState.choices) {
					if (!keys[k]) continue;
					const next = fsmState.choices[k];
					// found a command?
					if (typeof next === "string") {
						// switch the "release" state
						fsmState.state = "release";
						// reset choices to beginning
						fsmState.choices = COMMANDS;
						// demo only: emit state for UI inspection
						fsmDebug.next(fsmState);
						// emit command ID downstream
						return [next];
					} else {
						// wait for key release, unless curr key is modifier
						if (!MODIFIERS.includes(k)) fsmState.state = "release";
						// select next trie branch for new key choices
						fsmState.choices = next;
						// demo only: emit state for UI inspection
						fsmDebug.next(fsmState);
						return;
					}
				}
				// no key matched, reset to beginning
				fsmState.choices = COMMANDS;
				// demo only: emit state for UI inspection
				fsmDebug.next(fsmState);
			},
			release: (state, curr) => {
				// wait for all keys to be released
				if (Object.values(curr).every((x) => !x)) {
					state.state = "seq";
					fsmDebug.next(state);
				}
			},
			// required, but unused
			never: () => {},
		},
		// FSM initialization handler (returns initial state)
		init: () => FSM_INIT,
		// FSM terminates when this state is reached (here: never)
		terminate: "never",
	})
);

// stream to display internal FSM state incl. next possible keys (of a sequence)
const fsmDebug = reactive(FSM_INIT).map((x) =>
	[
		"state:",
		x.state,
		x.state === "seq"
			? `/ key choices: ${Object.keys(x.choices).sort()}`
			: "/ waiting for key release",
	].join(" ")
);

// UI component function to visualize key states as color coded <span>s
const keyStatesWidget = (state: KeyStates) =>
	div(
		{},
		...map(
			(key) =>
				span(
					// uses https://tachyons.io/ CSS for simplicity
					{
						class:
							"dib w3 pv3 mr2 tc bg-" +
							(state[key] ? "gold" : "light-blue"),
					},
					key
				),
			ALL_KEYS
		)
	);

// recursively converts command trie into flat array of formatted,
// human-readable key command sequences
const formatCommands = (
	trie: Trie,
	acc: string[] = [],
	prefix: string[] = []
) =>
	Object.entries(trie).reduce((acc, [k, v]) => {
		const curr = prefix.concat(
			prefix.length
				? !MODIFIERS.includes(peek(prefix))
					? " "
					: "+"
				: "",
			k
		);
		isString(v)
			? acc.push(curr.map(capitalize).join("") + " : " + v)
			: formatCommands(v, acc, curr);
		return acc;
	}, acc);

// compile & mount reactive UI/DOM
$compile(
	div(
		{},
		// thi.ng/rdom component wrapper which also subscribes to above `keys` stream
		// and re-renders DOM component for every change
		$replace(
			// create another stream merge
			// the dummy`trigger()` is needed to show the UI component before the 1st key press
			merge<KeyStates, KeyStates>({ src: [keys, trigger({})] }).map(
				keyStatesWidget
			)
		),
		div(
			".bg-light-yellow.mv3.pa3",
			{},
			// internal FSM state inspection
			div({}, fsmDebug),
			// recognized command IDs
			div(".b", {}, "command: ", commands)
		),
		// display configured key sequences and their respective command IDs
		div(
			{},
			"Available command sequences:",
			ul({}, ...formatCommands(COMMANDS).map((x) => li({}, x)))
		)
	)
).mount(document.getElementById("app")!);
