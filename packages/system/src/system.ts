import type { Keys } from "@thi.ng/api";
import { DGraph } from "@thi.ng/dgraph";
import type { ILifecycle, SystemMap, SystemSpecs } from "./api";

export const defSystem = <T extends SystemMap<T>>(map: SystemSpecs<T>) =>
    new System<T>(map);

export class System<T extends SystemMap<T>> implements ILifecycle {
    components: T;
    topology: Keys<T>[];

    constructor(map: SystemSpecs<T>) {
        const graph = new DGraph<Keys<T>>();
        for (let id in map) {
            const deps = map[id].deps;
            if (deps) {
                for (let d of deps) {
                    graph.addDependency(<Keys<T>>id, d);
                }
            } else {
                graph.addNode(<Keys<T>>id);
            }
        }
        this.topology = graph.sort();
        this.components = <any>{};
        for (let id of this.topology) {
            this.components[id] = <any>map[id].factory(this.components);
        }
    }

    async start() {
        for (let id of this.topology) {
            if (!(await this.components[id].start())) {
                console.warn(`error starting component: ${id}`);
            }
        }
        return true;
    }

    async stop() {
        for (let id of this.topology.slice().reverse()) {
            if (!(await this.components[id].stop())) {
                console.warn(`error stopping component: ${id}`);
            }
        }
        return true;
    }

    async reset() {
        return (await this.stop()) && (await this.start());
    }
}
