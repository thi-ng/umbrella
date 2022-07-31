import type { Keys } from "@thi.ng/api";
import { DGraph } from "@thi.ng/dgraph";
import { ILifecycle, LOGGER, SystemMap, SystemSpecs } from "./api.js";

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
	 * Initializes all system components in dependency order. If any
	 * component's `start()` method returns false, system start up will
	 * be stopped and this method returns false itself.
	 *
	 * Also any errors thrown during child component startup will not be
	 * intercepted.
	 */
	async start() {
		for (let id of this.topology) {
			const comp = this.components[id];
			if (comp.start && !(await comp.start())) {
				LOGGER.warn(`error starting component: ${String(id)}`);
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
		const topo = this.topology;
		for (let i = topo.length; i-- > 0; ) {
			const id = topo[i];
			const comp = this.components[id];
			if (comp.stop && !(await comp.stop())) {
				LOGGER.warn(`error stopping component: ${String(id)}`);
			}
		}
		return true;
	}

	/**
	 * Syntax sugar for `stop() && start()` sequence.
	 */
	async reset() {
		return (await this.stop()) && (await this.start());
	}
}
