import type { MaybeDeref } from "@thi.ng/api";
import type { IComponent, NumOrElement } from "./api.js";
import { $compile } from "./compile.js";
import {
	$attribs,
	$clear,
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
		parent: Element,
		index?: NumOrElement,
		...xs: any[]
	): Promise<Element>;

	async unmount() {
		this.$remove();
		this.el = undefined;
	}

	// @ts-ignore args
	update(state?: T) {}

	$el(
		tag: string,
		attribs?: any,
		body?: any,
		parent = this.el,
		idx?: NumOrElement
	) {
		return $el(tag, attribs, body, parent, idx);
	}

	$clear(el = this.el!) {
		return $clear(el);
	}

	$compile(tree: any) {
		return $compile(tree);
	}

	$tree(tree: any, root = this.el!, index?: NumOrElement) {
		return $tree(tree, root, index);
	}

	$text(body: any) {
		this.el && $text(<any>this.el, body);
	}

	$html(body: MaybeDeref<string>) {
		this.el && $html(<any>this.el, body);
	}

	$attribs(attribs: any, el = this.el!) {
		$attribs(el, attribs);
	}

	$style(rules: any, el = this.el!) {
		$style(el, rules);
	}

	$remove(el = this.el!) {
		$remove(el);
	}

	$moveTo(newParent: Element, el = this.el!, idx?: NumOrElement) {
		$moveTo(newParent, el, idx);
	}
}
