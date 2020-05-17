import type { Fn, Predicate2 } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState } from "./api";
import { $compile } from "./compile";
import { $move } from "./dom";
import { $sub } from "./sub";

export const $list = <T>(
    src: ISubscribable<T[]>,
    tag: string,
    attribs: any,
    childCtor: Fn<T, any>,
    equiv?: Predicate2<T>
) => $sub<T[]>(src, new List<T>(tag, attribs, childCtor, equiv));

export class List<T> implements IMountWithState<T[]> {
    el?: Element;
    items?: T[];
    root?: IComponent;
    children?: IComponent[];

    constructor(
        protected tag: string,
        protected attribs: any,
        protected childCtor: Fn<T, IComponent>,
        protected equiv: Predicate2<T> = _equiv
    ) {}

    async mount(parent: Element, state: T[]) {
        this.items = [];
        this.children = [];
        this.root = $compile([this.tag, this.attribs]);
        this.el = await this.root.mount(parent);
        this.update(state);
        return this.el;
    }

    async unmount() {
        this.children!.forEach((c) => c.unmount());
        this.root!.unmount();
        this.el = undefined;
        this.children = undefined;
        this.items = undefined;
        this.root = undefined;
    }

    async update(curr: T[]) {
        if (!curr) return;
        const root = this.root!.el!;
        const ctor = this.childCtor;
        const children = this.children!;
        const prev = this.items!;
        const nb = curr.length;
        let na = prev!.length;
        let n = Math.min(na, nb);
        for (let i = 0; i < n; i++) {
            if (prev[i] !== curr[i]) {
                await children[i].unmount();
                const val = curr[i];
                const child = $compile(ctor(val));
                $move(await child.mount(root), root, i);
                children[i] = child;
                prev[i] = val;
            }
        }
        if (na < nb) {
            for (; n < nb; n++) {
                const val = curr[n];
                const child = $compile(ctor(val));
                child.mount(root);
                children[n] = child;
                prev[n] = val;
            }
        } else {
            while (--na >= nb) {
                children[na].unmount();
                children.pop();
                prev.pop();
            }
        }
    }
}
