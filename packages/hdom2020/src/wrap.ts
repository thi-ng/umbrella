import type { IMountWithState } from "./api";
import { $body, $el, $removeChild } from "./dom";

export const $wrap = <T>(
    tag: string,
    attribs?: any,
    body?: T
): IMountWithState<T> => ({
    el: undefined,
    async mount(parent: Element, state: T) {
        return (this.el = $el(
            tag,
            attribs,
            state != null ? state : body,
            parent
        ));
    },
    async unmount() {
        $removeChild(this.el!);
        this.el = undefined;
    },
    update(body: T) {
        $body(<any>this.el!, body);
    },
});
