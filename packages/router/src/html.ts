// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import type { HTMLRouterOpts } from "./api.js";
import { Router } from "./router.js";

export class HTMLRouter<T = any> extends Router<T> {
	protected currentPath!: string;
	protected popHandler!: Fn<PopStateEvent, void>;
	protected hashHandler!: EventListener;
	protected useFragment: boolean;

	constructor(config: HTMLRouterOpts) {
		super({ prefix: config.useFragment !== false ? "#/" : "/", ...config });
		this.useFragment = config.useFragment !== false;
	}

	start() {
		window.addEventListener("popstate", this.handlePopChange());
		if (this.useFragment) {
			window.addEventListener("hashchange", this.handleHashChange());
		}
		if (this.opts.initial) {
			const route = this.routeForID(this.opts.initial)!;
			this.route(this.format({ id: route.id }), undefined, "replace");
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
	 * Like {@link Router.route}, but takes additional arg to control if this
	 * routing operation should manipulate the browser's `history`.
	 *
	 * @remarks
	 * If called from userland, this normally is set to "push" (also the
	 * default). However, we want to adjust this behavior if called internally.
	 *
	 * @param src -
	 * @param ctx -
	 * @param mode -
	 */
	route(src: string, ctx?: T, mode: "push" | "replace" | "none" = "push") {
		const old = this.current;
		const route = super.route(src, ctx);
		if (route && !equiv(route, old)) {
			// always use correct order of URL parts: path → search → hash
			// https://www.rfc-editor.org/rfc/rfc3986#section-3
			this.currentPath = this.useFragment
				? location.search + this.format(route)
				: this.format(route) + location.search;
			if (mode === "push") {
				history.pushState(this.currentPath, "", this.currentPath);
			} else if (mode === "replace") {
				history.replaceState(this.currentPath, "", this.currentPath);
			}
		}
		return route;
	}

	routeTo(route: string, ctx?: T) {
		if (this.useFragment) {
			location.hash = route;
		}
		this.route(route, ctx);
	}

	protected handlePopChange() {
		return (this.popHandler =
			this.popHandler ||
			((e: PopStateEvent) => {
				this.route(
					e.state ||
						(this.useFragment ? location.hash : location.pathname),
					undefined,
					"none"
				);
			}).bind(this));
	}

	protected handleHashChange() {
		return (this.hashHandler =
			this.hashHandler ||
			((e: HashChangeEvent) => {
				if (!this.current?.redirect) {
					const hash = e.newURL.substring(e.newURL.indexOf("#"));
					if (hash !== this.currentPath) {
						this.route(hash, undefined, "none");
					}
				}
			}).bind(this));
	}
}
