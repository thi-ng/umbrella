import type { Fn2 } from "@thi.ng/api";
import type { IMountWithState, NumOrElement } from "./api";
import { $el, $html, $remove, $text } from "./dom";
import { SCHEDULER } from "./scheduler";

const wrapper =
    <T>(update: Fn2<HTMLElement, T, void>) =>
    (tag: string, attribs?: any, body?: T): IMountWithState<T> => ({
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

/**
 * Returns a component wrapper for a single DOM element whose TEXT body can be
 * later updated/replaced via `.update()`, similarly to setting `.innerText`.
 *
 * @param tag - element name
 * @param attribs - element attribs
 * @param body - optional initial body
 */
export const $wrapText = wrapper($text);

/**
 * Returns a component wrapper for a single DOM element whose HTML body can be
 * later updated/replaced via `.update()`, similarly to setting `.innerHTML`.
 *
 * @param tag - element name
 * @param attribs - element attribs
 * @param body - optional initial body
 */
export const $wrapHtml = wrapper($html);
