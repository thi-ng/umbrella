// SPDX-License-Identifier: Apache-2.0
import { isString } from "@thi.ng/checks";
import { para, pre } from "@thi.ng/hiccup-html";
import { parse } from "@thi.ng/hiccup-markdown";
import type { ComponentLike } from "@thi.ng/rdom";
import {
	custom,
	group,
	num,
	range,
	selectNum,
	str,
	type FormItem,
} from "@thi.ng/rdom-forms";
import type { ISubscription } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";

interface CalculatorOpts {
	/**
	 * Calculator title
	 */
	title: string;
	/**
	 * Short description in Markdown format
	 */
	desc: string | ComponentLike;
	/**
	 * Calculator formula (plain text)
	 */
	formula?: string;
}

/**
 * Creates a group of given form field specs and calculator description.
 *
 * @param opts
 * @param items
 */
export const calculator = (
	{ title, desc, formula = "" }: CalculatorOpts,
	...items: FormItem[]
) =>
	group(
		{ label: title },
		custom(
			para(
				{},
				...(isString(desc) ? parse(desc).result : [desc]),
				pre({}, formula)
			)
		),
		...items
	);

/**
 * Creates a result form field spec.
 *
 * @param label
 * @param desc
 * @param value
 */
export const result = (label: string, desc: string, value: any) =>
	str({
		attribs: { class: "result", disabled: true },
		label,
		desc,
		value,
	});

export const volume = (
	label: string,
	desc: string,
	value: ISubscription<number, number>
) =>
	num({
		min: 1,
		max: 1000,
		list: [...$range(10, 101, 10), 125, 150, 175, ...$range(200, 1001, 50)],
		label,
		desc,
		value,
	});

export const concentration = (
	label: string,
	desc: string,
	value: ISubscription<number, number>
) =>
	selectNum({
		items: [...$range(1, 101)],
		label,
		desc,
		value,
	});

export const dimension = (
	label: string,
	desc: string,
	value: ISubscription<number, number>
) =>
	range({
		label,
		desc,
		min: 1,
		max: 30,
		step: 0.5,
		vlabel: 1,
		value,
	});
