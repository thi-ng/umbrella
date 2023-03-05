import { reactive, sync } from "@thi.ng/rstream";
import { percent } from "@thi.ng/strings";
import { comp, map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { dial } from "./dial";

// hdom context & app state object
export const ctx = {
	// streams to hold dial values
	streams: {
		a: reactive(0.66),
		b: reactive(1),
		c: reactive(0.75),
	},
	// component styling
	ui: {
		root: { class: "vh-100 flex justify-center items-center" },
		dial: { width: 100, height: 100, class: "pointer ma1" },
	},
};

/**
 * This HOF (higher-order function) returns a mapping function which
 * receives a tuple of object of all current stream values and returns a
 * hdom root component. It will be used by the `sync()` construct
 * further below.
 *
 * The dial components used here are HOFs themselves and therefore must
 * be pre-initialized before use.
 */
const app = () => {
	const dialA = dial({
		r1: 0.5,
		color: {
			from: [0, 0],
			to: [1, 1],
			stops: [
				[0, "#075"],
				[1, "#6f9"],
			],
		},
		font: "20px Menlo",
		label: (x) => percent(0)(x),
		onchange: (x) => ctx.streams.a.next(x),
	});
	const dialB = dial({
		r1: 0.66,
		base: -Math.PI / 2,
		gap: Math.PI / 2,
		color: {
			from: [0, 0],
			to: [1, 0.75],
			stops: [
				[0, "#00f"],
				[0.5, "#f60"],
				[1, "#ff0"],
			],
		},
		font: "20px Menlo",
		label: (x) => percent(1)(x),
		onchange: (x) => ctx.streams.b.next(x),
	});
	const dialC = dial({
		r1: 0.75,
		gap: Math.PI,
		color: {
			from: [0, 0],
			to: [1, 0],
			stops: [
				[0, "#407"],
				[1, "#09f"],
			],
		},
		font: "20px Menlo",
		label: (x) => percent(2)(x),
		onchange: (x) => ctx.streams.c.next(x),
	});
	return ({ a, b, c }: any) => [
		"div",
		ctx.ui.root,
		[dialA, ctx.ui.dial, a],
		[dialB, ctx.ui.dial, b],
		[dialC, ctx.ui.dial, c],
	];
};

// stream combinator & reactive DOM update
sync({
	src: ctx.streams,
	xform: comp(map(app()), updateDOM()),
});
