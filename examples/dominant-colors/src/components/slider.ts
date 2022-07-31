import { div } from "@thi.ng/hiccup-html/blocks";
import { label } from "@thi.ng/hiccup-html/forms";
import { inputNumeric } from "@thi.ng/rdom-components/input";
import type { ISubscription } from "@thi.ng/rstream";

export const slider = (
	dest: ISubscription<number, number>,
	desc: string,
	attribs?: any
) =>
	div(
		null,
		label(
			{ class: "dib w-50 w-25-ns", for: `input-${desc}` },
			`${desc}: `,
			dest
		),
		inputNumeric(dest, {
			class: "dib w-50 w-25-ns",
			type: "range",
			...attribs,
		})
	);
