import { isString } from "@thi.ng/checks/is-string";
import { diffElement } from "./diff";
import { normalizeTree } from "./normalize";

/**
 * Takes a parent DOM element (or ID), hiccup tree (array, function or
 * component object w/ lifecycle methods) and an optional context
 * object. Starts RAF update loop, computing diff to previous frame's
 * tree and applying any changes to the real DOM.
 *
 * The optional `context` arg can be used for passing global config data
 * or state down into the hiccup component tree. Any embedded component
 * function in the tree will receive this context object as first
 * argument, as will life cycle methods in component objects.
 *
 * **Selective updates**: No updates will be applied if the given hiccup
 * tree is `undefined` or `null` or a root component function returns no
 * value. This way a given root function can do some state handling of
 * its own and implement fail-fast checks to determine no DOM updates
 * are necessary, save effort re-creating a new hiccup tree and request
 * skipping DOM updates via this function. In this case, the previous
 * DOM tree is kept around until the root function returns a tree again,
 * which then is diffed and applied against the previous tree kept as
 * usual. Any number of frames may be skipped this way.
 *
 * Important: The parent element given is assumed to have NO children at
 * the time when `start()` is called. Since hdom does NOT track the real
 * DOM, the resulting changes will result in potentially undefined
 * behavior if the parent element wasn't empty.
 *
 * Returns a function, which when called, immediately cancels the update
 * loop.
 *
 * @param parent root element or ID
 * @param tree hiccup DOM tree
 * @param ctx arbitrary user context object
 * @param spans true (default), if text should be wrapped in `<span>`
 */
export function start(parent: Element | string, tree: any, ctx?: any, spans = true) {
    let prev = [];
    let isActive = true;
    parent = isString(parent) ?
        document.getElementById(parent) :
        parent;
    function update() {
        if (isActive) {
            const curr = normalizeTree(tree, ctx, [0], true, spans);
            if (curr != null) {
                diffElement(<Element>parent, prev, curr);
                prev = curr;
            }
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
    return () => (isActive = false);
}
