import type { MaybeDeref } from "@thi.ng/api";
import type { IComponent, NumOrElement } from "./api.js";
import { $compile } from "./compile.js";
import {
	$attribs,
	$clear,
	$comment,
	$el,
	$html,
	$moveTo,
	$remove,
	$style,
	$text,
	$tree,
} from "./dom.js";

/**
 * Abstract base class / {@link IComponent} implementation. Provides
 * additional convenience methods for DOM element creation &
 * manipulation.
 */
export abstract class Component<T = any> implements IComponent<T> {
	el?: Element;

	abstract mount(
		parent: ParentNode,
		index?: NumOrElement,
		...xs: any[]
	): Promise<Element>;

	async unmount() {
		this.$remove();
		this.el = undefined;
	}

	// @ts-ignore args
	update(state?: T) {}

	/**
	 * Syntax sugar for {@link $el}, using this component's
	 * {@link IComponent.el} as default `parent`.
	 *
	 * @param tag
	 * @param attribs
	 * @param body
	 * @param parent
	 * @param idx
	 */
	$el(
		tag: string,
		attribs?: any,
		body?: any,
		parent: ParentNode | undefined = this.el,
		idx?: NumOrElement
	) {
		return $el(tag, attribs, body, parent, idx);
	}

	/**
	 * Syntax sugar for {@link $comment}, creates a new comment DOM node using
	 * this component's {@link IComponent.el} as default `parent`.
	 *
	 * @param body
	 * @param parent
	 * @param idx
	 */
	$comment(
		body: string | string[],
		parent: ParentNode | undefined = this.el,
		idx?: NumOrElement
	) {
		return $comment(body, parent, idx);
	}

	/**
	 * Syntax sugar for {@link $clear}, using this component's
	 * {@link IComponent.el} as default element to clear.
	 *
	 * @param el
	 */
	$clear(el = this.el!) {
		return $clear(el);
	}

	/**
	 * Same as {@link $compile}.
	 *
	 * @param tree
	 */
	$compile(tree: any) {
		return $compile(tree);
	}

	/**
	 * Same as {@link $tree}.
	 *
	 * @param tree
	 * @param root
	 * @param index
	 */
	$tree(tree: any, root: ParentNode = this.el!, index?: NumOrElement) {
		return $tree(tree, root, index);
	}

	/**
	 * Syntax sugar for {@link $text}, using this component's
	 * {@link IComponent.el} as default element to edit.
	 *
	 * @remarks
	 * If using the default element, assumes `this.el` is an existing
	 * `HTMLElement`.
	 *
	 * @param body
	 * @param el
	 */
	$text(body: any, el: HTMLElement | SVGElement = <HTMLElement>this.el!) {
		$text(el, body);
	}

	/**
	 * Syntax sugar for {@link $html}, using this component's
	 * {@link IComponent.el} as default element to edit.
	 *
	 * @remarks
	 * If using the default element, assumes `this.el` is an existing
	 * `HTMLElement` or `SVGElement`.
	 *
	 * @param body
	 * @param el
	 */
	$html(
		body: MaybeDeref<string>,
		el: HTMLElement | SVGElement = <HTMLElement>this.el!
	) {
		$html(el, body);
	}

	/**
	 * Syntax sugar for {@link $attribs}, using this component's
	 * {@link IComponent.el} as default element to edit.
	 *
	 * @param attribs
	 * @param el
	 */
	$attribs(attribs: any, el = this.el!) {
		$attribs(el, attribs);
	}

	/**
	 * Syntax sugar for {@link $style}, using this component's
	 * {@link IComponent.el} as default element to edit.
	 *
	 * @param rules
	 * @param el
	 */
	$style(rules: any, el = this.el!) {
		$style(el, rules);
	}

	/**
	 * Syntax sugar for {@link $remove}, using this component's
	 * {@link IComponent.el} as default element to remove.
	 *
	 * @param el
	 */
	$remove(el = this.el!) {
		$remove(el);
	}

	/**
	 * Syntax sugar for {@link $moveTo}, using this component's
	 * {@link IComponent.el} as default element to migrate.
	 *
	 * @param newParent
	 * @param el
	 * @param idx
	 */
	$moveTo(newParent: ParentNode, el = this.el!, idx?: NumOrElement) {
		$moveTo(newParent, el, idx);
	}
}
