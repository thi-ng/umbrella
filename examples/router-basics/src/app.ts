import { IObjectOf } from "@thi.ng/api/api";
import { Atom } from "@thi.ng/atom/atom";
import { isArray } from "@thi.ng/checks/is-array";
import { EventBus } from "@thi.ng/interceptors/event-bus";
import { valueSetter } from "@thi.ng/interceptors/interceptors";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, ViewSpec, AppViews } from "./api";

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

    static readonly EV_ROUTE_TO = "route-to";
    static readonly FX_ROUTE_TO = "route-to";

    config: AppConfig;
    state: Atom<any>;
    views: AppViews;
    bus: EventBus;
    router: HTMLRouter;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.views = <AppViews>{};
        this.addViews(this.config.views);
        this.bus = new EventBus(this.state, config.events, config.effects);
        this.router = new HTMLRouter(config.router);
        this.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
        );
        this.bus.addHandlers({
            [EVENT_ROUTE_CHANGED]: valueSetter("route"),
            [App.EV_ROUTE_TO]: (_, [__, route]) => ({ [App.FX_ROUTE_TO]: route })
        });
        this.bus.addEffect(
            App.FX_ROUTE_TO,
            ([id, params]) => this.router.routeTo(this.router.format(id, params))
        );
        this.addViews({
            route: "route",
            routeComponent: [
                "route.id",
                (id) =>
                    (this.config.components[id] ||
                        (() => ["div", `missing component for route: ${id}`]))(this, this.config.ui)
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
        for (let id in specs) {
            const spec = specs[id];
            if (isArray(spec)) {
                this.views[id] = this.state.addView(spec[0], spec[1]);
            } else {
                this.views[id] = this.state.addView(spec);
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
            if (this.bus.processQueue()) {
                return this.rootComponent();
            }
        });
    }

    /**
     * User provided root component function defined
     * by current route and the derived view defined above.
     */
    rootComponent(): any {
        const debug = this.views.debug.deref();
        const ui = this.config.ui;
        return ["div", ui.root,
            ["div", ui.column.content[debug],
                [nav, this, ui.nav],
                this.views.routeComponent],
            [debugContainer, this, ui, debug, this.views.json],
        ];
    }
}
