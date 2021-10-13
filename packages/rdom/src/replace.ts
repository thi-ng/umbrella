import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $compile } from "./compile.js";
import { Component } from "./component.js";
import { $sub } from "./sub.js";
import { $wrapText } from "./wrap.js";

/**
 * Similar to {@link $refresh}, but more basic/simple. Takes a reactive value
 * `src` and wraps it in a {@link $sub} component using an inner
 * {@link Replace}, which then passes the value to {@link $compile} for each
 * change and replaces the result in the target DOM. If the value evaluates to
 * `null`ish, the previously mounted component will be unmounted and stays so
 * until the value becomes non-null again.
 *
 * @remarks
 * If the reactive value is null-ish when the wrapper component is first
 * mounted, a hidden dummy `<span>` element will be created instead. This is to
 * ensure the general {@link IComponent.mount} contract will not be broken. The
 * dummy element will later be removed/replaced as soon as the reactive value
 * becomes non-null.
 *
 * @example
 * ```ts
 * import { $compile, $replace } from "@thi.ng/rdom";
 * import { fromInterval } from "@thi.ng/rstream";
 *
 * // reactive counter component
 * const counter = fromInterval(16).map((x) => [
 *     "div",
 *     { style: { "font-size": `${(x % 100) + 10}px` } },
 *     x,
 * ]);
 *
 * $compile($replace(counter)).mount(document.body);
 * ```
 *
 * @param src
 */
export const $replace = <T>(src: ISubscribable<T>) =>
    $sub(src, new Replace<T>());

export class Replace<T> extends Component implements IMountWithState<T> {
    protected parent?: Element;
    protected inner?: IComponent<T>;
    protected index?: NumOrElement;

    async mount(parent: Element, index: NumOrElement, val: T) {
        this.parent = parent;
        this.index = index;
        await this.update(val);
        if (!this.inner) {
            this.inner = $wrapText("span", { hidden: true });
            await this.inner.mount(parent, index);
        }
        return this.inner!.el!;
    }

    async unmount() {
        this.inner && (await this.inner!.unmount());
        this.parent = undefined;
        this.inner = undefined;
    }

    async update(val: T) {
        this.inner && (await this.inner.unmount());
        this.inner = undefined;
        if (val != null) {
            this.inner = $compile(val);
            this.inner && (await this.inner.mount(this.parent!, this.index!));
        }
    }
}
