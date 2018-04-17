import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { valueSetter, trace } from "@thi.ng/interceptors/interceptors";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, ViewSpec, AppViews, AppContext } from "./api";
import * as ev from "./events";
import * as fx from "./effects";

import { nav } from "./components/nav";
import { debugContainer } from "./components/debug-container";

/**
 * Generic base app skeleton. You can use this as basis for your own
 * apps.
 *
 * As is the app does not much more than:
 *
 * - initialize state, event bus, router (if not disabled)
 * - attach derived views
 * - add ROUTE_TO event & effect handlers
 * - define root component wrapper to look up real component based on
 *   current route
 * - start router, hdom render & event bus loop
 */
export class App {

    config: AppConfig;
    ctx: AppContext;
    state: Atom<any>;
    router: HTMLRouter;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.ctx = {
            bus: new EventBus(this.state, config.events, config.effects),
            views: <AppViews>{},
            ui: config.ui
        };
        this.addViews(this.config.views);
        this.router = new HTMLRouter(config.router);
        this.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.ctx.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
        );
        this.ctx.bus.addHandlers({
            [EVENT_ROUTE_CHANGED]: valueSetter("route"),
            [ev.ROUTE_TO]: (_, [__, route]) => ({ [ev.ROUTE_TO]: route })
        });
        this.ctx.bus.addEffect(
            fx.ROUTE_TO,
            ([id, params]) => this.router.routeTo(this.router.format(id, params))
        );

        // instrument all event handlers to trace events in console
        this.ctx.bus.instrumentWith([trace]);

        this.addViews({
            route: "route",
            routeComponent: [
                "route.id",
                (id) =>
                    (this.config.components[id] ||
                        (() => ["div", `missing component for route: ${id}`]))(this.ctx)
            ]
        });
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
     * Starts router and kicks off hdom render loop, including batched
     * event processing and fast fail check if DOM updates are necessary
     * (assumes ALL state is held in the app state atom. So if there
     * weren't any events causing a state change since last frame,
     * re-rendering is skipped without even attempting to diff DOM tree).
     */
    start() {
        this.router.start();
        start(this.config.domRoot, () => {
            if (this.ctx.bus.processQueue()) {
                return this.rootComponent();
            }
        }, this.ctx);
    }

    /**
     * User provided root component function defined
     * by current route and the derived view defined above.
     */
    rootComponent(): any {
        const debug = this.ctx.views.debug.deref();
        const ui = this.ctx.ui;
        return ["div", ui.root,
            ["div", ui.column.content[debug],
                nav,
                this.ctx.views.routeComponent],
            [debugContainer, debug, this.ctx.views.json],
        ];
    }
}
