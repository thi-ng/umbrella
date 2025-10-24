// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import {
	button as $button,
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
import { DB } from "../state/atom.js";

export const title = (title: string) => h3({}, title);

/**
 * File import button UI component
 *
 * @param attribs
 * @param theme
 * @param title
 */
export const fileButton = (
	attribs: Partial<InputFileAttribs>,
	size: "small" | "large",
	title: string
) => $button({ class: `filebutton ${size}` }, inputFile(attribs), title);

export const smallButton = (
	onclick: EventListener,
	label: string,
	title?: string
) => button("small", onclick, label, title);

export const button = (
	type: "base" | "large" | "small" | "col2" | "col4",
	onclick: EventListener,
	label: string,
	title = "",
	disabled?: ISubscribable<boolean>
) =>
	$button(
		{
			class: type,
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
				class: "control",
				onchange: (e) => onchange((<HTMLSelectElement>e.target).value),
				title,
			},
		}
	);
