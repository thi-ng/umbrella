import { IObjectOf, Fn, Keys } from "@thi.ng/api";
import { DGraph } from "@thi.ng/dgraph";

interface IComponent {
    start(): boolean;
    stop(): boolean;
}

class Logger implements IComponent {
    info(msg: string) {
        console.log(`[info] ${msg}`);
    }
    start() {
        this.info("start logger");
        return true;
    }
    stop() {
        this.info("stop logger");
        return true;
    }
}

class DB implements IComponent {
    constructor(protected logger: Logger, protected state: State) {}

    start() {
        this.logger.info("start db");
        return true;
    }
    stop() {
        this.logger.info("stop db");
        return true;
    }
}

class State implements IComponent {
    constructor(protected logger: Logger) {}

    start() {
        this.logger.info("start state");
        return true;
    }
    stop() {
        this.logger.info("stop state");
        return true;
    }
}

type SystemMap<T> = Record<Keys<T>, IComponent>;

type ComponentFactory<T extends SystemMap<T>> = Fn<T, IComponent>;

type SystemSpecs<T extends SystemMap<T>> = IObjectOf<{
    factory: ComponentFactory<T>;
    deps?: Keys<T>[];
}>;

class System<T extends SystemMap<T>> {
    components: T;
    topo: Keys<T>[];

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
        this.topo = graph.sort();
        this.components = <any>{};
        for (let id of this.topo) {
            (<any>this.components)[id] = map[<any>id].factory(this.components);
        }
    }

    start() {
        for (let id of this.topo) {
            if (!this.components[id].start()) {
                console.warn(`error starting component: ${id}`);
            }
        }
    }
    stop() {
        for (let id of this.topo.slice().reverse()) {
            if (!this.components[id].stop()) {
                console.warn(`error stopping component: ${id}`);
            }
        }
    }
}

interface FooSys {
    db: DB;
    logger: Logger;
    state: State;
    dummy: IComponent;
}

const foo = new System<FooSys>({
    db: {
        factory: (deps) => new DB(<Logger>deps.logger, <State>deps.state),
        deps: ["logger", "state"],
    },
    logger: { factory: () => new Logger() },
    state: {
        factory: (deps) => new State(<Logger>deps.logger),
        deps: ["logger"],
    },
    dummy: {
        factory: ({ logger }) => ({
            start: () => ((<Logger>logger).info("dummy start"), true),
            stop: () => ((<Logger>logger).info("dummy stop"), true),
        }),
    },
});

foo.start();

foo.stop();
