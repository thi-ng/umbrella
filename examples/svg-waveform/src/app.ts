import type { Fn, IObjectOf } from "@thi.ng/api";
import { Atom, defAtom } from "@thi.ng/atom/atom";
import { defHistory, History } from "@thi.ng/atom/history";
import { defViewUnsafe } from "@thi.ng/atom/view";
import { isArray } from "@thi.ng/checks/is-array";
import { start } from "@thi.ng/hdom/start";
import { EventBus } from "@thi.ng/interceptors";
import type { AppConfig, AppContext, AppViews, ViewSpec } from "./api";
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
    history: History<any>;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = defAtom(config.initialState || {});
        this.history = defHistory(this.state, 1000);
        this.ctx = {
            bus: new EventBus(this.state, config.events, config.effects),
            views: <AppViews>{},
            ui: config.ui,
        };
        this.addViews(<any>this.config.views);
    }

    /**
     * Initializes given derived view specs and attaches them to app
     * state atom.
     *
     * @param specs
     */
    addViews(specs: IObjectOf<ViewSpec>) {
        const views: any = this.ctx.views;
        for (let id in specs) {
            const spec = specs[id];
            views[id] = isArray(spec)
                ? defViewUnsafe(this.state, spec[0], <Fn<any, any>>spec[1])
                : defViewUnsafe(this.state, spec);
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
            () => {
                if (
                    this.ctx.bus.processQueue({ history: this.history }) ||
                    firstFrame
                ) {
                    firstFrame = false;
                    return root();
                }
            },
            { root: this.config.domRoot, ctx: this.ctx }
        );
    }

    /**
     * User initialization hook.
     * Automatically called from `start()`
     */
    init() {
        // initialize key event handlers for undo/redo
        document.addEventListener("keypress", (e) => {
            // e.preventDefault();
            if (e.ctrlKey) {
                if (e.key === "z") {
                    this.ctx.bus.dispatch([ev.UNDO]);
                } else if (e.key === "y") {
                    this.ctx.bus.dispatch([ev.REDO]);
                }
            }
        });
        // ...add init tasks here

        // record snapshot of initial state
        this.history.record();
    }
}
