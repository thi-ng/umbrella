import { diffElement, normalizeTree } from "./diff";

export function start(parent, tree: any) {
    let prev = [];
    function update() {
        diffElement(parent, prev, prev = normalizeTree(tree));
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}
