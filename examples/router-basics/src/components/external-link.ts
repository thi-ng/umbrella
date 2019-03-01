import { AppContext } from "../api";

/**
 * User stylable external link component.
 *
 * @param ctx injected context object
 * @param attribs user provided attribs
 * @param uri link target
 * @param body link body
 */
export function externalLink(
    _: AppContext,
    attribs: any,
    uri: string,
    body: any
) {
    return ["a", { ...attribs, href: uri }, body];
}
