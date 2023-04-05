import type { Fn, Keys1 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import {
	button as $button,
	div,
	h3,
	inputFile,
	type InputFileAttribs,
} from "@thi.ng/hiccup-html";
import { staticDropdownAlt, type DropdownOpts } from "@thi.ng/rdom-components";
import {
	fromViewUnsafe,
	type ISubscribable,
	type ISubscription,
} from "@thi.ng/rstream";
import { THEME, type Theme } from "../api";
import { DB } from "../state/atom";

export const title = (title: string) =>
	h3({ class: THEME.sideBar.title }, title);

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
		$button(
			{ class: theme.button },
			inputFile({
				class: "absolute o-0",
				...attribs,
			}),
			title
		)
	);

export const smallButton = (
	onclick: EventListener,
	label: string,
	title?: string
) => button("small", onclick, label, title);

export const button = (
	type: Keys1<Theme, "button">,
	onclick: EventListener,
	label: string,
	title = "",
	disabled?: ISubscribable<boolean>
) =>
	$button(
		{
			class: THEME.button[type],
			onclick,
			disabled,
			title,
		},
		label
	);

export const dropdown = <T = string, S extends string = string>(
	items: T[],
	path: ISubscription<S, S> | string[],
	onchange: Fn<string, void>,
	title: string,
	opts?: Partial<DropdownOpts<T>>
) =>
	staticDropdownAlt(
		items,
		isArray(path) ? fromViewUnsafe(DB, { path }) : path,
		{
			...opts,
			attribs: {
				class: THEME.sideBar.control,
				onchange: (e) => onchange((<HTMLSelectElement>e.target).value),
				title,
			},
		}
	);
