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
			factory: async (deps) => new DB(deps.logger, deps.state),
			deps: ["logger", "state"],
		},
		logger: { factory: async () => new Logger() },
		state: {
			factory: async ({ logger }) => new Cache(logger),
			deps: ["logger"],
		},
		dummy: {
			factory: async ({ logger }) => ({
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

	const sys = await defSystem<{ foo: Foo; bar: { foo: Foo } }>({
		foo: { factory: async () => ({ x: 42 }) },
		bar: { factory: async ({ foo }) => ({ foo }), deps: ["foo"] },
	}).init();
	expect(sys.components.foo).toBe(sys.components.bar.foo);
	await sys.start();
	await sys.stop();
});

test("failed start, stop existing", async () => {
	interface Foo {
		a: ILifecycle;
		b: ILifecycle;
		c: ILifecycle;
	}

	const order: string[] = [];
	const fn = (id: string) => async () => {
		order.push(id);
		return true;
	};

	const sys = defSystem<Foo>({
		a: { factory: async () => ({ start: fn("a1"), stop: fn("a2") }) },
		b: {
			factory: async () => ({ start: fn("b1"), stop: fn("b2") }),
			deps: ["a"],
		},
		c: {
			factory: async () => ({
				start: async () => {
					order.push("c");
					return false;
				},
			}),
			deps: ["a", "b"],
		},
	});

	expect(await sys.start()).toBe(false);
	expect(order).toEqual(["a1", "b1", "c", "b2", "a2"]);
});

test("pass system to lifecycle", async () => {
	interface App {
		foo: ILifecycle<App>;
	}

	const sys = defSystem<App>({
		foo: {
			factory: async () => ({
				start: async (sys) => {
					expect(sys.components.foo).toBeDefined();
					return true;
				},
				stop: async (sys) => {
					expect(sys.components.foo).toBeDefined();
					return true;
				},
			}),
		},
	});

	expect(await sys.start()).toBeTrue();
	expect(await sys.stop()).toBeTrue();
});
