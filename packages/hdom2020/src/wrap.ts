import type { IComponent } from "./api";
import { $body, $el, $removeChild } from "./dom";

export const $wrap = <T>(
    tag: string,
    attribs?: any,
    body?: T
): IComponent<T> => ({
    el: undefined,
    async mount(parent: Element) {
        return (this.el = $el(tag, attribs, body, parent));
    },
    async unmount() {
        $removeChild(this.el!);
        this.el = undefined;
    },
    update(body: T) {
        $body(<any>this.el!, body);
    },
});
