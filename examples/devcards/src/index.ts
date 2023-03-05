import type { Fn, IObjectOf } from "@thi.ng/api";
import { IAtom, defAtom, defCursor, defView } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";

type CardFn = (state: IAtom<any>) => any;

// counter for untitled cards
let CARD_ID = 1;

/**
 * Inspired by Bruce Hauman's Devcards project:
 * https://github.com/bhauman/devcards/
 *
 * This function takes a component initializer function, an optional
 * pre-initialized state atom, card title and DOM parent element.
 * It then initializes any missing args and kicks off a new hdom
 * render loop to run as self-contained app.
 *
 * If no state is given, a new atom is created automatically.
 * The supplied component function should accept this state as sole argument,
 * do any necessary initialization of sub-components and then return
 * the actual root component (or function) for this app.
 *
 * As with the original Devcards, the client root component is wrapped
 * in a card container, which too displays the app state in JSON format.
 *
 * @param card -
 * @param state -
 * @param title -
 * @param parent -
 */
function defcard(
	card: CardFn,
	state?: IAtom<any>,
	title?: string,
	parent?: string | Element
) {
	state = state || defAtom({});
	title = title || `devcard-${CARD_ID++}`;

	// create new parent element if not provided
	if (!parent) {
		parent = document.createElement("div");
		document.body.appendChild(parent);
	}

	// Create a derived view for entire atom (using empty path `[]`)
	// this updates the JSON body only when state has changed
	const json = defView(state, [], (state) => JSON.stringify(state, null, 2));

	// instantiate the component with supplied state
	const root = card(state);

	// kick off hdom renderloop
	start(
		() => ["div.card", ["h3", title], ["div.body", root, ["pre", json]]],
		{ root: parent }
	);
}

/**
 * Value slider component options (see function below)
 */
interface SliderOpts {
	min: number;
	max: number;
	step?: number;
	label: Fn<any, any>;
	onchange?: EventListener;
}

/**
 * Standalone slider component.
 * Takes an IAtom instance (here usually a Cursor)
 * and slider options, returns component function.
 * When the slider value is changed, automatically
 * resets cursor's value and calls user `onchange`
 * function (if provided).
 *
 * @param state -
 * @param opts -
 */
function slider(state: IAtom<any>, opts: SliderOpts) {
	// prep attribs to avoid extra work during render
	const attribs = {
		...opts,
		type: "range",
		oninput: (e: Event) => {
			state.reset((<HTMLInputElement>e.target).value);
			opts.onchange && opts.onchange(e);
		},
	};
	return () => [
		"div",
		["div", opts.label(state.deref())],
		["input", { ...attribs, value: state.deref() }],
	];
}

interface BMIState {
	height: number;
	weight: number;
	bmi: number;
}

/**
 * This function is a self contained app to be used with
 * the above `defcard()` factory. It receives a state atom
 * for storing its internal state, initializes the different
 * slider components used and finally return a component
 * function to be shown in the card wrapper.
 *
 * @param state -
 */
function bmi(state: IAtom<BMIState>) {
	// state update function
	// computes new BMI value (if weight was changed) or
	// new weight value (if BMI was changed by user)
	const calc = (updateWeight = false) => {
		let { height, weight, bmi } = state.deref() || {
			height: 0,
			weight: 0,
			bmi: 0,
		};
		height *= 0.01;
		if (updateWeight) {
			state.resetIn(["weight"], bmi * height * height);
		} else {
			state.resetIn(["bmi"], weight / (height * height));
		}
	};

	// define BMI thresholds
	const thresh: [number, string, string][] = [
		[10, "underweight", "#cf3"],
		[18.5, "normal", "#7f0"],
		[25, "overweight", "#f90"],
		[30, "obese", "#f00"],
	];

	// derived view of bmi value to translate it into english
	const bmiClass = defView(state, ["bmi"], (bmi) =>
		bmi > thresh[3][0]
			? thresh[3][1]
			: bmi > thresh[2][0]
			? thresh[2][1]
			: bmi > thresh[1][0]
			? thresh[1][1]
			: thresh[0][1]
	);

	// another derived view to create SVG visualization
	const bmiScale = (x: number) => ((x - 10) / 30) * 100 + "%";
	const bmiViz = defView(state, ["bmi"], (bmi: number) => [
		"div",
		[
			"svg",
			{ width: "100%", height: 30, style: { "font-size": "10px" } },
			...thresh.map(([t, _, col]) => [
				"rect",
				{ x: bmiScale(t), y: 0, width: "100%", height: 30, fill: col },
			]),
			...thresh.map(([t, label]) => [
				"text",
				{ x: bmiScale(t + 0.5), y: 12 },
				label,
			]),
			["circle", { cx: bmiScale(bmi), cy: 20, r: 5 }],
		],
	]);

	// define slider components
	// note how each uses a cursor to their respective
	// target values in the app state
	const height = slider(defCursor(state, ["height"]), {
		min: 100,
		max: 220,
		label: (v) => `Height: ${~~v}cm`,
		onchange: () => calc(),
	});
	const weight = slider(defCursor(state, ["weight"]), {
		min: 10,
		max: 150,
		label: (v) => `Weight: ${~~v}kg`,
		onchange: () => calc(),
	});
	const bmi = slider(defCursor(state, ["bmi"]), {
		min: 10,
		max: 50,
		label: (v) => [
			"span",
			{ class: bmiClass.deref() },
			`BMI: ${~~v} (${bmiClass.deref()})`,
		],
		onchange: () => calc(true),
	});

	// perform initial calculation
	calc();

	return () => ["div", height, weight, bmi, ["div", bmiViz]];
}

/**
 * All what's left to do here is to instantiate a bunch of cards (apps):
 *
 * Option 1: Two defcard() instances, each with their own, individual state atom
 */
defcard(bmi, defAtom({ weight: 75, height: 194 }), "BMI calculator");
defcard(bmi);

defcard(
	() =>
		"The cards below are all attached to the same atom, but use cursors to subscribe to different branches within the nested state."
);

/**
 * Option 2: defcard() instances using shared central state
 */
const db = defAtom<IObjectOf<Partial<BMIState>>>({
	card1: { weight: 75, height: 194 },
});

defcard(bmi, defCursor(db, ["card1"]), "BMI calculator (shared)");
defcard(bmi, defCursor(db, ["card2"]));

defcard((state) => {
	// just some random task to populate another part of the app state
	setInterval(
		() => state.resetIn(["stats", "now"], new Date().toISOString()),
		1000
	);
	return ["div", "The full shared state:"];
}, db);
