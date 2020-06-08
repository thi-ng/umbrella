import {
    DEFAULT_IMPL,
    HDOMImplementation,
    HDOMOpts,
    resolveRoot,
} from "@thi.ng/hdom";
import { derefContext } from "@thi.ng/hiccup";
import type { Fn, Fn2 } from "@thi.ng/api";
import type { Event, Signal } from "./api";

export const mount = <T>(
    model: T,
    update: Fn2<Event, T, T>,
    view: Fn2<T, Signal, any>,
    subscriptions?: Fn<Signal, void>,
    opts: Partial<HDOMOpts> = {},
    impl: HDOMImplementation<any> = DEFAULT_IMPL
) => {
    const _opts = { root: "app", ...opts };
    let prev: any[] = [];
    const root = resolveRoot(_opts.root, impl);

    const render = () => {
        _opts.ctx = derefContext(opts.ctx, _opts.autoDerefKeys);
        const curr = impl.normalizeTree(_opts, view(model, signal));
        if (curr != null) {
            if (_opts.hydrate) {
                impl.hydrateTree(_opts, root, curr);
                _opts.hydrate = false;
            } else {
                impl.diffTree(_opts, root, prev, curr);
            }
            prev = curr;
        }
    };

    const signal = (event: Event) => {
        return () => {
            model = update(event, model);
            render();
        };
    };

    render();
    subscriptions && subscriptions(signal);
};
