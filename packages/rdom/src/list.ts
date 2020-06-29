import type { Fn, Predicate2 } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState, NumOrElement } from "./api";
import { $compile } from "./compile";
import { Component } from "./component";
import { $sub } from "./sub";

export const $list = <T>(
    src: ISubscribable<T[]>,
    tag: string,
    attribs: any,
    ctor: Fn<T, any>,
    equiv?: Predicate2<T>
) => $sub<T[]>(src, new List<T>(tag, attribs, ctor, equiv));

export class List<T> extends Component implements IMountWithState<T[]> {
    prev?: T[];
    items?: IComponent[];

    constructor(
        protected tag: string,
        protected attribs: any,
        protected ctor: Fn<T, IComponent>,
        protected equiv: Predicate2<T> = (a, b) => a === b
    ) {
        super();
    }

    async mount(parent: Element, index: NumOrElement, state: T[]) {
        this.prev = [];
        this.items = [];
        this.el = this.$el(this.tag, this.attribs, null, parent, index);
        this.update(state);
        return this.el;
    }

    async unmount() {
        this.items!.forEach((c) => c.unmount());
        this.$remove();
        this.el = undefined;
        this.items = undefined;
        this.prev = undefined;
    }

    async update(curr: T[]) {
        if (!curr) return;
        const { ctor, equiv, items, prev, el: parent } = this;
        const nb = curr.length;
        let na = prev!.length;
        let n = Math.min(na, nb);
        for (let i = 0; i < n; i++) {
            if (!equiv(prev![i], curr[i])) {
                await items![i].unmount();
                const val = curr[i];
                const child = $compile(ctor(val));
                await child.mount(parent!, i);
                items![i] = child;
                prev![i] = val;
            }
        }
        if (na < nb) {
            for (; n < nb; n++) {
                const val = curr[n];
                const child = $compile(ctor(val));
                await child.mount(parent!, -1);
                items![n] = child;
                prev![n] = val;
            }
        } else {
            while (--na >= nb) {
                await items![na].unmount();
                items!.pop();
                prev!.pop();
            }
        }
    }
}
