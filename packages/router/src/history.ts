import type { Fn } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { illegalArity } from "@thi.ng/errors";
import type { HTMLRouterConfig, RouteMatch, RouterConfig } from "./api";
import { BasicRouter } from "./basic";

export class HTMLRouter extends BasicRouter {
    protected currentPath!: string;
    protected popHandler!: Fn<PopStateEvent, void>;
    protected hashHandler!: Fn<HashChangeEvent, void>;
    protected useFragment: boolean;
    protected ignoreHashChange: boolean;

    constructor(config: HTMLRouterConfig) {
        super(<RouterConfig>config);
        this.useFragment = config.useFragment !== false;
        this.ignoreHashChange = false;
    }

    start() {
        window.addEventListener("popstate", this.handlePopChange());
        if (this.useFragment) {
            window.addEventListener("hashchange", this.handleHashChange());
        }
        if (this.config.initialRouteID) {
            const route = this.routeForID(this.config.initialRouteID)!;
            this.route(
                this.format({
                    id: route.id,
                    title: route.title,
                })
            );
        } else {
            this.route(this.useFragment ? location.hash : location.pathname);
        }
    }

    release() {
        window.removeEventListener("popstate", this.popHandler);
        if (this.useFragment) {
            window.removeEventListener("hashchange", this.hashHandler);
        }
    }

    /**
     * Like `BasicRouter.route()`, but takes additional arg to control
     * if this routing operation should manipulate the browser's `history`.
     * If called from userland, this normally is true. However, we want
     * to avoid this if called from this router's own event handlers.
     *
     * @param raw -
     * @param pushState -
     */
    route(src: string, pushState = true) {
        const old = this.current;
        const route = super.route(src);
        if (route && !equiv(route, old)) {
            this.currentPath = this.format(route);
            if (pushState) {
                history.pushState(
                    this.currentPath,
                    route.title || window.document.title || "",
                    this.currentPath
                );
            }
        }
        return route;
    }

    routeTo(route: string) {
        if (this.useFragment) {
            location.hash = route;
        }
        this.route(route);
    }

    format(id: PropertyKey, params?: any): string;
    format(match: Partial<RouteMatch>): string;
    format(...args: any[]) {
        let match;
        switch (args.length) {
            case 2:
                match = { id: args[0], params: args[1] };
                break;
            case 1:
                match = isString(args[0]) ? { id: args[0] } : args[0];
                break;
            default:
                illegalArity(args.length);
        }
        return super.format(match, this.useFragment);
    }

    protected handlePopChange() {
        return (this.popHandler =
            this.popHandler ||
            ((e: PopStateEvent) => {
                this.route(
                    e.state ||
                        (this.useFragment ? location.hash : location.pathname),
                    false
                );
            }).bind(this));
    }

    protected handleHashChange() {
        return (this.hashHandler =
            this.hashHandler ||
            ((e: HashChangeEvent) => {
                if (!this.ignoreHashChange) {
                    const hash = e.newURL.substr(e.newURL.indexOf("#"));
                    if (hash !== this.currentPath) {
                        this.route(hash, false);
                    }
                }
            }).bind(this));
    }

    protected handleRouteFailure() {
        this.ignoreHashChange = true;
        location.hash = this.format({
            id: this.routeForID(this.config.defaultRouteID)!.id,
        });
        this.ignoreHashChange = false;
        return true;
    }
}
