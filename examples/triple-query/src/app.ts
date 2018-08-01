import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom";
import { EV_SET_VALUE } from "@thi.ng/interceptors/api";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { TripleStore } from "@thi.ng/rstream-query/store";

import {
    AppConfig,
    AppContext,
    AppViews,
    ViewSpec
} from "./api";
import * as ev from "./events";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state and event bus
 * - attach derived views
 * - define root component wrapper
 * - start hdom render & event bus loop
 */
export class App {

    config: AppConfig;
    ctx: AppContext;
    state: Atom<any>;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.ctx = {
            bus: new EventBus(this.state, config.events, config.effects),
            store: new TripleStore(),
            views: <AppViews>{},
            ui: config.ui,
        };
        this.addViews(this.config.views);
    }

    /**
     * Initializes given derived view specs and attaches them to app
     * state atom.
     *
     * @param specs
     */
    addViews(specs: IObjectOf<ViewSpec>) {
        const views = this.ctx.views;
        for (let id in specs) {
            const spec = specs[id];
            if (isArray(spec)) {
                views[id] = this.state.addView(spec[0], spec[1]);
            } else {
                views[id] = this.state.addView(spec);
            }
        }
    }

    /**
     * Calls `init()` and kicks off hdom render loop, including batched
     * event processing and fast fail check if DOM updates are necessary
     * (assumes ALL state is held in the app state atom). So if there
     * weren't any events causing a state change since last frame,
     * re-rendering is skipped without even attempting to diff DOM
     * tree).
     */
    start() {
        this.init();
        // assume main root component is a higher order function
        // call it here to pre-initialize it
        const root = this.config.rootComponent(this.ctx);
        let firstFrame = true;
        start(
            this.config.domRoot,
            () => {
                if (this.ctx.bus.processQueue({ store: this.ctx.store }) || firstFrame) {
                    firstFrame = false;
                    return root();
                }
            },
            this.ctx
        );
    }

    /**
     * User initialization hook.
     * Automatically called from `start()`
     */
    init() {
        // ...add init tasks here
        const conf = this.config.data;
        const store = this.ctx.store;
        conf.cities.forEach((x) => this.ctx.bus.dispatch([ev.ADD_CITY, x]));
        conf.countries.forEach((x) => this.ctx.bus.dispatch([ev.ADD_COUNTRY, x]));
        for (let q in conf.queries) {
            store.addQueryFromSpec(conf.queries[q])
                .subscribe({
                    next: (res) => this.ctx.bus.dispatch([EV_SET_VALUE, [["queries", q], res]])
                });
        }
    }
}
