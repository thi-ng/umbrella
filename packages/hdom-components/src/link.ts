import { isString } from "@thi.ng/checks/is-string";

export const link = (attribs: any, body: any) =>
    ["a", isString(attribs) ? { href: attribs } : attribs, body];

export const appLink = (attribs: any, body: any, onclick: (e: Event) => void) =>
    link(
        {
            ...attribs,
            href: "#",
            onclick: (e) => { e.preventDefault(); onclick(e); }
        },
        body);
