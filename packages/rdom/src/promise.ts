import type { Fn } from "@thi.ng/api";
import type { ComponentLike, IComponent, NumOrElement } from "./api.js";
import { Component } from "./component.js";

/**
 * Simple component wrapper for {@link ComponentLike} promises. When this
 * component mounts it will `await` the given promise or if it fails, compile
 * the result of the given (optional) `error` handler as component body.
 *
 * @example
 * ```ts
 * const prom = Promise.resolve<ComponentLike>(
 *   ["div", {}, "Resolved!"]
 * );
 *
 * $promise(prom).mount(document.body);
 * ```
 *
 * @param prom -
 * @param error -
 */
export const $promise = (
    prom: Promise<ComponentLike>,
    error?: Fn<Error, any>
) => new $Promise(prom, error);

export class $Promise extends Component {
    inner?: IComponent;

    constructor(
        protected promise: Promise<ComponentLike>,
        protected error: Fn<Error, any> = (e) => e
    ) {
        super();
    }

    async mount(parent: Element, index: NumOrElement) {
        try {
            this.inner = this.$compile(await this.promise);
        } catch (e) {
            this.inner = this.$compile(this.error(<Error>e));
        }
        return (this.el = await this.inner.mount(parent, index));
    }

    async unmount() {
        await this.inner!.unmount();
        this.inner = undefined;
        this.el = undefined;
    }
}
