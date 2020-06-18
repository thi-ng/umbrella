import type { Fn2 } from "@thi.ng/api";
import type { IMountWithState } from "./api";
import { $el, $html, $removeChild, $text } from "./dom";
import { SCHEDULER } from "./scheduler";

const wrapper = <T>(update: Fn2<HTMLElement, T, void>) => (
    tag: string,
    attribs?: any,
    body?: T
): IMountWithState<T> => ({
    el: undefined,

    async mount(parent: Element, state: T) {
        this.el = $el(tag, attribs, null, parent);
        update(<any>this.el!, state != null ? state : body!);
        return this.el;
    },

    async unmount() {
        $removeChild(this.el!);
        this.el = undefined;
    },

    update(body: T) {
        SCHEDULER.add(this, () => this.el && update(<any>this.el!, body));
    },
});

export const $wrapText = wrapper($text);

export const $wrapHtml = wrapper($html);
