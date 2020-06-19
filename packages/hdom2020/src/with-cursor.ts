import type { Path } from "@thi.ng/api";
import { defCursorUnsafe } from "@thi.ng/atom";
import type { IAtom } from "@thi.ng/atom";
import type { IMountWithAtom, NumOrElement } from "./api";
import { Component } from "./component";
import { SCHEDULER } from "./scheduler";

export const withCursor = <T>(
    src: IAtom<any>,
    path: Path,
    inner: IMountWithAtom<T>
) => new WithCursor<T>(src, path, inner);

export class WithCursor<T> extends Component<IAtom<T>> {
    state: IAtom<T>;

    constructor(
        src: IAtom<any>,
        path: Path,
        protected inner: IMountWithAtom<T>
    ) {
        super();
        this.state = defCursorUnsafe<T>(src, path);
        this.state.addWatch("_", (_, a, b) => {
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
