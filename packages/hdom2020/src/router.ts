import type { Fn } from "@thi.ng/api";
import type { IComponent, IMountWithState } from "./api";
import { Component } from "./component";

export class Router<T> extends Component implements IMountWithState<T> {
    protected route!: T;
    protected inner!: IMountWithState<T>;
    protected parent!: Element;

    constructor(
        protected routes: Record<string, () => Promise<IMountWithState<T>>>,
        protected keyFn: Fn<T, string>,
        protected loader?: IComponent
    ) {
        super();
    }

    async mount(parent: Element, route: T) {
        this.parent = parent;
        await this.update(route);
        return this.inner.el!;
    }

    async unmount() {
        this.inner.unmount();
    }

    async update(route: T) {
        if (this.inner) {
            await this.inner.unmount();
        }
        if (route && route != this.route) {
            this.route = route;
            this.loader && this.loader.mount(this.parent);
            this.inner = await this.routes[this.keyFn(route)]();
            this.loader && this.loader.unmount();
        } else {
            this.loader && (this.inner = this.loader);
        }
        await this.inner.mount(this.parent, route);
    }
}
