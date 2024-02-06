import type { FnN } from "@thi.ng/api";
import { HALF_PI, PI, TAU } from "./api.js";

const { cos, sin, sqrt } = Math;

export const defEaseInExp =
	(k: number): FnN =>
	(t) =>
		t ** k;

export const defEaseOutExp =
	(k: number): FnN =>
	(t) =>
		1 - (1 - t) ** k;

export const defEaseInOutExp = (k: number): FnN => {
	const k2 = 2 ** (k - 1);
	return (t) => (t < 0.5 ? k2 * t ** k : 1 - (-2 * t + 2) ** k / 2);
};

export const easeLinear: FnN = (t) => t;

export const easeIn2 = defEaseInExp(2);
export const easeOut2 = defEaseOutExp(2);
export const easeInOut2 = defEaseInOutExp(2);

export const easeIn3 = defEaseInExp(3);
export const easeOut3 = defEaseOutExp(3);
export const easeInOut3 = defEaseInOutExp(3);

export const easeIn4 = defEaseInExp(4);
export const easeOut4 = defEaseOutExp(4);
export const easeInOut4 = defEaseInOutExp(4);

export const easeIn5 = defEaseInExp(5);
export const easeOut5 = defEaseOutExp(5);
export const easeInOut5 = defEaseInOutExp(5);

export const easeInBack: FnN = (t) => 2.70158 * t ** 3 - 1.70158 * t ** 2;
export const easeOutBack: FnN = (t) =>
	2.70158 * (t - 1) ** 3 + 1 + 1.70158 * (t - 1) ** 2;
export const easeInOutBack: FnN = (t) =>
	t < 0.5
		? ((2 * t) ** 2 * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2
		: ((2 * t - 2) ** 2 * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) /
		  2;

export const easeInBounce: FnN = (t) => 1 - easeOutBounce(1 - t);
export const easeOutBounce: FnN = (t) =>
	t < 1 / 2.75
		? 7.5625 * (t * t)
		: t < 2 / 2.75
		? 7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + 0.75
		: t < 2.5 / 2.75
		? 7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + 0.9375
		: 7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + 0.984375;
export const easeInOutBounce: FnN = (t) =>
	t < 0.5
		? (1 - easeOutBounce(1 - 2 * t)) / 2
		: (1 + easeOutBounce(2 * t - 1)) / 2;

export const easeInCirc: FnN = (t) => 1 - sqrt(1 - t ** 2);
export const easeOutCirc: FnN = (t) => sqrt(1 - (t - 1) ** 2);
export const easeInOutCirc: FnN = (t) =>
	t < 0.5
		? (1 - sqrt(1 - (2 * t) ** 2)) / 2
		: (sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2;

export const easeInElastic: FnN = (t) =>
	t <= 0
		? 0
		: t >= 1
		? 1
		: -(2 ** (10 * t - 10)) * sin((t * 10 - 10.75) * (TAU / 3));
export const easeOutElastic: FnN = (t) =>
	t <= 0
		? 0
		: t >= 1
		? 1
		: 2 ** (-10 * t) * sin((t * 10 - 0.75) * (TAU / 3)) + 1;
export const easeInOutElastic: FnN = (t) =>
	t <= 0
		? 0
		: t >= 1
		? 1
		: t < 0.5
		? -(2 ** (20 * t - 10) * sin((20 * t - 11.125) * (TAU / 4.5))) / 2
		: (2 ** (-20 * t + 10) * sin((20 * t - 11.125) * (TAU / 4.5))) / 2 + 1;

export const easeInExp2: FnN = (t) => (t <= 0 ? 0 : 2 ** (10 * t - 10));
export const easeOutExp2: FnN = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
export const easeInOutExp2: FnN = (t) =>
	t < 0
		? 0
		: t >= 1
		? 1
		: t < 0.5
		? 2 ** (20 * t - 10) / 2
		: (2 - 2 ** (-20 * t + 10)) / 2;

export const easeInSine: FnN = (t) => 1 - cos(t * HALF_PI);
export const easeOutSine: FnN = (t) => sin(t * HALF_PI);
export const easeInOutSine: FnN = (t) => -(cos(PI * t) - 1) / 2;
