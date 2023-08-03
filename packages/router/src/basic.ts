import type { Event, INotify, IObjectOf, Listener } from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { isString } from "@thi.ng/checks/is-string";
import { equiv } from "@thi.ng/equiv";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import {
	EVENT_ROUTE_CHANGED,
	EVENT_ROUTE_FAILED,
	type Route,
	type RouteMatch,
	type RouteParamValidator,
	type RouterConfig,
	type RouterEventType,
} from "./api.js";

@INotifyMixin
export class BasicRouter implements INotify<RouterEventType> {
	config: RouterConfig;
	current: RouteMatch | undefined;
	routeIndex: Record<string, Route>;

	constructor(config: RouterConfig) {
		this.config = {
			authenticator: (route, _, params) => ({
				id: route.id,
				title: route.title,
				params,
			}),
			prefix: "/",
			separator: "/",
			removeTrailingSlash: true,
			...config,
		};
		this.routeIndex = this.config.routes.reduce(
			(acc, r) => ((acc[r.id] = r), acc),
			<Record<string, Route>>{}
		);
		assert(
			this.routeForID(this.config.defaultRouteID) !== undefined,
			`missing config for default route: '${this.config.defaultRouteID}'`
		);
		if (config.initialRouteID) {
			const route = this.routeForID(config.initialRouteID);
			assert(
				route !== undefined,
				`missing config for initial route: ${this.config.initialRouteID}`
			);
			assert(
				!isParametricRoute(route!),
				"initial route MUST not be parametric"
			);
		}
	}

	/** {@inheritDoc @thi.ng/api#INotify.addListener} */
	// @ts-ignore: arguments
	// prettier-ignore
	addListener(id: RouterEventType, fn: Listener<RouterEventType>, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.removeListener} */
	// @ts-ignore: arguments
	// prettier-ignore
	removeListener(id: RouterEventType, fn: Listener<RouterEventType>, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.notify} */
	// @ts-ignore: arguments
	notify(event: Event<RouterEventType>): boolean {}

	start() {
		if (this.config.initialRouteID) {
			const route = this.routeForID(this.config.initialRouteID)!;
			this.current = { id: route.id, title: route.title, params: {} };
			this.notify({ id: EVENT_ROUTE_CHANGED, value: this.current });
		}
	}

	/**
	 * Main router function. Attempts to match given input string against all
	 * configured routes. Before returning, triggers {@link EVENT_ROUTE_CHANGED}
	 * with return value as well. If none of the routes matches, emits
	 * {@link EVENT_ROUTE_FAILED} and then falls back to configured default
	 * route.
	 *
	 * @param src - route path to match
	 */
	route(src: string): RouteMatch | undefined {
		if (
			this.config.removeTrailingSlash &&
			src.charAt(src.length - 1) === this.config.separator
		) {
			src = src.substring(0, src.length - 1);
		}
		src = src.substring(this.config.prefix!.length);
		let match = this.matchRoutes(src);
		if (!match) {
			this.notify({ id: EVENT_ROUTE_FAILED, value: src });
			if (!this.handleRouteFailure()) {
				return;
			}
			const route = this.routeForID(this.config.defaultRouteID)!;
			match = { id: route.id, title: route.title, params: {} };
		}
		if (!equiv(match, this.current)) {
			this.current = match;
			this.notify({ id: EVENT_ROUTE_CHANGED, value: match });
		}
		return match;
	}

	/**
	 * Returns a formatted version of given {@link RouteMatch}, incl. any
	 * params, or alternatively a registered route ID (and optional route
	 * params). Throws an error if an invalid route `id` is provided.
	 *
	 * @param id -
	 * @param params -
	 */
	format(id: string, params?: any): string;
	format(match: Partial<RouteMatch>): string;
	format(...args: any[]) {
		let [id, params] = args;
		let match: Partial<RouteMatch>;
		switch (args.length) {
			case 2:
				match = { id, params };
				break;
			case 1:
				match = isString(id) ? { id } : id;
				break;
			default:
				illegalArity(args.length);
		}
		const route = this.routeForID(match!.id!);
		if (route) {
			const params = match!.params || {};
			return (
				this.config.prefix +
				route.match
					.map((x) => {
						if (isRouteParam(x)) {
							const id = x.substring(1);
							const p = params[id];
							if (p != null) return p;
							illegalArgs(`missing value for param '${id}'`);
						}
						return x;
					})
					.join(this.config.separator)
			);
		} else {
			illegalArgs(`invalid route ID: ${match!.id!}`);
		}
	}

	routeForID(id: string): Route | undefined {
		return this.routeIndex[id];
	}

	protected matchRoutes(src: string) {
		const routes = this.config.routes;
		const curr = src.split(this.config.separator!);
		for (let i = 0, n = routes.length; i < n; i++) {
			const match = this.matchRoute(curr, routes[i]);
			if (match) {
				return match;
			}
		}
	}

	protected matchRoute(curr: string[], route: Route): RouteMatch | undefined {
		const match = route.match;
		const n = match.length;
		if (curr.length === n) {
			const params: any = {};
			for (let i = 0; i < n; i++) {
				const m = match[i];
				if (isRouteParam(m)) {
					params[m.substring(1)] = curr[i];
				} else if (curr[i] !== m) {
					return;
				}
			}
			if (
				route.validate &&
				!this.validateRouteParams(params, route.validate)
			) {
				return;
			}
			return route.auth
				? this.config.authenticator!(route, curr, params)
				: { id: route.id, title: route.title, params };
		}
	}

	protected validateRouteParams(
		params: any,
		validators: IObjectOf<Partial<RouteParamValidator>>
	) {
		for (let id in validators) {
			if (params[id] !== undefined) {
				const val = validators[id];
				if (val.coerce) {
					params[id] = val.coerce(params[id]);
				}
				if (val.check && !val.check(params[id])) {
					return false;
				}
			}
		}
		return true;
	}

	protected handleRouteFailure() {
		return true;
	}
}

const isParametricRoute = (route: Route) => route.match.some(isRouteParam);

const isRouteParam = (x: string) => x[0] === "?";
