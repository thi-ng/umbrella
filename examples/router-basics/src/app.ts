import type { Fn, IObjectOf } from "@thi.ng/api";
import { Atom, defAtom, defViewUnsafe } from "@thi.ng/atom";
import { isArray } from "@thi.ng/checks";
import { start } from "@thi.ng/hdom";
import { EventBus, trace, valueSetter } from "@thi.ng/interceptors";
import { EVENT_ROUTE_CHANGED, HTMLRouter } from "@thi.ng/router";
import type { AppConfig, AppContext, AppViews, ViewSpec } from "./api";
import { debugContainer } from "./components/debug-container";
import { nav } from "./components/nav";
import * as fx from "./effects";
import * as ev from "./events";

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
		this.state = defAtom(config.initialState || {});
		this.ctx = {
			bus: new EventBus(this.state, config.events, config.effects),
			views: <AppViews>{},
			ui: config.ui,
		};
		this.addViews(<any>this.config.views);
		this.router = new HTMLRouter(config.router);
		// connect router to event bus so that routing events are processed
		// as part of the normal batched event processing loop
		this.router.addListener(EVENT_ROUTE_CHANGED, (e) =>
			this.ctx.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
		);
		// whenever the route has changed, record its details in the app
		// state. likewise, when the user or a component triggers a the
		// `ROUTE_TO` event we assign the target route details to a side
		// effect which will cause a change in the router, which then in
		// turn triggers the `EVENT_ROUTE_CHANGED`, completing the
		// circle
		this.ctx.bus.addHandlers({
			[EVENT_ROUTE_CHANGED]: valueSetter("route"),
			[ev.ROUTE_TO]: (_, [__, route]) => ({ [fx.ROUTE_TO]: route }),
		});
		this.ctx.bus.addEffect(fx.ROUTE_TO, ([id, params]) =>
			this.router.routeTo(this.router.format(id, params))
		);

		// instrument all event handlers to trace events in console
		this.ctx.bus.instrumentWith([trace]);

		this.addViews({
			route: "route",
			routeComponent: [
				"route.id",
				(id) =>
					(
						this.config.components[id] ||
						(() => ["div", `missing component for route: ${id}`])
					)(this.ctx),
			],
		});
	}

	/**
	 * Initializes given derived view specs and attaches them to app
	 * state atom.
	 *
	 * @param specs -
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
	 * Starts router and kicks off hdom render loop, including batched
	 * event processing and fast fail check if DOM updates are necessary
	 * (assumes ALL state is held in the app state atom. So if there
	 * weren't any events causing a state change since last frame,
	 * re-rendering is skipped without even attempting to diff DOM tree).
	 */
	start() {
		this.router.start();
		start(
			() => {
				if (this.ctx.bus.processQueue()) {
					return this.rootComponent();
				}
			},
			{ root: this.config.domRoot, ctx: this.ctx }
		);
	}

	/**
	 * User provided root component function defined
	 * by current route and the derived view defined above.
	 */
	rootComponent(): any {
		const debug = this.ctx.views.debug.deref()!;
		const ui = this.ctx.ui;
		return [
			"div",
			ui.root,
			[
				"div",
				ui.column.content[debug],
				nav,
				this.ctx.views.routeComponent,
			],
			[debugContainer, debug, this.ctx.views.json],
		];
	}
}
