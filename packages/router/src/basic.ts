import {
    assert,
    Event,
    INotify,
    INotifyMixin,
    IObjectOf,
    Listener,
} from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs, illegalArity } from "@thi.ng/errors";
import type {
    Route,
    RouteMatch,
    RouteParamValidator,
    RouterConfig,
} from "./api";
import { EVENT_ROUTE_CHANGED } from "./constants";

@INotifyMixin
export class BasicRouter implements INotify {
    config: RouterConfig;
    current: RouteMatch | undefined;

    constructor(config: RouterConfig) {
        config.authenticator =
            config.authenticator ||
            ((route, _, params) => ({
                id: route.id,
                title: route.title,
                params,
            }));
        config.prefix = config.prefix === undefined ? "/" : config.prefix;
        config.separator = config.separator || "/";
        this.config = config;
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
    addListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
    // @ts-ignore: arguments
    removeListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.notify} */
    // @ts-ignore: arguments
    notify(event: Event) {}

    start() {
        if (this.config.initialRouteID) {
            const route = this.routeForID(this.config.initialRouteID)!;
            this.current = { id: route.id, title: route.title, params: {} };
            this.notify({ id: EVENT_ROUTE_CHANGED, value: this.current });
        }
    }

    /**
     * Main router function. Attempts to match given input string
     * against all configured routes. If none matches, falls back
     * to default route. Before returning, triggers event with
     * return value as well.
     *
     * @param raw - route path to match
     */
    route(src: string): RouteMatch | undefined {
        if (src.charAt(0) === "#") {
            src = src.substr(1);
        }
        src = src.substr(this.config.prefix!.length);
        let match = this.matchRoutes(src);
        if (!match) {
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
     * Returns a formatted version of given {@link RouteMatch}, incl. any params.
     * Throw an error if an invalid route `id` is provided.
     *
     * @param match -
     * @param params -
     * @param hash - if true, prepends `#` to results
     */
    format(id: string, params?: any, hash?: boolean): string;
    format(match: Partial<RouteMatch>, hash?: boolean): string;
    format(...args: any[]) {
        let [id, params, hash] = args;
        let match: Partial<RouteMatch>;
        switch (args.length) {
            case 3:
                match = { id, params };
                break;
            case 2:
                if (isString(id)) {
                    match = { id, params };
                } else {
                    hash = params;
                    match = id;
                }
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
                (hash ? "#" : "") +
                this.config.prefix +
                route.match
                    .map((x) =>
                        x.charAt(0) === "?"
                            ? (x = params[x.substr(1)]) != null
                                ? x
                                : "NULL"
                            : x
                    )
                    .join(this.config.separator)
            );
        } else {
            illegalArgs(`invalid route ID: ${match!.id!}`);
        }
    }

    routeForID(id: string) {
        return this.config.routes.find((route) => route.id === id);
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
        const match = route.match,
            n = match.length;
        if (curr.length === n) {
            const params: any = {};
            for (let i = 0; i < n; i++) {
                const m = match[i];
                if (m.charAt(0) === "?") {
                    params[m.substr(1)] = curr[i];
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

const isParametricRoute = (route: Route) =>
    route.match.some((p) => p.charAt(0) === "?");
