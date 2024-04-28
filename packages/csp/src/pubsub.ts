import type { IObjectOf } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { IClosable, IWriteable, TopicFn } from "./api.js";
import { Channel } from "./channel.js";
import { Mult } from "./mult.js";

/**
 * Syntax sugar for {@link PubSub} ctor. Creates a new `PubSub` which allows
 * multiple child subscriptions, based on given topic function.
 *
 * @remarks
 * The topic function will be called for each received value and its result is
 * used to determine which child subscription should receive the value. New
 * topic (un)subscriptions can be created dynamically via
 * {@link PubSub.subscribeTopic} and {@link PubSub.unsubscribeTopic} or
 * {@link PubSub.unsubscribeAll}. Each topic subscription is a {@link Mult},
 * which itself allows for multiple child subscriptions.
 *
 * @param fn
 */
export function pubsub<T>(fn: TopicFn<T>): PubSub<T>;
export function pubsub<T>(src: Channel<T>, fn: TopicFn<T>): PubSub<T>;
export function pubsub(...args: any[]) {
	return new PubSub(...(<[any]>args));
}

export class PubSub<T> implements IWriteable<T>, IClosable {
	protected src!: Channel<T>;
	protected fn!: TopicFn<T>;
	protected topics: IObjectOf<Mult<any>>;

	/**
	 * See {@link pubsub} for reference.
	 *
	 * @param fn
	 */
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
	subscribeTopic<S extends T = T>(id: string) {
		let topic = this.topics[id];
		if (!topic) {
			this.topics[id] = topic = new Mult(`${this.src.id}-${id}`);
		}
		return <Channel<S>>topic.subscribe();
	}

	/**
	 * Attempts to remove a subscription channel for given topic `id`. Returns
	 * true if successful. If `close` is true (default), the given channel will
	 * also be closed (only if unsubscription was successful).
	 *
	 * @remarks
	 * See {@link Mult.subscribe} for reverse op.
	 *
	 * @param id
	 * @param ch
	 * @param close
	 */
	unsubscribeTopic<S extends T = T>(
		id: string,
		ch: Channel<S>,
		close = true
	) {
		const topic = this.topics[id];
		return topic?.unsubscribe(ch, close) ?? false;
	}

	/**
	 * Removes all child subscription channels for given topic `id` and if
	 * `close` is true (default) also closes them.
	 *
	 * @param close
	 */
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
