import type { Fn2 } from "@thi.ng/api";
import type { IMountWithState, NumOrElement } from "./api";
import { $el, $html, $remove, $text } from "./dom";
import { SCHEDULER } from "./scheduler";

const wrapper = <T>(update: Fn2<HTMLElement, T, void>) => (
    tag: string,
    attribs?: any,
    body?: T
): IMountWithState<T> => ({
    el: undefined,

    async mount(parent: Element, index: NumOrElement, state: T) {
        this.el = $el(tag, attribs, null, parent, index);
        update(<any>this.el!, state != null ? state : body!);
        return this.el;
    },

    async unmount() {
        $remove(this.el!);
        this.el = undefined;
    },

    update(body: T) {
        SCHEDULER.add(this, () => this.el && update(<any>this.el!, body));
    },
});

export const $wrapText = wrapper($text);

export const $wrapHtml = wrapper($html);
