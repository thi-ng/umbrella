import type { Fn2, Path } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { defSetterUnsafe } from "@thi.ng/paths/setter";
import type { ISubscribable } from "@thi.ng/rstream";
import { __nextID } from "@thi.ng/rstream/idgen";
import { Subscription } from "@thi.ng/rstream/subscription";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $attribs } from "./dom.js";
import { $wrapText } from "./wrap.js";

/**
 * Takes an
 * [`ISubscribable`](https://docs.thi.ng/umbrella/rstream/interfaces/ISubscribable.html)
 * and creates a simple component wrapper for its reactively produced values.
 *
 * @remarks
 * If given an {@link IMountWithState} component, new stream values are applied
 * via the `.update()` life cycle value. If given a `tag` and `attribs`, a
 * corrresponding element wrapper component will be created automatically (using
 * {@link $wrapText} and stream values will be applied using {@link $text} (aka
 * setting `el.innerText`).
 *
 * @example
 * ```ts
 * import { $sub } from "@thi.ng/rdom";
 * import { reactive } from "@thi.ng/rstream";
 *
 * const src = reactive(42).map((x) => `value: ${x}`);
 *
 * $sub(src, "div", { class: "red" }).mount(document.body);
 *
 * src.next(43);
 * ```
 *
 * @param src -
 * @param inner -
 */
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
	return <$Sub>(
		src.subscribe(new $Sub(isString(tag) ? $wrapText(tag, attribs) : tag))
	);
}

/**
 * Version of {@link $sub} which supports specifying an rstream stream ID for
 * the resulting subscription (useful for debugging/visualizing the reactive
 * graph topology).
 *
 * @param src
 * @param inner
 * @param id
 */
export const $subWithID = <T>(
	src: ISubscribable<T>,
	inner: IMountWithState<T>,
	id: string
): IComponent<T> => <$Sub>src.subscribe(new $Sub(inner, id));

export class $Sub<T = any> extends Subscription<T, T> {
	el?: Element;

	constructor(protected inner: IMountWithState<T | undefined>, id?: string) {
		super(undefined, { id: id || `rdom$sub-${__nextID()}` });
	}

	async mount(parent: ParentNode, index: NumOrElement = -1) {
		return (this.el = await this.inner.mount(
			parent,
			index,
			this.parent!.deref()
		));
	}

	async unmount() {
		this.unsubscribe();
		this.el = undefined;
		await this.inner.unmount();
	}

	update(x: T) {
		this.next(x);
	}

	next(x: T) {
		if (this.el) this.inner.update(x);
	}
}

export class $SubA extends Subscription<any, any> {
	protected setter: Fn2<any, any, any>;
	protected attr: any = {};

	constructor(protected comp: IComponent, path: Path, id?: string) {
		super(undefined, { id: id || `rdom$attr-${__nextID()}` });
		this.setter = defSetterUnsafe(path);
	}

	next(a: any) {
		if (this.comp.el) $attribs(this.comp.el, this.setter(this.attr, a));
	}
}
