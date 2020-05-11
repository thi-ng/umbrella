import type { ISubscribable } from "@thi.ng/rstream";
import type { IMountWithState } from "./api";
import { Component } from "./component";
import { SCHEDULER } from "./scheduler";

export const withStream = <T>(
    src: ISubscribable<T>,
    inner: IMountWithState<T>
) => new WithStream<T>(src, inner);

export class WithStream<T> extends Component {
    sub: ISubscribable<T>;

    constructor(
        protected src: ISubscribable<T>,
        protected inner: IMountWithState<T | undefined>
    ) {
        super();
        this.sub = src.subscribe({
            next: (x) =>
                SCHEDULER.add(this, () => this.el && this.inner.update(x)),
        });
    }

    async mount(parent: Element) {
        return (this.el = await this.inner.mount(parent, this.sub.deref()));
    }

    async unmount() {
        SCHEDULER.cancel(this);
        await this.inner.unmount();
        this.sub.unsubscribe();
        this.el = undefined;
    }
}
