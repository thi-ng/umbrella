import { isString } from "@thi.ng/checks";
import { ISubscribable, Subscription } from "@thi.ng/rstream";
import { IComponent, IMountWithState } from "./api";
import { SCHEDULER } from "./scheduler";
import { $wrap } from "./wrap";

export function $sub<T>(
    src: ISubscribable<T>,
    inner: IMountWithState<T>
): IComponent<T>;
export function $sub(
    src: ISubscribable<any>,
    tag: string,
    attribs?: any
): IComponent;
export function $sub(
    src: ISubscribable<any>,
    tag: IMountWithState<any> | string,
    attribs?: any
): IComponent {
    return isString(tag)
        ? <$Sub>src.subscribe(new $Sub($wrap(tag, attribs)))
        : <$Sub>src.subscribe(new $Sub(tag));
}

export class $Sub<T = any> extends Subscription<T, T> {
    el?: Element;

    constructor(protected inner: IMountWithState<T | undefined>) {
        super();
    }

    async mount(parent: Element) {
        return (this.el = await this.inner.mount(parent, this.parent!.deref()));
    }

    async unmount() {
        this.unsubscribe();
        SCHEDULER.cancel(this);
        this.el = undefined;
        await this.inner.unmount();
    }

    update(x: T) {
        this.next(x);
    }

    next(x: T) {
        SCHEDULER.add(this, () => this.el && this.inner.update(x));
    }
}
