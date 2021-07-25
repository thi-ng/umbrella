import { assert, Fn, NumOrString } from "@thi.ng/api";
import type { ISubscribable } from "@thi.ng/rstream";
import type {
    ComponentLike,
    IComponent,
    IMountWithState,
    NumOrElement,
} from "./api";
import { $compile } from "./compile";
import { Component } from "./component";
import { $sub } from "./sub";
import { $wrapText } from "./wrap";

/**
 * Reactive component wrapper to dynamically switch/replace itself with
 * one of the given components depending on subscribed value.
 *
 * @remarks
 * Subscribes to `src`, then calls `keyFn` for each received value and
 * uses result to call one of the given `ctors` async component
 * factories. The value returned from the chosen factory will be passsed
 * to {@link $compile} and then mounted in place of this `$switch`
 * wrapper. If an uncaught error occurs the `error` component factory
 * will be used instead.
 *
 * When a new value is received from `src`, the currently active inner
 * component will always be fist `unmount`ed and if the optional
 * `loader` is given, it will be temporarily mounted whilst the actual
 * `ctor` component factory executes. This is can be used to show a
 * pre-loaders.
 *
 * All component factories are async functions to facilitate dynamic
 * `import()` / code splitting and other async initializations (WASM etc.)
 *
 * @example
 * ```ts
 * $switch(
 *   fromInterval(1000),
 *   (x) => x % 3,
 *   {
 *     0: async (x) => {
 *       await delayed(null, 500); // fake preload
 *       return ["div.green", {}, x];
 *     },
 *     1: async (x) => ["div.yellow", {}, x]
 *   },
 *   async (err) => ["div.bg-red", {}, err],
 *   async () => ["div", {}, "Loading..."]
 * ).mount(document.body)
 * ```
 *
 * This example uses a 1Hz counter to delegate to 3 different possible
 * components, however only two are defined, causing the last option to
 * throw an error and so trigger/use the error component.
 *
 * @param src
 * @param keyFn
 * @param ctors
 * @param error
 * @param loader
 */
export const $switch = <T>(
    src: ISubscribable<T>,
    keyFn: Fn<T, NumOrString>,
    ctors: Record<NumOrString, Fn<T, Promise<ComponentLike>>>,
    error?: Fn<Error, Promise<ComponentLike>>,
    loader?: Fn<T, Promise<ComponentLike>>
) => $sub<T>(src, new Switch<T>(keyFn, ctors, error, loader));

/**
 * Syntax sugar for {@link $switch} for cases when there's only a single
 * component which should transition through its entire lifecycle for
 * each reactive value change.
 *
 * @remarks
 * In other words, for each new value received from `src`. The wrapped
 * component will first be unmounted, an optional pre-`loader` shown
 * whilst the async `ctor` component factory executes, its result
 * `$compile`d and then getting re-mounted. See {@link $switch} for
 * further details.
 *
 * @param src
 * @param ctor
 * @param error
 * @param loader
 */
export const $refresh = <T>(
    src: ISubscribable<T>,
    ctor: Fn<T, Promise<ComponentLike>>,
    error?: Fn<Error, Promise<ComponentLike>>,
    loader?: Fn<T, Promise<ComponentLike>>
) => $switch(src, () => 0, { 0: ctor }, error, loader);

export class Switch<T> extends Component implements IMountWithState<T> {
    protected val?: T;
    protected parent?: Element;
    protected inner?: IComponent<T>;
    protected index?: NumOrElement;

    constructor(
        protected keyFn: Fn<T, NumOrString>,
        protected ctors: Record<NumOrString, Fn<T, Promise<ComponentLike>>>,
        protected error: Fn<Error, Promise<ComponentLike>> = async (e) =>
            $wrapText("span", {}, e),
        protected loader: Fn<T, Promise<ComponentLike>> = async () =>
            $wrapText("span", {
                hidden: true,
            })
    ) {
        super();
    }

    async mount(parent: Element, index: NumOrElement, val: T) {
        this.parent = parent;
        this.index = index;
        await this.update(val);
        return this.inner!.el!;
    }

    async unmount() {
        this.inner && (await this.inner!.unmount());
        this.val = undefined;
        this.parent = undefined;
        this.inner = undefined;
    }

    async update(val: T) {
        this.inner && (await this.inner.unmount());
        this.inner = undefined;
        if (val != null) {
            this.val = val;
            let loader: IComponent | undefined;
            if (this.loader) {
                loader = $compile(await this.loader(val));
                await loader.mount(this.parent!, this.index!);
            }
            try {
                const key = this.keyFn(val);
                const next = this.ctors[key];
                assert(!!next, `missing component for key: ${key}`);
                this.inner = $compile(await next(val));
                loader && (await loader.unmount());
            } catch (e) {
                if (this.error) {
                    loader && (await loader.unmount());
                    this.inner = $compile(await this.error(e));
                }
            }
        } else {
            this.loader && (this.inner = $compile(await this.loader(val)));
        }
        this.inner && (await this.inner.mount(this.parent!, this.index!));
    }
}
