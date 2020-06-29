import type { Path } from "@thi.ng/api";
import { defCursorUnsafe, IAtom } from "@thi.ng/atom";
import { Component, NumOrElement, SCHEDULER } from "@thi.ng/rdom";
import type { IMountWithAtom } from "./api";

export const $atom = <T>(src: IAtom<T>, path: Path, inner: IMountWithAtom<T>) =>
    new $Atom<T>(src, path, inner);

export class $Atom<T> extends Component<IAtom<T>> {
    state: IAtom<T>;

    constructor(src: IAtom<T>, path: Path, protected inner: IMountWithAtom<T>) {
        super();
        this.state = defCursorUnsafe<T>(src, path);
        this.state.addWatch(`__${(Math.random() * 1e6) | 0}`, (_, a, b) => {
            a !== b && SCHEDULER.add(this, () => this.inner.update(b));
        });
    }

    async mount(parent: Element, index: NumOrElement = -1) {
        return (this.el = await this.inner.mount(parent, index, this.state));
    }

    async unmount() {
        SCHEDULER.cancel(this);
        await this.inner.unmount();
        this.state.release();
        this.el = undefined;
    }
}
