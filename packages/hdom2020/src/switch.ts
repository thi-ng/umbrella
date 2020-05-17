import { assert, Fn } from "@thi.ng/api";
import { ISubscribable } from "@thi.ng/rstream";
import type { IComponent, IMountWithState } from "./api";
import { $compile } from "./compile";
import { Component } from "./component";
import { withStream } from "./with-stream";

export const $switch = <T>(
    src: ISubscribable<T>,
    ctors: Record<string, Fn<T, Promise<any>>>,
    keyFn: Fn<T, string>,
    loader?: IComponent
) => withStream<T>(src, new Switch<T>(ctors, keyFn, loader));

export class Switch<T> extends Component implements IMountWithState<T> {
    protected val?: T;
    protected parent?: Element;
    protected inner?: IComponent<T>;

    constructor(
        protected ctors: Record<string, Fn<T, Promise<any>>>,
        protected keyFn: Fn<T, string>,
        protected loader?: IComponent
    ) {
        super();
    }

    async mount(parent: Element, val: T) {
        this.parent = parent;
        await this.update(val);
        return this.inner!.el!;
    }

    async unmount() {
        this.inner && (await this.inner!.unmount());
        this.val = undefined;
        this.parent = undefined;
        this.inner = undefined;
    }

    async update(val: T) {
        this.inner && (await this.inner.unmount());
        if (val != null && val !== this.val) {
            this.val = val;
            this.loader && (await this.loader.mount(this.parent!));
            const key = this.keyFn(val);
            const next = this.ctors[key];
            assert(!!next, `no component registered for key: ${key}`);
            this.inner = $compile(await next(val));
            this.loader && (await this.loader.unmount());
        } else {
            this.loader && (this.inner = this.loader);
        }
        this.inner && (await this.inner.mount(this.parent!));
    }
}
