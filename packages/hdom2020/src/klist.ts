import type { Fn, Fn2, NumOrString } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, NumOrElement } from "./api";
import { $compile } from "./compile";
import { Component } from "./component";
import { $move } from "./dom";
import { $sub } from "./sub";

interface Child {
    key: NumOrString;
    component: IComponent;
}

export const $klist = <T>(
    src: ISubscribable<T[]>,
    tag: string,
    attribs: any,
    childCtor: Fn<T, any>,
    keyFn?: Fn2<T, number, NumOrString>
) => $sub<T[]>(src, new KList<T>(tag, attribs, childCtor, keyFn));

export class KList<T> extends Component<T[]> {
    children?: Child[] = [];
    cache?: Map<NumOrString, Child>;
    root?: IComponent;

    constructor(
        protected tag: string,
        protected attribs: any,
        protected ctor: Fn<T, any>,
        protected keyFn: Fn2<T, number, NumOrString> = (_, i) => i
    ) {
        super();
    }

    async mount(parent: Element, index: NumOrElement, state: T[]) {
        this.children = [];
        this.cache = new Map();
        this.root = $compile([this.tag, this.attribs]);
        this.el = await this.root.mount(parent, index);
        this.update(state);
        return this.el!;
    }

    async unmount() {
        this.children!.forEach((c) => c.component.unmount());
        this.root!.unmount();
        this.el = undefined;
        this.children = undefined;
        this.cache = undefined;
        this.root = undefined;
    }

    async update(curr: T[]) {
        if (!curr) return;
        const { keyFn, children, ctor, cache } = this;
        const root = this.root!.el!;
        const currChildren: Child[] = [];
        const currCache = new Map<NumOrString, Child>();
        const offsets = new Map<NumOrString, number>();
        const deltas = new Map<NumOrString, number>();
        let numPrev = children!.length;
        let numCurr = curr.length;

        let i: number;
        for (i = numPrev; --i >= 0; ) {
            offsets.set(children![i].key, i);
        }
        for (i = numCurr; --i >= 0; ) {
            const val = curr[i];
            const key = keyFn(val, i);
            let child = cache!.get(key);
            child
                ? child.component.update(val) // TODO obsolete?
                : (child = {
                      key,
                      component: $compile(ctor(val)),
                  });
            currCache.set(key, (currChildren[i] = child));
            const off = offsets.get(key);
            off != undefined && deltas.set(key, Math.abs(i - off));
        }

        const willMove = new Set<NumOrString>();
        const didMove = new Set<NumOrString>();
        let next: Element;

        const insert = async (child: Child) => {
            if (cache!.has(child.key)) {
                $move(child.component.el!, root, next);
                next = child.component.el!;
            } else {
                const el = await child.component.mount(root, next);
                cache!.set(child.key, child);
                next = el;
            }
            numCurr--;
        };

        while (numPrev && numCurr) {
            const prevChild = children![numPrev - 1];
            const currChild = currChildren[numCurr - 1];
            const prevKey = prevChild.key;
            const currKey = currChild.key;
            if (currChild === prevChild) {
                next = currChild.component.el!;
                numPrev--;
                numCurr--;
            } else if (!currCache.has(prevKey)) {
                await prevChild.component.unmount();
                cache!.delete(prevKey);
                numPrev--;
            } else if (!cache!.has(currKey) || willMove.has(currKey)) {
                await insert(currChild);
            } else if (didMove.has(prevKey)) {
                numPrev--;
            } else if (deltas.get(currKey)! > deltas.get(prevKey)!) {
                await insert(currChild);
                didMove.add(currKey);
            } else {
                willMove.add(prevKey);
                numPrev--;
            }
        }

        while (numPrev--) {
            const child = children![numPrev];
            if (!currCache.has(child.key)) {
                await child.component.unmount();
                cache!.delete(child.key);
            }
        }

        while (numCurr) {
            await insert(currChildren[numCurr - 1]);
        }

        this.children = currChildren;
    }
}
