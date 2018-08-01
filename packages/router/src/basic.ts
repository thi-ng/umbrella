import {
    Event,
    INotify,
    IObjectOf,
    Listener
} from "@thi.ng/api/api";
import * as mixin from "@thi.ng/api/mixins/inotify";
import { isString } from "@thi.ng/checks/is-string";
import { equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

import {
    EVENT_ROUTE_CHANGED,
    Route,
    RouteMatch,
    RouteParamValidator,
    RouterConfig
} from "./api";

@mixin.INotify
export class BasicRouter implements
    INotify {

    public config: RouterConfig;
    public current: RouteMatch;

    constructor(config: RouterConfig) {
        config.authenticator = config.authenticator ||
            ((route, _, params) => ({ id: route.id, title: route.title, params }));
        config.prefix = config.prefix === undefined ? "/" : config.prefix;
        config.separator = config.separator || "/";
        this.config = config;
    }

    // mixin
    public addListener(_: string, __: Listener, ___?: any) { return false; }
    public removeListener(_: string, __: Listener, ___?: any) { return false; }
    public notify(_: Event) { }

    start() {
        if (this.config.initialRouteID) {
            const route = this.routeForID(this.config.initialRouteID);
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
     * @param raw route path to match
     */
    route(src: string): RouteMatch {
        if (src.charAt(0) === "#") {
            src = src.substr(1);
        }
        src = src.substr(this.config.prefix.length);
        const routes = this.config.routes,
            curr = src.split(this.config.separator);
        let match;
        for (let i = 0, n = routes.length; i < n; i++) {
            const route = routes[i],
                m = this.matchRoute(curr, route);
            if (m) {
                match = m;
                break;
            }
        }
        if (!match) {
            if (!this.handleRouteFailure()) {
                return;
            }
            const route = this.routeForID(this.config.defaultRouteID);
            match = { id: route.id, title: route.title, params: {} };
        }
        if (!equiv(match, this.current)) {
            this.current = match;
            this.notify({ id: EVENT_ROUTE_CHANGED, value: match });
        }
        return match;
    }

    /**
     * Returns a formatted version of given `RouteMatch`, incl. any params.
     * Throw an error if an invalid route `id` is provided.
     *
     * @param match
     * @param hash
     */
    format(id: PropertyKey, params?: any, hash?: boolean): string;
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
        const route = this.routeForID(match.id);
        if (route) {
            const params = match.params || {};
            return (hash ? "#" : "") +
                this.config.prefix +
                route.match
                    .map((x) => x.charAt(0) === "?" ? ((x = params[x.substr(1)]) != null ? x : "NULL") : x)
                    .join(this.config.separator);
        } else {
            illegalArgs(`invalid route ID: ${match.id.toString()}`);
        }
    }

    routeForID(id: PropertyKey) {
        const routes = this.config.routes;
        for (let i = 0, n = routes.length; i < n; i++) {
            if (id === routes[i].id) {
                return routes[i];
            }
        }
    }

    protected matchRoute(curr: string[], route: Route): RouteMatch {
        const match = route.match,
            n = match.length;
        if (curr.length === n) {
            const params = {};
            for (let i = 0; i < n; i++) {
                const m = match[i];
                if (m.charAt(0) === "?") {
                    params[m.substr(1)] = curr[i];
                } else if (curr[i] !== m) {
                    return;
                }
            }
            if (route.validate && !this.validateRouteParams(params, route.validate)) {
                return;
            }
            return route.auth ?
                this.config.authenticator(route, curr, params) :
                { id: route.id, title: route.title, params };
        }
    }

    protected validateRouteParams(params: any, validators: IObjectOf<Partial<RouteParamValidator>>) {
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
