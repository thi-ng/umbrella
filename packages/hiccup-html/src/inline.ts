// SPDX-License-Identifier: Apache-2.0
import type { NumOrString } from "@thi.ng/api";
import type {
	Attribs,
	AttribVal,
	MultiStringAttrib,
	ReferrerAttribs,
	RelAttribs,
	StringAttrib,
} from "./api.js";
import { defElement, defElements } from "./def.js";

export interface AnchorAttribs extends RelAttribs, ReferrerAttribs {
	download: StringAttrib;
	href: StringAttrib;
	hreflang: StringAttrib;
	ping: MultiStringAttrib;
	target: StringAttrib;
	type: StringAttrib;
}

export const anchor = defElement<Partial<AnchorAttribs>>("a");

export const abbr = defElement<{ title: StringAttrib } & Partial<Attribs>>(
	"abbr"
);

export const br = defElement<never, never>("br");

export const data = defElement<
	{ value: AttribVal<NumOrString> } & Partial<Attribs>
>("data");

export const quote = defElement<{ cite: StringAttrib } & Partial<Attribs>>("q");

export const time = defElement<{ datetime: StringAttrib } & Partial<Attribs>>(
	"time"
);

export const [
	cite,
	code,
	dfn,
	em,
	i,
	kbd,
	mark,
	small,
	span,
	strikethrough,
	strong,
	sub,
	sup,
	variable,
	wbr,
] = defElements([
	"cite",
	"code",
	"dfn",
	"em",
	"i",
	"kbd",
	"mark",
	"small",
	"span",
	"s",
	"strong",
	"sub",
	"sup",
	"var",
	"wbr",
]);

export interface EditAttribs extends Attribs {
	cite: StringAttrib;
	datetime: StringAttrib;
}

export const [del, ins] = defElements<Partial<EditAttribs>>(["del", "ins"]);
