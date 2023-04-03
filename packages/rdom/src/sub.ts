import type { Fn2, Path } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { defSetterUnsafe } from "@thi.ng/paths/setter";
import type { ISubscribable } from "@thi.ng/rstream";
import { __nextID } from "@thi.ng/rstream/idgen";
import { Subscription } from "@thi.ng/rstream/subscription";
import type { IComponent, IMountWithState, NumOrElement } from "./api.js";
import { $attribs } from "./dom.js";
import { SCHEDULER } from "./scheduler.js";
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

export class $Sub<T = any> extends Subscription<T, T> {
	el?: Element;

	constructor(protected inner: IMountWithState<T | undefined>, id?: string) {
		super(undefined, { id: id || `rdom$sub-${__nextID()}` });
	}

	async mount(parent: Element, index: NumOrElement = -1) {
		return (this.el = await this.inner.mount(
			parent,
			index,
			this.parent!.deref()
		));
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

export class $SubA extends Subscription<any, any> {
	protected setter: Fn2<any, any, any>;
	protected attr: any = {};

	constructor(protected comp: IComponent, path: Path, id?: string) {
		super(undefined, { id: id || `rdom$attr-${__nextID()}` });
		this.setter = defSetterUnsafe(path);
	}

	next(a: any) {
		const $ = this.comp;
		SCHEDULER.add(
			$,
			() => $.el && $attribs($.el, this.setter(this.attr, a))
		);
	}
}
