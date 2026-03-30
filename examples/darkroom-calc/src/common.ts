import { isString } from "@thi.ng/checks";
import { para, pre } from "@thi.ng/hiccup-html";
import { parse } from "@thi.ng/hiccup-markdown";
import type { ComponentLike } from "@thi.ng/rdom";
import {
	custom,
	group,
	str,
	type FormItem,
	type ReadonlyPartialSpec,
	type Str,
} from "@thi.ng/rdom-forms";
import { range } from "@thi.ng/transducers";

interface CalculatorOpts {
	title: string;
	desc: string | ComponentLike;
	formula: string;
}

export const calculator = (
	{ title, desc, formula }: CalculatorOpts,
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

export const result = (label: string, desc: string, value: any) =>
	str({
		attribs: { class: "result", disabled: true },
		label,
		desc,
		value,
	});

export const VOLUME_LIST = [
	...range(10, 101, 10),
	125,
	150,
	175,
	...range(200, 1001, 50),
];
