// SPDX-License-Identifier: Apache-2.0
import type { ISubscription } from "@thi.ng/rstream";

export const slider = (
	value: ISubscription<number, number>,
	min: number,
	max: number,
	step: number,
	label: string
) => {
	return [
		"div.pv2",
		["div", label],
		[
			"input.w-100",
			{
				type: "range",
				min,
				max,
				step,
				value,
				oninput: (e: Event) =>
					value.next(+(<HTMLInputElement>e.target).value),
			},
		],
	];
};

export const checkbox = (value: ISubscription<boolean, any>, label: string) => {
	return [
		"div.pv2",
		[
			"input.mr1",
			{
				id: label,
				type: "checkbox",
				checked: value,
				oninput: (e: Event) =>
					value.next((<HTMLInputElement>e.target).checked),
			},
		],
		["label", { for: label }, label],
	];
};
