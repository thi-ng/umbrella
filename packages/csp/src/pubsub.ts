import type { IObjectOf } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { IClosable, IWriteable, TopicFn } from "./api.js";
import { Channel } from "./channel.js";
import { Mult } from "./mult.js";

export function pubsub<T>(fn: TopicFn<T>): PubSub<T>;
export function pubsub<T>(src: Channel<T>, fn: TopicFn<T>): PubSub<T>;
export function pubsub(...args: any[]) {
	return new PubSub(...(<[any]>args));
}

export class PubSub<T> implements IWriteable<T>, IClosable {
	protected src!: Channel<T>;
	protected fn!: TopicFn<T>;
	protected topics: IObjectOf<Mult<T>>;

	constructor(fn: TopicFn<T>);
	constructor(src: Channel<T>, fn: TopicFn<T>);
	constructor(...args: any[]) {
		switch (args.length) {
			case 2:
				this.src = args[0];
				this.fn = args[1];
				break;
			case 1:
				this.src = new Channel<T>();
				this.fn = args[0];
				break;
			default:
				illegalArity(args.length);
		}
		this.topics = {};
		this.process();
	}

	writable() {
		return this.src.writable();
	}

	write(val: T) {
		return this.src.write(val);
	}

	close() {
		return this.src.close();
	}

	closed() {
		return this.src.closed();
	}

	/**
	 * Creates a new topic subscription channel and returns it. Each topic is
	 * managed by its own {@link Mult} and can have arbitrary number of
	 * subscribers.
	 *
	 * @param id - topic id
	 */
	subscribeTopic(id: string) {
		let topic = this.topics[id];
		if (!topic) {
			this.topics[id] = topic = new Mult(`${this.src.id}-${id}`);
		}
		return topic.subscribe();
	}

	unsubscribeTopic(id: string, ch: Channel<T>) {
		const topic = this.topics[id];
		return topic?.unsubscribe(ch) ?? false;
	}

	unsubscribeAll(id: string, close = true) {
		const topic = this.topics[id];
		topic?.unsubscribeAll(close);
	}

	protected async process() {
		let x;
		while ((x = await this.src.read()) !== undefined) {
			const id = this.fn(x);
			let topic = this.topics[id];
			topic && (await topic.write(x));
			x = null;
		}
		for (let t of Object.values(this.topics)) {
			t.close();
		}
		this.topics = {};
	}
}
