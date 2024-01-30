import type { Keys } from "@thi.ng/api";
import { DGraph } from "@thi.ng/dgraph";
import {
	LOGGER,
	type ILifecycle,
	type SystemMap,
	type SystemSpecs,
} from "./api.js";

/**
 * Syntax sugar for {@link System} constructor.
 *
 * @param map
 */
export const defSystem = <T extends SystemMap<T>>(map: SystemSpecs<T>) =>
	new System<T>(map);

export class System<T extends SystemMap<T>> implements ILifecycle {
	components: T;
	topology: Keys<T>[];
	graph: DGraph<Keys<T>>;

	constructor(map: SystemSpecs<T>) {
		this.graph = new DGraph<Keys<T>>();
		for (let id in map) {
			const deps = map[id].deps;
			deps
				? this.graph.addDependencies(<Keys<T>>id, deps)
				: this.graph.addNode(<Keys<T>>id);
		}
		this.topology = this.graph.sort();
		this.components = <any>{};
		for (let id of this.topology) {
			this.components[id] = <any>map[id].factory(this.components);
		}
	}

	/**
	 * Initializes all system components in dependency order. If any component's
	 * `start()` method returns false, system start up will be stopped, any
	 * already started components will be stopped (in reverse order) and this
	 * method returns false itself.
	 *
	 * @remarks
	 * Any errors thrown during child component startup (or shutdown) will
	 * **not** be intercepted.
	 */
	async start() {
		const topo = this.topology;
		for (let i = 0; i < topo.length; i++) {
			const id = topo[i];
			const comp = this.components[id];
			if (comp.start && !(await comp.start())) {
				LOGGER.warn(`error starting component: ${String(id)}`);
				await this.__stop(topo, i);
				return false;
			}
		}
		return true;
	}

	/**
	 * Stops all system components in reverse dependency order. If any
	 * component's `stop()` method returns false, a warning message will
	 * be logged, but unlike {@link System.start}, the shutdown
	 * process of other components will not be stopped.
	 *
	 * Any errors thrown during child component shutdown will not be
	 * intercepted.
	 */
	async stop() {
		return this.__stop(this.topology);
	}

	/**
	 * Syntax sugar for `stop() && start()` sequence. The restart phase will
	 * only be executed if **all** components could be stopped successfully.
	 */
	async reset() {
		return (await this.stop()) && (await this.start());
	}

	/**
	 * Calls {@link ILifecycle.stop} on the `n` first items in given topo array
	 * (in reverse order).
	 *
	 * @param topo
	 * @param n
	 */
	protected async __stop(topo: Keys<T>[], n = topo.length) {
		let result = true;
		for (let i = n; i-- > 0; ) {
			const id = topo[i];
			const comp = this.components[id];
			if (comp.stop && !(await comp.stop())) {
				LOGGER.warn(`error stopping component: ${String(id)}`);
				result = false;
			}
		}
		return result;
	}
}
