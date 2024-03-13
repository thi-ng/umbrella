import type { EVENT_ALL, Fn, IObjectOf } from "@thi.ng/api";

/**
 * A validation function for to-be authenticated routes.
 *
 * @remarks
 * If this function determines that the user is not allowed to access this
 * route, it should return nothing or a {@link RouteMatch} object for
 * redirecting (e.g. to a login, home page or other non-protected route). If
 * nothing is returned and no other routes can be matched, the router will
 * eventually return the configured default fallback route (see
 * {@link RouterOpts.default}).
 *
 * The optional `ctx` is an arbitrary user provided context value given to
 * {@link BasicRouter.route} (e.g. the original request object).
 */
export type RouteAuthenticator<T = any> = (
	match: RouteMatch,
	route: AugmentedRoute,
	ctx?: T
) => RouteMatch | undefined;

/**
 * Route validator subspecs are optional and used to coerce and/or validate
 * individual route parameters.
 */
export interface RouteParamValidator {
	/**
	 * Optional coercion function executed prior to validation.
	 */
	coerce?: Fn<string, any>;
	/**
	 * Optional arbitrary value validation (applied *after* coercion, if any).
	 * If a validator returns non-true result, the currently checked route
	 * becomes unmatched/invalid and the router continues checking other routes.
	 */
	check: Fn<any, boolean>;
}

/**
 * A Route describes an application path (possibly parameterized), incl.
 * parameter coercion, validation and overall route authentication. Apart from
 * `id` and `match` all other fields are optional.
 */
export interface Route {
	/**
	 * Unique ID for this route. This value will be returned as part of a
	 * {@link RouteMatch} resulting from {@link BasicRouter.route} and also used
	 * to look up routes in {@link BasicRouter.routeForID} and
	 * {@link BasicRouter.format}.
	 */
	id: string;
	/**
	 * Array or string of path components, incl. wildcards. If a value is
	 * prefixed with `?` this path component will be captured under that name.
	 *
	 * @remarks
	 * See {@link Trie} for rules & comments on wildcard handling.
	 *
	 * E.g. `["projects", "?pid"]` will match any of these routes:
	 *
	 * - `/projects/123`
	 * - `/projects/abcde`
	 *
	 * {@link Route.validate} options can then be used to further restrict the
	 * possible value range of the `pid` param value and/or coerce it...
	 */
	match: string | string[];
	/**
	 * This object specifies coercions and validators for variable /
	 * parameterized path components, e.g.
	 *
	 * ```js
	 * {
	 *  id: {
	 *          coerce: (x) => parseInt(x,10),
	 *          check: (x)=> x < 100
	 *      }
	 * }
	 * ```
	 *
	 * This will first coerce the `id` route param to a number and then only
	 * allow the route to be matched if `id < 100`.
	 */
	validate?: IObjectOf<RouteParamValidator>;
	/**
	 * Flag to indicate if this route should be passed to the globally
	 * configured authentication function. Only matched and validated routes are
	 * processed.
	 */
	auth?: boolean;

	/**
	 * Reserved property.
	 *
	 * @internal used by {@link AugmentedRoute}
	 */
	rest?: never;
	/**
	 * Reserved property.
	 *
	 * @internal used by {@link AugmentedRoute}
	 */
	params?: never;
	/**
	 * Allow route objects to be extended w/ custom data
	 */
	// [id: string]: any;
}

export interface AugmentedRoute
	extends Omit<Route, "match" | "rest" | "params"> {
	match: string[];
	params?: Record<number, string>;
	rest: number;
}

/**
 * Result object returned by a routing operation and event value for
 * {@link EVENT_ROUTE_CHANGED}. Contains the matched route ID and any route
 * params.
 */
export interface RouteMatch {
	/**
	 * ID of matched {@link Route}.
	 */
	id: string;
	/**
	 * Matched & processed/coerced route params.
	 */
	params?: any;
	/**
	 * Only used for `*` wildcard routes. Contains remaining route elements.
	 */
	rest?: string[];
	/**
	 * If true, indicates the ID of this route match is a redirect (e.g.
	 * triggered by the {@link RouteAuthenticator} or if no route matched and
	 * the {@link RouterOpts.default} was triggered).
	 *
	 * @remarks
	 * Only intended for client purposes, not used internally. I.e. clients
	 * should check if this flag is set and take appropriate redirect measures.
	 */
	redirect?: true;
}

/**
 * Configuration object for {@link BasicRouter} and {@link HTMLRouter}
 * instances.
 */
export interface RouterOpts<T = any> {
	/**
	 * An array of route specs which route input strings will be matched
	 * against. Routes will be sorted from longest to shortest.
	 */
	routes: Route[];
	/**
	 * Fallback route ID (MUST exist in `routes`), used if none of the defined
	 * routes could be matched against user input, e.g. a home or error page.
	 */
	default: string;
	/**
	 * Optional initial route to trigger when router starts. If given, this MUST
	 * be a route without params.
	 */
	initial?: string;
	/**
	 * Optional route authentication function. See {@link RouteAuthenticator}
	 * for further details. If no authenticator is given, all matched routes
	 * will always succeed, regardless if a rule's `auth` flag is enabled or
	 * not.
	 */
	authenticator?: RouteAuthenticator<T>;
	/**
	 * Optional route path component separator. Default: `/`
	 */
	separator?: string;
	/**
	 * Route prefix. Default: `/`. All routes to be parsed by
	 * {@link BasicRouter.route} are assumed to have this prefix. All routes
	 * returned by {@link BasicRouter.format} will include this prefix.
	 *
	 * @remarks
	 * If given, the prefix MUST end with {@link RouterOpts.separator}.
	 */
	prefix?: string;
	/**
	 * If true (default), the trailing slash (actually
	 * {@link RouterOpts.separator}) of a given route input string will be
	 * removed before matching.
	 */
	trim?: boolean;
}

export interface HTMLRouterOpts<T = any> extends RouterOpts<T> {
	/**
	 * Same as {@link RouterOpts.prefix}. If
	 * {@link HTMLRouterOpts.useFragment} is true, then the default changes to
	 * `#/`. If `useFragment` is enabled and a custom prefix is given, it MUST
	 * include the leading `#` as well.
	 */
	prefix?: string;
	/**
	 * Optional flag to indicate if URL hash fragment should be used for routes.
	 */
	useFragment?: boolean;
}

/**
 * ID of success event being triggered by `router.match()`
 */
export const EVENT_ROUTE_CHANGED = "route-changed";

export const EVENT_ROUTE_FAILED = "route-failed";

export type RouterEventType =
	| typeof EVENT_ROUTE_CHANGED
	| typeof EVENT_ROUTE_FAILED
	| typeof EVENT_ALL;
