import type { Fn, Keys1 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import {
	button as $button,
	div,
	inputFile,
	type InputFileAttribs,
} from "@thi.ng/hiccup-html";
import { staticDropdown, type DropdownOpts } from "@thi.ng/rdom-components";
import {
	fromViewUnsafe,
	type ISubscribable,
	type ISubscription,
} from "@thi.ng/rstream";
import { THEME, type Theme } from "../api";
import { DB } from "../state/atom";

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

export const smallButton = (onclick: EventListener, label: string) =>
	button("small", onclick, label);

export const button = (
	type: Keys1<Theme, "button">,
	onclick: EventListener,
	label: string,
	disabled?: ISubscribable<boolean>
) =>
	$button(
		{
			class: THEME.button[type],
			onclick,
			disabled,
		},
		label
	);

export const dropdown = <T = string, S extends string = string>(
	items: T[],
	path: ISubscription<S, S> | string[],
	onchange: Fn<string, void>,
	opts?: Partial<DropdownOpts<T>>
) =>
	staticDropdown(items, isArray(path) ? fromViewUnsafe(DB, { path }) : path, {
		...opts,
		attribs: {
			class: THEME.sideBar.control,
			onchange: (e) => onchange((<HTMLSelectElement>e.target).value),
		},
	});
