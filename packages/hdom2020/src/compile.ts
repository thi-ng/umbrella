import type { Fn2 } from "@thi.ng/api";
import { isArray, isFunction, isPlainObject } from "@thi.ng/checks";
import type { CompiledComponent, IComponent } from "./api";
import { $el, $removeChild } from "./dom";
import { SCHEDULER } from "./scheduler";
import { $sub, $SubA } from "./sub";
import { isComponent, isSubscribable } from "./utils";
import { $wrap } from "./wrap";

export const $compile = (tree: any): IComponent => {
    if (isArray(tree)) {
        const tag = tree[0];
        if (isFunction(tag)) {
            return $compile(tag.apply(null, tree.slice(1)));
        }
        const el: CompiledComponent = {
            async mount(parent: Element) {
                this.subs = [];
                walk((x, path) => {
                    isSubscribable(x) &&
                        this.subs!.push(x.subscribe(new $SubA(this, path)));
                }, tree[1]);
                this.children = [];
                this.el = $el(tag, tree[1], null, parent);
                for (let i = 2; i < tree.length; i++) {
                    const child = $compile(tree[i]);
                    child.mount(this.el);
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
                $removeChild(this.el!);
                this.children = undefined;
                this.subs = undefined;
                this.el = undefined;
            },

            update() {},
        };
        return el;
    }
    if (isComponent(tree)) {
        return tree;
    }
    if (isSubscribable(tree)) {
        return $sub(tree, "span");
    }
    return $wrap("span", null, tree);
};

const walk = (f: Fn2<any, string[], void>, x: any, path: string[] = []) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            walk(f, (<any>x)[k], [...path, k]);
        }
    }
    f(x, path);
};
