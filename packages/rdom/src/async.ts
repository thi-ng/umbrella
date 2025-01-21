// SPDX-License-Identifier: Apache-2.0
import type { Maybe, Path } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { defSetterUnsafe } from "@thi.ng/paths/setter";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $attribs } from "./dom.js";
import { $wrapText } from "./wrap.js";

/**
 * Takes an ES `AsyncIterable` and creates a simple component wrapper for its
 * asynchronously produced values.
 *
 * @remarks
 * If given an {@link IMountWithState} component, new values are applied via the
 * `.update()` life cycle value. If given a `tag` and `attribs`, a corresponding
 * element wrapper component will be created automatically (using
 * {@link $wrapText} and incoming values will be applied using {@link $text}
 * (aka setting `el.innerText`).
 *
 * @example
 * ```ts
 * import { $async } from "@thi.ng/rdom";
 * import { range } from "@thi.ng/transducers-async";
 *
 * // infinite 1Hz counter
 * const counter = range(1000);
 *
 * // wrapper component which updates whenever counter produces new values
 * $async(counter, "div", { class: "red" }).mount(document.body);
 * ```
 *
 * @param src -
 * @param inner -
 */
export function $async<T>(
	src: AsyncIterable<T>,
	inner: IMountWithState<T>
): IComponent<T>;
export function $async(
	src: AsyncIterable<any>,
	tag: string,
	attribs?: any
): IComponent;
export function $async(
	src: AsyncIterable<any>,
	tag: IMountWithState<any> | string,
	attribs?: any
): IComponent {
	return new $Async(src, isString(tag) ? $wrapText(tag, attribs) : tag);
}

export class $Async<T = any> {
	el?: Element;

	constructor(
		protected src: AsyncIterable<T>,
		protected inner: IMountWithState<Maybe<T>>
	) {}

	async mount(parent: ParentNode, index: NumOrElement = -1) {
		this.el = await this.inner.mount(parent, index, undefined);
		(async () => {
			for await (let x of this.src) {
				if (!this.el) return;
				this.update(x);
			}
		})();
		return this.el;
	}

	async unmount() {
		this.el = undefined;
		await this.inner.unmount();
	}

	update(x: T) {
		if (this.el) this.inner.update(x);
	}
}

export const $asyncA = async (
	src: AsyncIterable<any>,
	comp: IComponent,
	path: Path
) => {
	const attribs: any = {};
	const setter = defSetterUnsafe(path);
	for await (let x of src) {
		if (comp.el) $attribs(comp.el, setter(attribs, x));
	}
};
