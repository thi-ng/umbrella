import { isString } from "@thi.ng/checks/is-string";
import { diffElement } from "./diff";
import { normalizeTree } from "./normalize";

/**
 * Takes a parent DOM element (or ID) and hiccup tree
 * (array or function) and starts RAF update loop,
 * computing diff to previous frame's tree and applying
 * any changes to the real DOM.
 *
 * Important: The parent element given is assumed to have NO
 * children at the time when `start()` is called. Since
 * hdom does NOT track the real DOM, the resulting
 * changes will result in potentially undefined behavior
 * if the parent element wasn't empty.
 *
 * Returns a function, which when called, immediately
 * cancels the update loop.
 *
 * @param parent root element or ID
 * @param tree hiccup DOM tree
 * @param spans true (default), if text should be wrapped in `<span>`
 */
export function start(parent: Element | string, tree: any, spans = true) {
    let prev = [];
    let isActive = true;
    parent = isString(parent) ?
        document.getElementById(parent) :
        parent;
    function update() {
        if (isActive) {
            diffElement(<Element>parent, prev, prev = normalizeTree(tree, [0], true, spans));
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
    return () => (isActive = false);
}
