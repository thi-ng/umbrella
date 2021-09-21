import type { Fn2, NumOrString } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isSubscribable } from "@thi.ng/rstream/checks";
import type { CompiledComponent, IComponent, NumOrElement } from "./api";
import { isComponent } from "./checks";
import { $el, $remove, $tree } from "./dom";
import { SCHEDULER } from "./scheduler";
import { $sub, $SubA } from "./sub";
import { $wrapText } from "./wrap";

/**
 * Compiles a tree of components given in any supported format incl.
 * reactive state values into a single, nested {@link IComponent}.
 *
 * @remarks
 * Supported formats:
 *
 * - hiccup component trees, i.e. `["tag#id.class", attribs, [...]]`
 * - {@link IComponent} instances
 * - {@link @thi.ng/rstream#ISubscribable} instances
 * - {@link @thi.ng/api#IDeref} instances
 *
 * Any other value type will be wrapped in a `<span>` element. Reactive
 * `ISubscribable` values can be used as element attributes or element
 * body/children. For the former, a subscription will be added to update
 * the target attribute. If used as element body, the reactive value
 * will be wrapped using a {@link $sub} `<span>` with the value as its
 * reactive body.
 *
 * @param tree
 */
export const $compile = (tree: any): IComponent =>
    isArray(tree)
        ? isComplexComponent(tree)
            ? complexComponent(tree)
            : basicComponent(tree)
        : isComponent(tree)
        ? tree
        : isSubscribable(tree)
        ? $sub(tree, "span")
        : $wrapText("span", null, tree);

const walk = (
    f: Fn2<any, NumOrString[], void>,
    x: any,
    path: NumOrString[] = []
) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            walk(f, (<any>x)[k], [...path, k]);
        }
    }
    f(x, path);
};

const isComplexComponent = (x: any) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            if (isComplexComponent((<any>x)[k])) return true;
        }
    } else if (isArray(x)) {
        for (let i = 0, n = x.length; i < n; i++) {
            if (isComplexComponent(x[i])) return true;
        }
    }
    return isSubscribable(x) || isComponent(x);
};

const complexComponent = (tree: any[]): CompiledComponent => ({
    async mount(parent: Element, index: NumOrElement = -1) {
        this.subs = [];
        walk((x, path) => {
            isSubscribable(x) &&
                this.subs!.push(x.subscribe(new $SubA(this, path)));
        }, tree[1]);
        this.children = [];
        this.el = $el(tree[0], tree[1], null, parent, index);
        for (let i = 2; i < tree.length; i++) {
            const child = $compile(tree[i]);
            child.mount(this.el, i - 2);
            this.children.push(child);
        }
        return this.el;
    },
    async unmount() {
        SCHEDULER.cancel(this);
        if (this.children) {
            for (let c of this.children) {
                await c.unmount();
            }
        }
        this.subs && this.subs.forEach((s) => s.unsubscribe());
        $remove(this.el!);
        this.children = undefined;
        this.subs = undefined;
        this.el = undefined;
    },
    update() {},
});

const basicComponent = (tree: any): CompiledComponent => ({
    async mount(parent: Element, index: NumOrElement = -1) {
        return (this.el = await $tree(tree, parent, index));
    },
    async unmount() {
        $remove(this.el!);
        this.el = undefined;
    },
    update() {},
});
