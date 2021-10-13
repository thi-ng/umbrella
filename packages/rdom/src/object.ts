import type { Fn, Keys } from "@thi.ng/api";
import type { ISubscribable, StreamObj, StreamObjOpts } from "@thi.ng/rstream";
import { fromObject } from "@thi.ng/rstream/object";
import type {
    ComponentLike,
    IComponent,
    IMountWithState,
    NumOrElement,
} from "./api.js";
import { Component } from "./component.js";
import { $sub } from "./sub.js";

/**
 * Creates a control component wrapper with an internal stream setup for user
 * defined keys in the given object. When this component is mounted, it will
 * call `inner` with an object of key-value streams and then {@link $compile}s
 * that function's return value as component body.
 *
 * @remarks
 * Uses {@link @thi.ng/rstream#fromObject} for creating the internal key-value
 * streams. These can then be used by `inner` to produce reactive child
 * elements. The given `src` object is only used to seed those streams with
 * initial values. The component wrapper can be updated with new values, using
 * the `.update()` life cycle method with a new object.
 *
 * By default the value streams will only trigger updates if their values have
 * changed. See {@link @thi.ng/rstream#StreamObjOpts} for more details and
 * options.
 *
 * Also see {@link $subObject}.
 *
 * @example
 * ```ts
 * const obj = $object(
 *   // source object (for seeding)
 *   { id: "a", name: "foo", ignore: 23 },
 *   // create subscriptions for given keys
 *   { keys: ["id", "name"] }
 *   // component factory
 *   async (obj) => <ComponentLike>["div", {}, "id: ", obj.id, " name: ", obj.name]
 * );
 *
 * obj.mount(document.body);
 *
 * obj.update({ id: "b", name: "bar" });
 * ```
 *
 * @param src
 * @param opts - options for `fromObject()` stream setup
 * @param inner
 */
export const $object = <T, K extends Keys<T>>(
    src: T,
    opts: Partial<StreamObjOpts<T, K>>,
    inner: Fn<StreamObj<T, K>["streams"], Promise<ComponentLike>>
) => new $Object<T, K>(src, opts, inner);

/**
 * Syntax sugar for a combination of {@link $sub} and {@link $object} to allow
 * reactive updates of `$object()` components themselves.
 *
 * @example
 * ```ts
 * interface Foo {
 *   id: string;
 *   name: string;
 * }
 *
 * const state = reactive<Foo>({ id: "a", name: "foo" });
 *
 * $subObject<Foo, keyof Foo>(
 *   state,
 *   { keys: ["id", "name"] },
 *   // component factory
 *   // only executed once, but `obj.id` and `obj.name` are reactive values
 *   async (obj) => <ComponentLike>["div", {}, "id: ", obj.id, " name: ", obj.name]
 * ).mount(document.body);
 *
 * // update
 * state.next({ id: "b", name: "bar" });
 * ```
 *
 * @param src
 * @param opts
 * @param inner
 */
export const $subObject = <T, K extends Keys<T>>(
    src: ISubscribable<T>,
    opts: Partial<StreamObjOpts<T, K>>,
    inner: Fn<StreamObj<T, K>["streams"], Promise<ComponentLike>>
) => $sub<T>(src, $object(src.deref() || <any>{}, opts, inner));

export class $Object<T, K extends Keys<T>>
    extends Component
    implements IMountWithState<T>
{
    protected obj: StreamObj<T, K>;
    protected inner?: IComponent;

    constructor(
        src: T,
        opts: Partial<StreamObjOpts<T, K>>,
        protected ctor: Fn<StreamObj<T, K>["streams"], Promise<ComponentLike>>
    ) {
        super();
        this.obj = fromObject(src, opts);
    }

    async mount(parent: Element, index: NumOrElement = -1, state?: T) {
        state !== undefined && this.obj.next(state);
        this.inner = this.$compile(await this.ctor(this.obj.streams));
        this.el = await this.inner.mount(parent, index);
        return this.el!;
    }

    async unmount() {
        this.obj.done();
        await this.inner!.unmount();
        this.el = undefined;
        this.inner = undefined;
    }

    update(state: T) {
        this.obj.next(state);
    }
}
