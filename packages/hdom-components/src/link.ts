import { isString } from "@thi.ng/checks/is-string";

export const link = (attribs: any, body: any) => [
	"a",
	isString(attribs) ? { href: attribs } : attribs,
	body,
];

export const appLink = (
	_: any,
	attribs: any,
	onclick: EventListener,
	body: any
) => [
	"a",
	{
		href: "#",
		onclick: (e: Event) => {
			e.preventDefault();
			onclick(e);
		},
		...attribs,
	},
	body,
];
