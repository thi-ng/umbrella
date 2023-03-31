import {
	button,
	inputFile,
	div,
	type InputFileAttribs,
} from "@thi.ng/hiccup-html";

/**
 * File import button UI component
 *
 * @param attribs
 * @param title
 */
export const fileButton = (attribs: Partial<InputFileAttribs>, title: string) =>
	div(
		{ class: "relative overflow-hidden" },
		button(
			{ class: "dib h2 w-100 bn bg-dark-gray white" },
			inputFile({
				class: "absolute o-0",
				...attribs,
			}),
			title
		)
	);
