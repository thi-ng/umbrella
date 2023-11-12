import { implementsFunction } from "@thi.ng/checks/implements-function";
import { COMMENT } from "@thi.ng/hiccup/api";
import type { IComponent } from "./api.js";

/**
 * Returns true if given hiccup component describes a comment node. I.e. is of
 * the form `[COMMENT, "foo"...]`.
 *
 * @remarks
 * See thi.ng/hiccup docs for reference:
 * - https://docs.thi.ng/umbrella/hiccup/functions/serialize.html
 *
 * @param tree
 */
export const isComment = (tree: any[]) => tree[0] === COMMENT;

/**
 * Returns true if given value has a {@link IComponent.mount} function.
 *
 * @param x
 */
export const isComponent = (x: any): x is IComponent<any> =>
	implementsFunction(x, "mount");

/**
 * Returns true if given value is a DOM element.
 *
 * @param x
 */
export const isElement = (x: any): x is Element => x instanceof Element;
