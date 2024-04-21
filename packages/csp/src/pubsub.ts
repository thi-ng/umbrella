import type { IObjectOf } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { IWriteableChannel, TopicFn } from "./api.js";
import { Mult } from "./mult.js";
import { ChannelV3 } from "./v3.js";

export class PubSub<T> implements IWriteableChannel<T> {
	protected src!: ChannelV3<T>;
	protected fn!: TopicFn<T>;
	protected topics: IObjectOf<Mult<T>>;

	constructor(fn: TopicFn<T>);
	constructor(src: ChannelV3<T>, fn: TopicFn<T>);
	constructor(...args: any[]) {
		switch (args.length) {
			case 2:
				this.src = args[0];
				this.fn = args[1];
				break;
			case 1:
				this.src = new ChannelV3<T>();
				this.fn = args[0];
				break;
			default:
				illegalArity(args.length);
		}
		this.topics = {};
		this.process();
	}

	write(val: T) {
		return this.src ? this.src.write(val) : Promise.resolve(false);
	}

	close() {
		return this.src ? this.src.close() : undefined;
	}

	/**
	 * Creates a new topic subscription channel and returns it.
	 * Each topic is managed by its own {@link Mult} and can have arbitrary
	 * number of subscribers. If the optional transducer is given, it will
	 * only be applied to the new subscription channel.
	 *
	 * The special "*" topic can be used to subscribe to all messages and
	 * acts as multiplexed pass-through of the source channel.
	 *
	 * @param id - topic id
	 * @param tx - transducer for new subscription
	 */
	sub(id: string) {
		let topic = this.topics[id];
		if (!topic) {
			this.topics[id] = topic = new Mult(`${this.src.id}-${id}`);
		}
		return topic.tap();
	}

	unsub(id: string, ch: ChannelV3<T>) {
		const topic = this.topics[id];
		return topic?.untap(ch) ?? false;
	}

	unsubAll(id: string, close = true) {
		const topic = this.topics[id];
		return topic?.untapAll(close) ?? false;
	}

	protected async process() {
		let x;
		while ((x = await this.src.read()) !== undefined) {
			const id = this.fn(x);
			let topic = this.topics[id];
			topic && (await topic.write(x));
			// topic = this.topics["*"];
			// topic && (await topic.write(x));
			x = null;
		}
		for (let id of Object.keys(this.topics)) {
			this.topics[id].close();
		}
		delete (<any>this).src;
		delete (<any>this).topics;
		delete (<any>this).fn;
	}
}
