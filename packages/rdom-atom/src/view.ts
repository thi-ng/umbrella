import type { Path } from "@thi.ng/api";
import { defViewUnsafe, IAtom, IView } from "@thi.ng/atom";
import {
    Component,
    IMountWithState,
    NumOrElement,
    SCHEDULER,
} from "@thi.ng/rdom";

export const $view = <T>(
    src: IAtom<any>,
    path: Path,
    inner: IMountWithState<T>
) => new $View<T>(src, path, inner);

export class $View<T> extends Component {
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

    async mount(parent: Element, index: NumOrElement = -1) {
        return (this.el = await this.inner.mount(
            parent,
            index,
            this.view.deref()!
        ));
    }

    async unmount() {
        SCHEDULER.cancel(this);
        await this.inner.unmount();
        this.view.release();
        this.el = undefined;
    }
}
