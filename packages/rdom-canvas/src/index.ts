import { adaptDPI } from "@thi.ng/adapt-dpi";
import type { IToHiccup } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks";
import { draw } from "@thi.ng/hiccup-canvas";
import {
    $sub,
    Component,
    IComponent,
    IMountWithState,
    isSubscribable,
    NumOrElement,
} from "@thi.ng/rdom";
import { ISubscribable, reactive, Subscription } from "@thi.ng/rstream";
import { sideEffect } from "@thi.ng/transducers";

/**
 * Reactive {@link @thi.ng/hiccup-canvas} component wrapper. Returns a
 * canvas component wrapped in a {@link $sub} and updates/re-renders
 * canvas with each new input received from `body`.
 *
 * @remarks
 * If `size` is subscribable, the canvas is resized each time a new
 * value is received, else will only be used to define initial canvas
 * size. The `attribs` SHOULD not include `width`, `height`, since these
 * will be overriden in any way by `size` arg.
 */
export const $canvas = (
    body: ISubscribable<any[] | IToHiccup>,
    size: number[] | Subscription<any, number[]>,
    attribs?: any
) => $sub(body, new $Canvas(size, attribs));

export class $Canvas extends Component
    implements IMountWithState<any[] | IToHiccup> {
    el?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    inner?: IComponent<any>;
    size: Subscription<any, number[]>;
    sizeSub: Subscription<number[], number[]>;

    constructor(
        size: number[] | Subscription<any, number[]>,
        protected attribs: any = {}
    ) {
        super();
        this.size = isSubscribable(size)
            ? <Subscription<any, number[]>>size
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
        this.inner = this.$compile(["canvas", this.attribs]);
        this.el = <HTMLCanvasElement>await this.inner.mount(parent, index);
        this.ctx = this.el.getContext("2d")!;
        this.resize(this.size.deref()!);
        this.update(shapes);
        return this.el;
    }

    async unmount() {
        this.inner!.unmount();
        this.sizeSub.unsubscribe();
        this.inner = undefined;
        this.el = undefined;
        this.ctx = undefined;
    }

    resize(size: number[]) {
        if (this.el) {
            adaptDPI(this.el!, size[0], size[1]);
        }
    }

    update(tree: any[] | IToHiccup) {
        if (tree == null) return;
        const shapes = implementsFunction(tree, "toHiccup")
            ? (<IToHiccup>tree).toHiccup()
            : tree;
        shapes[1].__clear !== false &&
            this.ctx!.clearRect(0, 0, this.el!.width, this.el!.height);
        const scale = window.devicePixelRatio || 1;
        this.ctx!.resetTransform();
        this.ctx!.scale(scale, scale);
        draw(this.ctx!, shapes);
    }
}
