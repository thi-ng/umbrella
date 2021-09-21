import type { IToHiccup } from "@thi.ng/api";
import { deref } from "@thi.ng/api/deref";
import { isFunction } from "@thi.ng/checks/is-function";
import type { ANode } from "./anode";

/**
 * `IToHiccup` implementation Node2D/3D
 *
 * @param node
 * @param ctx
 *
 * @internal
 */
export const toHiccup = <T extends ANode<T> & IToHiccup>(
    node: T,
    ctx?: any
) => {
    const body = isFunction(node.body) ? node.body(ctx) : deref(node.body);
    return node.enabled && node.display
        ? node.children.length
            ? [
                  "g",
                  {},
                  node.body ? ["g", { transform: node.mat }, body] : undefined,
                  ...node.children.map((c) => c.toHiccup(ctx)),
              ]
            : body
            ? ["g", { transform: node.mat }, body]
            : undefined
        : undefined;
};
