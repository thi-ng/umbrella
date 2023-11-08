import { expect, test } from "bun:test";
import { defSystem, type ILifecycle } from "../src/index.js";

test("basic", async () => {
	const log: string[] = [];

	class Logger implements ILifecycle {
		info(msg: string) {
			log.push(msg);
		}
		async start() {
			this.info("start logger");
			return true;
		}
		async stop() {
			this.info("stop logger");
			return true;
		}
	}

	class DB implements ILifecycle {
		constructor(protected logger: Logger, protected state: Cache) {}

		async start() {
			this.logger.info("start db");
			return true;
		}
		async stop() {
			this.logger.info("stop db");
			return true;
		}
	}

	class Cache implements ILifecycle {
		constructor(protected logger: Logger) {}

		async start() {
			this.logger.info("start cache");
			return true;
		}
		async stop() {
			this.logger.info("stop cache");
			return true;
		}
	}

	interface FooSys {
		db: DB;
		logger: Logger;
		state: Cache;
		dummy: ILifecycle;
	}

	const foo = defSystem<FooSys>({
		db: {
			factory: (deps) => new DB(deps.logger, deps.state),
			deps: ["logger", "state"],
		},
		logger: { factory: () => new Logger() },
		state: {
			factory: ({ logger }) => new Cache(logger),
			deps: ["logger"],
		},
		dummy: {
			factory: ({ logger }) => ({
				async start() {
					logger.info("start dummy");
					return true;
				},
				async stop() {
					logger.info("stop dummy");
					return true;
				},
			}),
			deps: ["logger"],
		},
	});

	await foo.start();
	await foo.stop();

	expect(log).toEqual([
		"start logger",
		"start cache",
		"start dummy",
		"start db",
		"stop db",
		"stop dummy",
		"stop cache",
		"stop logger",
	]);
});

test("non-lifecycle objects", async () => {
	interface Foo {
		x: number;
	}

	const sys = defSystem<{ foo: Foo; bar: { foo: Foo } }>({
		foo: { factory: () => ({ x: 42 }) },
		bar: { factory: ({ foo }) => ({ foo }), deps: ["foo"] },
	});
	expect(sys.components.foo).toBe(sys.components.bar.foo);
	await sys.start();
	await sys.stop();
});
