import type { MaybeDeref } from "@thi.ng/api";
import { button, InputAttribs } from "@thi.ng/hiccup-html/forms";
import { i } from "@thi.ng/hiccup-html/inline";

export interface IconButtonOpts {
	attribs: Partial<InputAttribs>;
	icon: any;
	iconPos?: "left" | "right";
	label?: MaybeDeref<string>;
}

export const iconButton = (opts: IconButtonOpts) => {
	const isLeft = opts.iconPos !== "right";
	const icon = i(
		{
			style: {
				fill: "currentColor",
				[`margin-${isLeft ? "right" : "left"}`]: "0.5rem",
			},
		},
		opts.icon
	);
	return isLeft
		? button(opts.attribs, icon, opts.label)
		: button(opts.attribs, opts.label, icon);
};
