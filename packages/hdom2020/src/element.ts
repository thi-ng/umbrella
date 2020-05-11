import type { Fn2 } from "@thi.ng/api";
import { isArray, isFunction, isPlainObject } from "@thi.ng/checks";
import { setInUnsafe } from "@thi.ng/paths";
import { ISubscribable, Subscription } from "@thi.ng/rstream";
import type { CompiledComponent, IComponent } from "./api";
import { $attribs, $body, $el, $removeChild } from "./dom";
import { SCHEDULER } from "./scheduler";
import { isComponent, isSubscribable } from "./utils";

export const $wrappedEl = <T>(
    tag: string,
    attribs?: any,
    body?: T
): IComponent<T> => ({
    el: undefined,
    async mount(parent: Element) {
        return (this.el = $el(tag, attribs, body, parent));
    },
    async unmount() {
        $removeChild(this.el!);
        this.el = undefined;
    },
    update(body: T) {
        $body(<any>this.el!, body);
    },
});

export const $sub = (src: ISubscribable<any>, tag: string, attribs?: any) =>
    <$Sub>src.subscribe(new $Sub(tag, attribs));

class $Sub extends Subscription<any, any> {
    el?: Element;

    constructor(protected tag: string, protected attribs?: any) {
        super();
    }

    async mount(parent: Element) {
        return (this.el = $el(
            this.tag,
            this.attribs,
            this.parent!.deref(),
            parent
        ));
    }

    async unmount() {
        this.unsubscribe();
        SCHEDULER.cancel(this);
        $removeChild(this.el!);
        this.el = undefined;
    }

    update() {}

    next(x: any) {
        SCHEDULER.add(this, () => this.el && $body(<any>this.el!, x));
    }
}

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
                    if (isSubscribable(x)) {
                        this.subs!.push(
                            x.subscribe({
                                next: (a) =>
                                    SCHEDULER.add(
                                        this,
                                        () =>
                                            this.el &&
                                            $attribs(
                                                this.el,
                                                setInUnsafe({}, path, a)
                                            )
                                    ),
                            })
                        );
                    }
                }, tree[1]);
                this.children = [];
                this.el = $el(tag, tree[1], null, parent);
                for (let i = 2; i < tree.length; i++) {
                    const child = $compile(tree[i]);
                    this.children.push(child);
                    child.mount(this.el);
                }
                return this.el;
            },

            async unmount() {
                SCHEDULER.cancel(this);
                this.children && this.children.forEach((c) => c.unmount());
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
    return $wrappedEl("span", null, tree);
};

const walk = (f: Fn2<any, any, void>, x: any, path: string[] = []) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            walk(f, (<any>x)[k], [...path, k]);
        }
    }
    f(x, path);
};
