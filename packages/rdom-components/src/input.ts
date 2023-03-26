import type { NumericArray } from "@thi.ng/api";
import type { Attribs } from "@thi.ng/hiccup-html";
import { div } from "@thi.ng/hiccup-html/blocks";
import {
	inputNumber,
	type InputNumericAttribs,
} from "@thi.ng/hiccup-html/forms";
import { $inputNum } from "@thi.ng/rdom/event";
import type { ISubscription } from "@thi.ng/rstream";
import { pluck } from "@thi.ng/transducers/pluck";
import { repeatedly } from "@thi.ng/transducers/repeatedly";

export const inputNumeric = (
	dest: ISubscription<number, number>,
	attribs?: Partial<InputNumericAttribs>
) =>
	inputNumber({
		...attribs,
		value: dest,
		oninput: $inputNum(dest),
	});

export const inputVector = (
	dim: number,
	dest: ISubscription<NumericArray, NumericArray>,
	outerAttribs: Partial<Attribs> = {},
	innerAttribs?: Partial<InputNumericAttribs>
) =>
	div(
		outerAttribs,
		...repeatedly((i) => inputVectorCoord(dim, i, dest, innerAttribs), dim)
	);

export const inputVectorCoord = (
	dim: number,
	i: number,
	dest: ISubscription<NumericArray, NumericArray>,
	attribs?: Partial<InputNumericAttribs>
) =>
	inputNumber({
		...attribs,
		value: dest.transform(pluck(i)),
		oninput: (e: InputEvent) => {
			const vec = (dest.deref() || new Array(dim).fill(0)).slice();
			vec[i] = parseFloat((<HTMLInputElement>e.target).value);
			dest.next(vec);
		},
	});
