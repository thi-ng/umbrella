// SPDX-License-Identifier: Apache-2.0
export const slider = (
	value: number,
	onChange: (n: number) => void,
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
				value,
				min,
				max,
				step,
				oninput: (e: Event) =>
					onChange(+(<HTMLInputElement>e.target).value),
			},
		],
	];
};

export const checkbox = (
	value: boolean,
	onChange: (n: boolean) => void,
	label: string
) => {
	return [
		"div.pv2",
		[
			"input.mr1",
			{
				id: label,
				type: "checkbox",
				checked: value,
				oninput: (e: Event) =>
					onChange((<HTMLInputElement>e.target).checked),
			},
		],
		["label", { for: label }, label],
	];
};
