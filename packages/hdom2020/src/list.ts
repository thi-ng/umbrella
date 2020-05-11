import type { Fn, Predicate2 } from "@thi.ng/api";
import { diffArray, DiffMode } from "@thi.ng/diff";
import { equiv as _equiv } from "@thi.ng/equiv";
import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState } from "./api";
import { $move } from "./dom";
import { $compile } from "./element";
import { withStream } from "./with-stream";

export const $list = <T>(
    src: ISubscribable<T[]>,
    tag: string,
    attribs: any,
    childCtor: Fn<T, any>,
    equiv?: Predicate2<T>
) => withStream<T[]>(src, new List<T>(tag, attribs, childCtor, equiv));

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
        if (curr) {
            const root = this.root!.el!;
            const children = this.children!;
            const edits = diffArray(
                this.items,
                curr,
                DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES,
                this.equiv
            ).linear!;
            let offset = 0;
            console.log(curr.length);
            for (let i = 0, n = edits.length; i < n; i += 3) {
                if (edits[i] < 0) {
                    const idx = <number>edits[i + 1] + offset;
                    children[idx].unmount();
                    children.splice(idx, 1);
                    offset--;
                } else if (edits[i] > 0) {
                    const child = $compile(this.childCtor(<T>edits[i + 2]));
                    const el = await child.mount(root);
                    $move(el, root, <number>edits[i + 1]);
                    children.splice(<number>edits[i + 1], 0, child);
                    offset++;
                }
            }
            this.items = curr;
        }
    }
}
