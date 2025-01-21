// SPDX-License-Identifier: Apache-2.0
import type {
	Attribs,
	AttribVal,
	BooleanAttrib,
	DimensionAttribs,
	ImportanceAttribs,
	LoadingAttribs,
	ReferrerAttribs,
	StringAttrib,
} from "./api.js";
import { defElement, defElements } from "./def.js";

export interface BlockquoteAttribs extends Attribs {
	cite: StringAttrib;
}

export const blockquote = defElement<Partial<BlockquoteAttribs>>("blockquote");

export interface DetailAttribs extends Attribs {
	open: boolean;
	name: StringAttrib;
}

export const details = defElement<Partial<DetailAttribs>>("details");

export interface DialogAttribs extends Attribs {
	open: boolean;
}

export const dialog = defElement<Partial<DialogAttribs>>("dialog");

export const [div, figure, figcaption, para, pre, summary] = defElements([
	"div",
	"figure",
	"figcaption",
	"p",
	"pre",
	"summary",
]);

export const hr = defElement<Partial<Attribs>, never>("hr");

export interface IFrameAttribs
	extends Attribs,
		DimensionAttribs,
		ImportanceAttribs,
		LoadingAttribs,
		ReferrerAttribs {
	allow: StringAttrib;
	allowfullscreen: BooleanAttrib;
	allowpaymentrequest: BooleanAttrib;
	csp: StringAttrib;
	name: StringAttrib;
	/**
	 * If given empty string, applies all possible restrictions.
	 */
	sandbox: AttribVal<
		| ""
		| "allow-downloads-without-user-activation"
		| "allow-forms"
		| "allow-modals"
		| "allow-orientation-lock"
		| "allow-pointer-lock"
		| "allow-popups"
		| "allow-popups-to-escape-sandbox"
		| "allow-presentation"
		| "allow-same-origin"
		| "allow-scripts"
		| "allow-storage-access-by-user-activation"
		| "allow-top-navigation"
		| "allow-top-navigation-by-user-activation"
	>;
	src: StringAttrib;
	srcdoc: StringAttrib;
}

export const iframe = defElement<Partial<IFrameAttribs>>("iframe");

export interface SlotAttribs extends Attribs {
	name: string;
}

export const slot = defElement<Partial<SlotAttribs>>("slot");

export interface TemplateAttribs extends Attribs {
	shadowrootmode: AttribVal<"open" | "closed">;
	shadowrootclonable: BooleanAttrib;
	shadowrootdelegatesfocus: BooleanAttrib;
}

export const template = defElement<Partial<TemplateAttribs>>("template");
