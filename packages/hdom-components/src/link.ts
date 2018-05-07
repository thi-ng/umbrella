import { isString } from "@thi.ng/checks/is-string";

export const link = (attribs: any, body: any) =>
    ["a", isString(attribs) ? { href: attribs } : attribs, body];

export const appLink = (_, attribs: any, onclick: EventListener, body: any) =>
    ["a",
        {
            href: "#",
            onclick: (e) => { e.preventDefault(); onclick(e); },
            ...attribs,
        },
        body];
