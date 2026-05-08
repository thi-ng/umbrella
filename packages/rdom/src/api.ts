// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn0 } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";

/**
 * Main rdom component interface/contract. Also see
 * {@link Component} for a flexible base class, implementing this
 * interface.
 */
export interface IComponent<T = any> {
	/**
	 * This component's main DOM element, i.e. usually the element
	 * created when the component is {@link IComponent.mount}ed. This
	 * element will be used as default by various helper methods in the
	 * {@link Component} class.
	 */
	el?: Element;
	/**
	 * Async component lifecycle method to initialize & attach the
	 * component in the target DOM.
	 *
	 * The `index` arg is used to define the child index of where to
	 * mount the component in the parent element and SHOULD default to
	 * -1, causing the component to be appended to (rather than inserted
	 * into) the list of children. The `index` arg MUST be passed to any
	 * DOM creation functions used within `mount()` (e.g. {@link $el},
	 * {@link $tree}). Likewise, for control-flow or wrapper components,
	 * the `index` arg MUST be used when mounting child components
	 * in-place of the wrapper component itself (e.g. see {@link $list},
	 * {@link $klist}, {@link $sub} etc.).
	 *
	 * The optional additional varargs are only used by some component
	 * wrappers and are context specific to each.
	 *
	 * @param parent -
	 * @param idx -
	 * @param args -
	 */
	mount(
		parent: ParentNode,
		idx?: NumOrNode,
		...args: any[]
	): Promise<Element>;
	/**
	 * Async component lifecycle method to remove the component from the
	 * target DOM and release any other internal resources (e.g.
	 * subscriptions).
	 */
	unmount(): Promise<void>;
	/**
	 * Component update lifecycle method. Not always used, but if it is
	 * then intended to perform internal updates to reflect incoming
	 * `state` arg in the DOM and/or child components.
	 */
	update(state?: T): void;
}

/**
 * Specialized version of {@link IComponent} which requires an
 * additional state arg for the component's `mount()` lifecycle method.
 *
 * @remarks
 * This interface is used to connect an otherwise stateless component
 * with a state provider (e.g. {@link $sub}).
 */
export interface IMountWith<T, M> extends IComponent<T> {
	/**
	 * Component mount lifecycle method which also receives initial
	 * state value, presumably meant for populating component.
	 *
	 * @param parent -
	 * @param index -
	 * @param state -
	 */
	mount(parent: ParentNode, index: NumOrNode, state: M): Promise<Element>;

	/**
	 * Same like {@link IComponent.update}, but new `state` value arg is
	 * mandatory.
	 *
	 * @param state -
	 */
	update(state: T): void;
}

/**
 * Syntax sugar for {@link IMountWith}.
 */
export type IMountWithState<T> = IMountWith<T, T>;

/**
 * Component type returned by {@link $compile}.
 */
export interface CompiledComponent extends IComponent {
	subs?: ISubscribable<any>[];
	children?: IComponent[];
}

/**
 * Any value which is either an {@link IComponent} or hiccup-style array/tree
 */
export type ComponentLike = IComponent | [string, ...(any | null)[]];

export type Callback = Fn0<void>;

export type NumOrElement = number | Element;

export type NumOrNode = number | Node;

/**
 * Common options for {@link $list} and {@link $klist} components.
 */
export interface ListBaseOpts<T> {
	/**
	 * Tag name or existing DOM element to use as list container.
	 *
	 * If given, the list items will be attached this this element. If given as
	 * string, an element of that type will be created first. In either case,
	 * the element can be further customized via {@link ListBaseOpts.attribs}.
	 *
	 * If NOT given, the list items will be directly attached to the list
	 * component's parent element. We call this a "bare" list.
	 */
	el?: Element | string;
	/**
	 * Element attributes for list container element (only used if
	 * {@link ListBaseOpts.el} is given).
	 */
	attribs?: Record<string, any>;
	/**
	 * List item component factory function.
	 */
	item: Fn<T, any>;
}
