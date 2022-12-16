import { adaptDPI } from "@thi.ng/adapt-dpi";
import type { Fn, Fn2, Fn3, IToHiccup } from "@thi.ng/api";
import { withoutKeysObj } from "@thi.ng/associative/without-keys";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { resolveColor } from "@thi.ng/hiccup-canvas/color";
import { draw } from "@thi.ng/hiccup-canvas/draw";
import type { IComponent, IMountWithState, NumOrElement } from "@thi.ng/rdom";
import { Component } from "@thi.ng/rdom/component";
import { $sub } from "@thi.ng/rdom/sub";
import type { ISubscription } from "@thi.ng/rstream";
import { isSubscribable } from "@thi.ng/rstream/checks";
import { reactive } from "@thi.ng/rstream/stream";
import { sideEffect } from "@thi.ng/transducers/side-effect";

export interface CanvasOpts {
	/**
	 * Custom component lifecycle handler called when canvas first mounts.
	 */
	onmount: Fn2<HTMLCanvasElement, CanvasRenderingContext2D, void>;
	/**
	 * Custom component lifecycle handler called when canvas unmounts.
	 */
	onunmount: Fn<HTMLCanvasElement, void>;
	/**
	 * Custom component event handler called when canvas size has changed (only
	 * used when canvas size is initially given as reactive value).
	 */
	onresize: Fn3<HTMLCanvasElement, CanvasRenderingContext2D, number[], void>;
	/**
	 * Standard Canvas2D context options
	 */
	ctx: CanvasRenderingContext2DSettings;
	[id: string]: any;
}

/**
 * Reactive [thi.ng/hiccup-canvas](https://thi.ng/hiccup-canvas) component
 * wrapper. Returns a canvas component wrapped in a {@link $sub} and
 * updates/re-renders canvas with each new input received from `body`.
 *
 * @remarks
 * If `size` is subscribable, the canvas is resized each time a new value is
 * received, else will only be used to define initial canvas size. The `attribs`
 * SHOULD not include `width`, `height`, since these will be overriden in any
 * way by `size` arg.
 */
export const $canvas = (
	body: ISubscription<any, any[] | IToHiccup>,
	size: number[] | ISubscription<any, number[]>,
	attribs?: Partial<CanvasOpts>
) => $sub(body, new $Canvas(size, attribs));

export class $Canvas
	extends Component
	implements IMountWithState<any[] | IToHiccup>
{
	declare el?: HTMLCanvasElement;
	ctx?: CanvasRenderingContext2D;
	inner?: IComponent<any>;
	size: ISubscription<any, number[]>;
	sizeSub: ISubscription<number[], number[]>;

	constructor(
		size: number[] | ISubscription<any, number[]>,
		protected attribs: Partial<CanvasOpts> = {}
	) {
		super();
		this.size = isSubscribable(size)
			? <ISubscription<any, number[]>>size
			: reactive(<number[]>size);
		this.sizeSub = this.size.transform(
			sideEffect((size) => this.resize(size))
		);
	}

	async mount(
		parent: Element,
		index: NumOrElement,
		shapes: any[] | IToHiccup
	) {
		this.inner = this.$compile([
			"canvas",
			withoutKeysObj(this.attribs, [
				"onmount",
				"onunmount",
				"onresize",
				"ctx",
			]),
		]);
		this.el = <HTMLCanvasElement>await this.inner.mount(parent, index);
		this.ctx = this.el.getContext("2d", this.attribs.ctx)!;
		this.resize(this.size.deref()!);
		this.attribs.onmount && this.attribs.onmount(this.el, this.ctx);
		this.update(shapes);
		return this.el;
	}

	async unmount() {
		this.el && this.attribs.onunmount && this.attribs.onunmount(this.el);
		await this.inner!.unmount();
		this.sizeSub.unsubscribe();
		this.inner = undefined;
		this.el = undefined;
		this.ctx = undefined;
	}

	resize(size: number[]) {
		if (this.el) {
			adaptDPI(this.el!, size[0], size[1]);
			this.attribs.onresize &&
				this.attribs.onresize(this.el, this.ctx!, size);
		}
	}

	update(tree: any[] | IToHiccup) {
		if (tree == null) return;
		const shapes = implementsFunction(tree, "toHiccup")
			? tree.toHiccup()
			: tree;
		if (shapes[1].__bg) {
			this.ctx!.fillStyle = resolveColor(shapes[1].__bg);
			this.ctx!.fillRect(0, 0, this.el!.width, this.el!.height);
		} else if (shapes[1].__clear !== false) {
			this.ctx!.clearRect(0, 0, this.el!.width, this.el!.height);
		}
		const scale = window.devicePixelRatio || 1;
		this.ctx!.resetTransform();
		this.ctx!.scale(scale, scale);
		draw(this.ctx!, shapes);
	}
}
