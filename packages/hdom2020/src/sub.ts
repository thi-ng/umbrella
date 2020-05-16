import { ISubscribable, Subscription } from "@thi.ng/rstream";
import { $body, $el, $removeChild } from "./dom";
import { SCHEDULER } from "./scheduler";

export const $sub = (src: ISubscribable<any>, tag: string, attribs?: any) =>
    <$Sub>src.subscribe(new $Sub(tag, attribs));

class $Sub extends Subscription<any, any> {
    el?: Element;

    constructor(protected tag: string, protected attribs?: any) {
        super();
    }

    async mount(parent: Element) {
        return (this.el = $el(
            this.tag,
            this.attribs,
            this.parent!.deref(),
            parent
        ));
    }

    async unmount() {
        this.unsubscribe();
        SCHEDULER.cancel(this);
        $removeChild(this.el!);
        this.el = undefined;
    }

    update() {}

    next(x: any) {
        SCHEDULER.add(this, () => this.el && $body(<any>this.el!, x));
    }
}
