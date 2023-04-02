import {
	button,
	div,
	inputFile,
	type InputFileAttribs,
} from "@thi.ng/hiccup-html";
import { type Theme } from "../api";

/**
 * File import button UI component
 *
 * @param attribs
 * @param theme
 * @param title
 */
export const fileButton = (
	attribs: Partial<InputFileAttribs>,
	theme: Theme["fileButton"]["_"],
	title: string
) =>
	div(
		{ class: theme.root },
		button(
			{ class: theme.button },
			inputFile({
				class: "absolute o-0",
				...attribs,
			}),
			title
		)
	);
