import type { Fn, Predicate2 } from "@thi.ng/api";
import { EquivMap } from "@thi.ng/associative/equiv-map";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { Transducer } from "@thi.ng/transducers";
import {
	CloseMode,
	type ISubscriber,
	type ISubscription,
	type SubscriptionOpts,
	type TransformableOpts,
	type WithErrorHandlerOpts,
} from "./api.js";
import { __optsWithID } from "./idgen.js";
import { LOGGER } from "./logger.js";
import { Subscription, subscription } from "./subscription.js";

export interface PubSubOpts<A, B, T> {
	/**
	 * Topic function. Incoming values will be routed to topic
	 * subscriptions using this function's return value.
	 */
	topic: Fn<B, T>;
	/**
	 * Optional transformer for incoming values. If given, `xform` will
	 * be applied first and the transformed value passed to the
	 * `topic` fn.
	 */
	xform?: Transducer<A, B>;
	/**
	 * Equivalence check for topic values. Should return truthy result
	 * if given topics are considered equal.
	 */
	equiv?: Predicate2<T>;
	/**
	 * Optional subscription ID for the PubSub instance.
	 */
	id?: string;
}

/**
 * Topic based stream splitter. Applies `topic` function to each received value
 * and only forwards it to the child subscriptions of the returned topic.
 *
 * @remarks
 * The actual topic (return value from `topic` fn) can be of any type `T`, or
 * `undefined`. If the latter is returned, the incoming value will not be
 * processed further. Complex topics (e.g objects / arrays) are allowed and
 * they're matched against registered topics using
 * [`equiv()`](https://docs.thi.ng/umbrella/equiv/functions/equiv.html) by
 * default (but customizable via `equiv` option). Each topic can have any number
 * of subscribers.
 *
 * If a `xform` transducer is given, it is always applied prior to passing the
 * input to the topic function. I.e. in this case the topic function will
 * receive the transformed inputs.
 *
 * {@link PubSub} supports dynamic topic subscriptions and unsubscriptions via
 * {@link PubSub.(subscribeTopic:1)} and {@link PubSub.unsubscribeTopic}.
 * However, the standard {@link ISubscribable.(subscribe:1)} /
 * {@link ISubscribable.unsubscribe} methods are NOT supported (since
 * meaningless) and will throw an error! `unsubscribe()` can only be called
 * WITHOUT argument to unsubscribe the entire `PubSub` instance (incl. all topic
 * subscriptions) from the parent stream.
 *
 * @param opts -
 */
export const pubsub = <A, B = A, T = any>(opts: PubSubOpts<A, B, T>) =>
	new PubSub(opts);

/**
 * @see {@link pubsub} for reference & examples.
 */
export class PubSub<A, B = A, T = any> extends Subscription<A, B> {
	topicfn: Fn<B, T>;
	topics: EquivMap<T, Subscription<B, B>>;

	constructor(opts: PubSubOpts<A, B, T>) {
		super(
			undefined,
			__optsWithID("pubsub", <Partial<SubscriptionOpts<A, B>>>{
				xform: opts.xform,
			})
		);
		this.topicfn = opts.topic;
		this.topics = new EquivMap<T, Subscription<B, B>>(undefined, {
			equiv: opts.equiv,
		});
	}

	/**
	 * Unsupported. Use {@link PubSub.(subscribeTopic:1)} instead.
	 */
	subscribe(): Subscription<B, any> {
		return unsupported(`use subscribeTopic() instead`);
	}

	/**
	 * Unsupported. Use {@link PubSub.(subscribeTopic:1)} instead.
	 */
	transform(): Subscription<B, any> {
		return unsupported(`use subscribeTopic() instead`);
	}

	subscribeTopic<C>(
		topicID: T,
		opts?: Partial<TransformableOpts<B, C>>
	): ISubscription<B, C>;
	subscribeTopic<C>(
		topicID: T,
		sub: ISubscriber<C>,
		opts?: Partial<TransformableOpts<B, C>>
	): ISubscription<B, C>;
	subscribeTopic(
		topicID: T,
		sub: any,
		opts?: Partial<TransformableOpts<any, any>>
	): ISubscription<any, any> {
		let t = this.topics.get(topicID);
		!t &&
			this.topics.set(
				topicID,
				(t = subscription(
					undefined,
					__optsWithID("topic", {
						closeOut: CloseMode.NEVER,
					})
				))
			);
		return t.subscribe(sub, opts);
	}

	transformTopic<C>(
		topicID: T,
		xform: Transducer<B, C>,
		opts: Partial<WithErrorHandlerOpts> = {}
	) {
		return this.subscribeTopic(
			topicID,
			<ISubscriber<B>>{ error: opts.error },
			<any>{
				...opts,
				xform,
			}
		);
	}

	unsubscribeTopic(topicID: T, sub: ISubscription<B, any>) {
		const t = this.topics.get(topicID);
		return t ? t.unsubscribe(sub) : false;
	}

	unsubscribe(sub?: ISubscription<B, any>) {
		if (!sub) {
			for (let t of this.topics.values()) {
				t.unsubscribe();
			}
			this.topics.clear();
			return super.unsubscribe();
		}
		// only the PubSub itself can be unsubscribed
		return unsupported();
	}

	done() {
		for (let t of this.topics.values()) {
			t.done();
		}
		super.done();
	}

	protected dispatch(x: B) {
		LOGGER.debug(this.id, "dispatch", x);
		this.cacheLast && (this.last = x);
		const t = this.topicfn(x);
		if (t !== undefined) {
			const sub = this.topics.get(t);
			if (sub) {
				try {
					sub.next && sub.next(x);
				} catch (e) {
					if (!sub.error || !sub.error(e)) {
						return this.unhandledError(e);
					}
				}
			}
		}
	}
}
