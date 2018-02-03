import { diffElement, normalizeTree } from "./diff";

/**
 * Takes a parent DOM element (or ID) and hiccup tree
 * (array or function) and starts RAF update loop,
 * computing diff to previous frame's tree and applying
 * any changes to the real DOM.
 *
 * Important: The parent element given is assumed to have NO
 * children at the time when `start()` is called. Since
 * hiccup-dom does NOT track the real DOM, the resulting
 * changes will result in potentially undefined behavior.
 *
 * Returns a function, which when called, immediately
 * cancels the update loop.
 *
 * @param parent
 * @param tree
 */
export function start(parent: Element, tree: any) {
    let prev = [];
    let isActive = true;
    function update() {
        if (isActive) {
            diffElement(parent, prev, prev = normalizeTree(tree));
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
    return () => (isActive = false);
}
