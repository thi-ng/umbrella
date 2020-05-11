import type { ISubscribable } from "@thi.ng/rstream";
import type { IComponent } from "./api";
import { Component } from "./component";
import { $compile } from "./element";
import { SCHEDULER } from "./scheduler";

export const fromStream = (src: ISubscribable<any>) => new FromStream(src);

class FromStream extends Component {
    protected sub?: ISubscribable<any>;
    protected inner?: IComponent;
    protected parent?: Element;

    constructor(src: ISubscribable<any>) {
        super();
        this.sub = src.subscribe({
            next: (x) =>
                SCHEDULER.add(this, () => this.inner && this.update(x)),
        });
    }

    async mount(parent: Element) {
        this.parent = parent;
        this.inner = $compile(this.sub!.deref());
        return (this.el = await this.inner.mount(parent));
    }

    async unmount() {
        SCHEDULER.cancel(this);
        await this.inner!.unmount();
        this.sub!.unsubscribe();
        this.sub = undefined;
        this.inner = undefined;
        this.parent = undefined;
        this.el = undefined;
    }

    async update(tree: any) {
        const inner = this.inner;
        if (inner) {
            this.inner = undefined;
            await inner.unmount();
        }
        this.inner = $compile(tree);
        this.el = await this.inner.mount(this.parent!);
    }
}
