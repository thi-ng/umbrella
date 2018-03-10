import { IObjectOf } from "@thi.ng/api/api";
import { IView } from "@thi.ng/atom/api";
import { Atom } from "@thi.ng/atom/atom";
import { EventBus } from "@thi.ng/atom/event-bus";
import { start } from "@thi.ng/hdom";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router/api";
import { HTMLRouter } from "@thi.ng/router/history";

import { AppConfig, ViewSpec } from "./api";
import { isArray } from "util";

export abstract class App {

    config: AppConfig;
    state: Atom<any>;
    bus: EventBus;
    router: HTMLRouter;
    views: IObjectOf<IView<any>>;

    constructor(config: AppConfig) {
        this.config = config;
        this.state = new Atom(config.initialState || {});
        this.bus = new EventBus(this.state, config.events, config.effects);
        this.router = new HTMLRouter(config.router);
        this.router.addListener(
            EVENT_ROUTE_CHANGED,
            (e) => this.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
        );
        this.views = {};
        this.addViews(this.config.views);
        this.addViews({
            route: "route",
            routeComponent: [
                "route.id",
                (id) =>
                    (this.config.components[id] ||
                        (() => ["div", `missing component for route: ${id}`]))(this)
            ]
        });
    }

    /**
     * Starts router and kicks of hdom render loop, including batched
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
     * User provided function to return app's root component.
     */
    abstract rootComponent(): any;

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
}
