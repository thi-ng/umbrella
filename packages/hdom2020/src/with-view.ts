import type { Path } from "@thi.ng/api";
import { defViewUnsafe } from "@thi.ng/atom";
import type { IAtom, IView } from "@thi.ng/atom";
import type { IMountWithState } from "./api";
import { Component } from "./component";
import { SCHEDULER } from "./scheduler";

export const withView = <T>(
    src: IAtom<any>,
    path: Path,
    inner: IMountWithState<T>
) => new WithView<T>(src, path, inner);

export class WithView<T> extends Component {
    view: IView<T>;

    constructor(
        src: IAtom<any>,
        path: Path,
        protected inner: IMountWithState<T | undefined>
    ) {
        super();
        this.view = defViewUnsafe<T>(
            src,
            path,
            (x) => (
                this.el && SCHEDULER.add(this, () => this.inner.update(x)), x
            ),
            false
        );
    }

    async mount(parent: Element) {
        return (this.el = await this.inner.mount(parent, this.view.deref()!));
    }

    async unmount() {
        SCHEDULER.cancel(this);
        await this.inner.unmount();
        this.view.release();
        this.el = undefined;
    }
}
