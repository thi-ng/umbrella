import type { Fn, Keys } from "@thi.ng/api";
import { fromObject, StreamObj, StreamObjOpts } from "@thi.ng/rstream";
import type { ComponentLike, IComponent, NumOrElement } from "./api";
import { Component } from "./component";

export const $object = <T, K extends Keys<T>>(
    src: T,
    opts: Partial<StreamObjOpts<T, K>>,
    inner: Fn<StreamObj<T, K>["streams"], Promise<ComponentLike>>
) => new $Object(src, opts, inner);

export class $Object<T, K extends Keys<T>> extends Component {
    protected obj: StreamObj<T, K>;
    protected inner?: IComponent;

    constructor(
        src: T,
        opts: Partial<StreamObjOpts<T, K>>,
        protected ctor: Fn<StreamObj<T, K>["streams"], Promise<ComponentLike>>
    ) {
        super();
        this.obj = fromObject(src, opts);
    }

    async mount(parent: Element, index: NumOrElement = -1) {
        this.inner = this.$compile(await this.ctor(this.obj.streams));
        this.el = await this.inner.mount(parent, index);
        return this.el!;
    }

    async unmount() {
        this.obj.done();
        await this.inner!.unmount();
        this.el = undefined;
        this.inner = undefined;
    }

    update(state: T) {
        this.obj.next(state);
    }
}
