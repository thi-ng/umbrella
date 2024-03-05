import type { Fn2 } from "@thi.ng/api";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $addChild, $el, $html, $remove, $text } from "./dom.js";

const wrapper =
	<T>(update: Fn2<HTMLElement | SVGElement, T, void>) =>
	(tag: string, attribs?: any, body?: T): IMountWithState<T> => ({
		el: undefined,

		async mount(parent: ParentNode, index: NumOrElement, state: T) {
			this.el = $el(tag, attribs, null, parent, index);
			update(<any>this.el!, state != null ? state : body!);
			return this.el;
		},

		async unmount() {
			$remove(this.el!);
			this.el = undefined;
		},

		update(body: T) {
			if (this.el) update(<any>this.el, body);
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
 * @remarks
 * Setting `.innerHtml` considered dangerous — please use with caution or use
 * {@link $wrapText} if the source of the HTML body given to `.update()` cannot
 * be trusted!
 *
 * @example
 * ```ts
 * import { $compile, $wrapHtml } from "@thi.ng/rdom";
 *
 * // create pre-configured updatable element
 * const title = $wrapHtml("h1", { style: { color: "red" } });
 *
 * // embed inside rdom tree
 * $compile(["div", {}, title, "world..."]).mount(document.body);
 *
 * // update element body (only after element has been mounted!)
 * title.update("<em>hello</em>");
 * ```
 *
 * @param tag - element name
 * @param attribs - element attribs
 * @param body - optional initial body
 */
export const $wrapHtml = wrapper($html);

/**
 * {@link IComponent} wrapper for an existing DOM element. When mounted, the
 * given element will be (re)attached to the parent node provided at that time.
 *
 * @example
 * ```ts
 * import { $compile, $wrapEl } from "@thi.ng/rdom";
 *
 * const title = document.createElement("h1");
 * title.innerText = "hello";
 *
 * // embed existing DOM element inside an rdom tree
 * $compile(["div", {}, $wrapEl(title), "world..."]).mount(document.body);
 * ```
 *
 * @param el
 */
export const $wrapEl = (el: Element): IComponent => ({
	async mount(parent, idx) {
		$addChild(parent, el, idx);
		return (this.el = el);
	},
	async unmount() {
		$remove(this.el!);
		this.el = undefined;
	},
	update() {},
});
