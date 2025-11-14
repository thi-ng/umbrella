// SPDX-License-Identifier: Apache-2.0
import {
	INotifyMixin,
	type Event,
	type IClear,
	type INotify,
	type IObjectOf,
	type Listener,
	type Predicate,
} from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { NULL_LOGGER } from "@thi.ng/logger/null";
import { existsSync, watch, type FSWatcher } from "node:fs";
import { join } from "node:path";
import { isDirectory } from "./dir.js";
import { __ensurePred } from "./internal/ensure.js";
import { maskedPath } from "./mask.js";

export interface WatcherOpts {
	/**
	 * Number of milliseconds between observing a file change and notifying
	 * attached listeners.
	 *
	 * @defaultValue 100
	 */
	delay: number;
	/**
	 * Logger instance for showing debug info (must have DEBUG level enabled)
	 */
	logger: ILogger;
}

export interface PathWatchOpts {
	/**
	 * If enabled (default) and if the path refers to a directory, any file
	 * changes within that dir (or any subdir) will trigger an event.
	 */
	recursive: boolean;
	/**
	 * File extension filter. If given, events are only triggered for paths
	 * matching this filter.
	 */
	ext: string | RegExp | Predicate<string>;
}

export const EVENT_ADDED = "added";
export const EVENT_CHANGED = "changed";
export const EVENT_REMOVED = "removed";

@INotifyMixin
export class Watcher implements IClear, INotify {
	watchers: IObjectOf<FSWatcher> = {};
	opts: WatcherOpts;

	protected _signal = false;

	constructor(opts?: Partial<WatcherOpts>) {
		this.opts = {
			logger: NULL_LOGGER,
			delay: 100,
			...opts,
		};
	}

	addAll(paths: (string | [string, Partial<PathWatchOpts>])[]) {
		for (let p of paths) {
			isString(p) ? this.add(p) : this.add(...p);
		}
	}

	add(path: string, opts?: Partial<PathWatchOpts>) {
		if (this.watchers[path]) return false;
		const isDir = isDirectory(path);
		const pred = __ensurePred(opts?.ext || "");
		this.opts.logger.debug(`adding watcher for:`, maskedPath(path));
		this.watchers[path] = watch(
			path,
			{ recursive: opts?.recursive !== false },
			(event, currPath) => {
				if (!currPath) return;
				currPath = isDir ? join(path, currPath) : path;
				if (!pred(currPath)) return;
				setTimeout(() => {
					const mpath = maskedPath(currPath);
					if (event === "change") {
						this.opts.logger.info(`file changed: ${mpath}`);
						this.notify({
							id: EVENT_CHANGED,
							value: currPath,
						});
					} else if (!isDir || path === currPath) {
						this.opts.logger.info(`file removed: ${mpath}`);
						this.notify({ id: EVENT_REMOVED, value: path });
						this.remove(path);
					} else {
						// from here on, we're inside a directory...
						// check if file has been added or removed
						const id = existsSync(currPath!)
							? EVENT_ADDED
							: EVENT_REMOVED;
						this.opts.logger.info(`file ${id}: ${mpath}`);
						this.notify({ id, value: currPath });
					}
				}, this.opts.delay);
			}
		);
		return true;
	}

	remove(path: string) {
		const watcher = this.watchers[path];
		if (!watcher) return false;
		this.opts.logger.debug(`removing watcher for:`, maskedPath(path));
		watcher.close();
		delete this.watchers[path];
		return true;
	}

	removeAll(paths: Iterable<string>) {
		for (let p of paths) {
			this.remove(p);
		}
	}

	clear() {
		this.removeAll(Object.keys(this.watchers));
	}

	installSignalHandler() {
		if (!this._signal) {
			process.on("SIGINT", () => this.clear());
			this._signal = true;
		}
	}

	// @ts-ignore mixin
	addListener(id: string, fn: Listener<string>, scope?: any): boolean {}

	// @ts-ignore mixin
	removeListener(id: string, fn: Listener<string>, scope?: any): boolean {}

	// @ts-ignore mixin
	notify(event: Event<string>): boolean {}
}

/**
 * Creates a new {@link Watcher} instance with given options.
 *
 * @param opts
 */
export const fileWatcher = (opts?: Partial<WatcherOpts>) => new Watcher(opts);
