import type { Fn, Predicate2 } from "@thi.ng/api";
import { EquivMap } from "@thi.ng/associative";
import { unsupported } from "@thi.ng/errors";
import type { Transducer } from "@thi.ng/transducers";
import {
    CloseMode,
    CommonOpts,
    ISubscriber,
    LOGGER,
    SubscriptionOpts,
    WithErrorHandlerOpts,
} from "./api";
import { Subscription, subscription } from "./subscription";
import { optsWithID } from "./utils/idgen";

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
 * they're matched against registered topics using {@link @thi.ng/equiv#equiv}
 * by default (but customizable via `equiv` option). Each topic can have any
 * number of subscribers.
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
export const pubsub = <A, B, T = any>(opts: PubSubOpts<A, B, T>) =>
    new PubSub(opts);

/**
 * @see {@link pubsub} for reference & examples.
 */
export class PubSub<A, B, T = any> extends Subscription<A, B> {
    topicfn: Fn<B, T>;
    topics: EquivMap<T, Subscription<B, B>>;

    constructor(opts: PubSubOpts<A, B, T>) {
        super(
            undefined,
            optsWithID("pubsub", <Partial<SubscriptionOpts<A, B>>>{
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
        opts?: Partial<CommonOpts>
    ): Subscription<B, C>;
    subscribeTopic(
        topicID: T,
        sub: ISubscriber<B>,
        opts?: Partial<CommonOpts>
    ): Subscription<B, B>;
    subscribeTopic(
        topicID: T,
        sub: any,
        opts?: Partial<CommonOpts>
    ): Subscription<any, any> {
        let t = this.topics.get(topicID);
        !t &&
            this.topics.set(
                topicID,
                (t = subscription<B, B>(undefined, {
                    closeOut: CloseMode.NEVER,
                }))
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

    unsubscribeTopic(topicID: T, sub: Subscription<B, any>) {
        const t = this.topics.get(topicID);
        return t ? t.unsubscribe(sub) : false;
    }

    unsubscribe(sub: Subscription<B, any>) {
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
        const t = this.topicfn(x);
        if (t !== undefined) {
            const sub = this.topics.get(t);
            if (sub) {
                try {
                    sub.next && sub.next(x);
                } catch (e) {
                    sub.error ? sub.error(e) : this.error(e);
                }
            }
        }
    }
}
