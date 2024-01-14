import type { Fn0 } from "@thi.ng/api";
import type { ComponentLike, IComponent, NumOrElement } from "./api.js";
import { Component } from "./component.js";

/**
 * `IntersectionObserver`-based helper component for lazy
 * loading/initialization. Creates an initially empty wrapper element, then only
 * calls the given `inner` component factory function once the wrapper element
 * intersects the viewport (as per provided IntersectionObserver options).
 *
 * @remarks
 * The wrapper element MUST have an associated non-zero height (e.g. via CSS or
 * initial content).
 *
 * @param tag
 * @param attribs
 * @param inner
 * @param opts
 */
export const $lazy = (
	tag: string,
	attribs: any,
	inner: Fn0<Promise<ComponentLike>>,
	opts?: IntersectionObserverInit
) => new $Lazy(tag, attribs, inner, opts);

export class $Lazy extends Component {
	protected observer: IntersectionObserver | undefined;
	protected inner: IComponent | undefined;

	constructor(
		protected tag: string,
		protected attribs: any,
		protected ctor: Fn0<Promise<ComponentLike>>,
		protected opts?: IntersectionObserverInit
	) {
		super();
	}

	async mount(parent: ParentNode, index?: NumOrElement | undefined) {
		this.el = this.$el(this.tag, this.attribs, null, parent, index);
		this.observer = new IntersectionObserver(([item]) => {
			if (item.isIntersecting) {
				this.observer!.unobserve(this.el!);
				(async () => {
					this.inner = this.$compile(await this.ctor());
					this.inner.mount(this.el!, 0);
				})();
			}
		}, this.opts);
		this.observer.observe(this.el);
		return this.el;
	}

	async unmount(): Promise<void> {
		if (this.inner) {
			await this.inner.unmount();
			this.inner = undefined;
		}
		if (this.observer) {
			this.observer.disconnect();
			this.observer = undefined;
			super.unmount();
		}
	}
}
