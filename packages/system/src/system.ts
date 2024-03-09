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
 * @param specs
 */
export const defSystem = <T extends SystemMap<T>>(specs: SystemSpecs<T>) =>
	new System<T>(specs);

export class System<T extends SystemMap<T>> implements ILifecycle<T> {
	components!: T;
	topology!: Keys<T>[];
	graph!: DGraph<Keys<T>>;

	constructor(protected specs: SystemSpecs<T>) {}

	/**
	 * Builds the system component dependency graph and initializes all
	 * components using their async {@link SystemSpec.factory} functions.
	 * Returns the initialized system.
	 */
	async init() {
		this.graph = new DGraph<Keys<T>>();
		for (let id in this.specs) {
			const deps = this.specs[id].deps;
			deps
				? this.graph.addDependencies(<Keys<T>>id, deps)
				: this.graph.addNode(<Keys<T>>id);
		}
		this.topology = this.graph.sort();
		this.components = <any>{};
		for (let id of this.topology) {
			this.components[id] = <any>(
				await this.specs[id].factory(this.components)
			);
		}
		return this;
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
		if (!this.graph) await this.init();
		const topo = this.topology;
		for (let i = 0; i < topo.length; i++) {
			const id = topo[i];
			const comp = this.components[id];
			if (comp.start) {
				LOGGER.debug("starting:", id);
				if (!(await comp.start(this))) {
					LOGGER.warn(`error starting component: ${String(id)}`);
					await this.__stop(topo, i);
					return false;
				}
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
			if (comp.stop) {
				LOGGER.debug("stopping:", id);
				if (!(await comp.stop(this))) {
					LOGGER.warn(`error stopping component: ${String(id)}`);
					result = false;
				}
			}
		}
		return result;
	}
}
