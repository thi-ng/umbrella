import type {
	Event,
	INotify,
	IObjectOf,
	Listener,
	SomeRequired,
} from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { isString } from "@thi.ng/checks/is-string";
import { equiv } from "@thi.ng/equiv";
import type { CustomError } from "@thi.ng/errors";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { illegalState } from "@thi.ng/errors/illegal-state";
import {
	EVENT_ROUTE_CHANGED,
	EVENT_ROUTE_FAILED,
	type AugmentedRoute,
	type Route,
	type RouteMatch,
	type RouteParamValidator,
	type RouterEventType,
	type RouterOpts,
} from "./api.js";
import { Trie } from "./trie.js";

@INotifyMixin
export class Router<T = any> implements INotify<RouterEventType> {
	opts: RouterOpts<T>;
	current: RouteMatch | undefined;
	protected index: Record<string, AugmentedRoute> = {};
	protected routes: Trie<AugmentedRoute> = new Trie();

	constructor(config: RouterOpts<T>) {
		this.opts = {
			authenticator: (match) => match,
			prefix: "/",
			separator: "/",
			trim: true,
			...config,
		};
		this.addRoutes(this.opts.routes);
		assert(
			this.routeForID(this.opts.default) !== undefined,
			`missing config for default route: '${this.opts.default}'`
		);
		if (config.initial) {
			const route = this.routeForID(config.initial);
			assert(
				route !== undefined,
				`missing config for initial route: ${this.opts.initial}`
			);
			assert(!route!.params, "initial route MUST not be parametric");
		}
	}

	// @ts-ignore: arguments
	// prettier-ignore
	addListener(id: RouterEventType, fn: Listener<RouterEventType>, scope?: any): boolean {}

	// @ts-ignore: arguments
	// prettier-ignore
	removeListener(id: RouterEventType, fn: Listener<RouterEventType>, scope?: any): boolean {}

	// @ts-ignore: arguments
	notify(event: Event<RouterEventType>): boolean {}

	start() {
		if (this.opts.initial) {
			const route = this.routeForID(this.opts.initial)!;
			this.current = { id: route.id, params: {} };
			this.notify({ id: EVENT_ROUTE_CHANGED, value: this.current });
		}
	}

	addRoutes(routes: Route[]) {
		for (let r of routes) {
			try {
				const route = this.augmentRoute(r);
				this.routes.set(route.match, route);
				this.index[route.id] = route;
			} catch (e) {
				illegalArgs(
					`error in route "${r.id}": ${(<CustomError>e).origMessage}`
				);
			}
		}
	}

	/**
	 * Main router function. Attempts to match given input string against all
	 * configured routes. Before returning, triggers {@link EVENT_ROUTE_CHANGED}
	 * with return value as well. If none of the routes matches, emits
	 * {@link EVENT_ROUTE_FAILED} and then falls back to configured default
	 * route.
	 *
	 * @remarks
	 * See {@link RouteAuthenticator} for details about `ctx` handling.
	 *
	 * @param src - route path to match
	 * @param ctx - arbitrary user context
	 */
	route(src: string, ctx?: T): RouteMatch | undefined {
		if (
			this.opts.trim &&
			src.charAt(src.length - 1) === this.opts.separator
		) {
			src = src.substring(0, src.length - 1);
		}
		src = src.substring(this.opts.prefix!.length);
		let match = this.matchRoutes(src, ctx);
		if (!match) {
			this.notify({ id: EVENT_ROUTE_FAILED, value: src });
			if (!this.handleRouteFailure()) {
				return;
			}
			const route = this.routeForID(this.opts.default)!;
			match = { id: route.id, redirect: true };
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
	 * @param rest -
	 */
	format(id: string, params?: any, rest?: string[]): string;
	format(match: SomeRequired<RouteMatch, "id">): string;
	format(...args: any[]) {
		let [id, params, rest] = args;
		let match: SomeRequired<RouteMatch, "id">;
		switch (args.length) {
			case 3:
				match = { id, params, rest };
				break;
			case 2:
				match = { id, params };
				break;
			case 1:
				match = isString(id) ? { id } : id;
				break;
			default:
				illegalArity(args.length);
		}
		const route = this.routeForID(match!.id);
		if (route) {
			const params = match!.params;
			let parts = route.match.map((x) => {
				if (isRouteParam(x)) {
					const id = x.substring(1);
					const p = params?.[id];
					if (p == null) {
						illegalArgs(`missing value for param '${id}'`);
					}
					return p;
				}
				return x;
			});
			if (route.rest >= 0)
				parts = parts.slice(0, route.rest).concat(match.rest || []);
			return this.opts.prefix + parts.join(this.opts.separator);
		} else {
			illegalArgs(`invalid route ID: ${match!.id!}`);
		}
	}

	routeForID(id: string): AugmentedRoute | undefined {
		return this.index[id];
	}

	protected augmentRoute(route: Route): AugmentedRoute {
		const match = isString(route.match)
			? route.match.split(this.opts.separator!).filter((x) => !!x)
			: route.match;
		const existing = this.routes.get(match);
		if (existing) {
			illegalArgs(
				`duplicate route: ${match} (id: ${route.id}, conflicts with: ${existing.id})`
			);
		}
		let hasParams = false;
		const params = match.reduce((acc, x, i) => {
			if (isRouteParam(x)) {
				hasParams = true;
				acc[i] = x.substring(1);
			}
			return acc;
		}, <Record<number, string>>{});
		return {
			...route,
			match,
			params: hasParams ? params : undefined,
			rest: match.indexOf("+"),
		};
	}

	protected matchRoutes(src: string, ctx?: T) {
		const curr = src.split(this.opts.separator!);
		const route = this.routes.get(curr);
		if (!route) return;
		let params: RouteMatch["params"];
		if (route.params) {
			params = Object.entries(route.params).reduce(
				(acc, [i, k]) => ((acc[k] = curr[+i]), acc),
				<RouteMatch["params"]>{}
			);
		}
		if (
			route.validate &&
			!this.validateRouteParams(params, route.validate)
		) {
			return;
		}
		const rest = route.rest >= 0 ? curr.slice(route.rest) : undefined;
		let match: RouteMatch | undefined = {
			id: route.id,
			params,
			rest,
		};
		if (route.auth) {
			match = this.opts.authenticator!(match, route, ctx);
			if (match && !this.index[match.id]) {
				illegalState(
					"auth handler returned invalid route ID: " + match.id
				);
			}
		}
		return match;
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

const isRouteParam = (x: string) => x[0] === "?";
