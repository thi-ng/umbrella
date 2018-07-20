import { Predicate2 } from "@thi.ng/api/api";
import { EquivMap } from "@thi.ng/associative/equiv-map";
import { unsupported } from "@thi.ng/errors/unsupported";
import { Transducer } from "@thi.ng/transducers/api";

import { DEBUG, ISubscriber } from "./api";
import { Subscription } from "./subscription";

export interface PubSubOpts<A, B> {
    /**
     * Topic function. Incoming values will be routed to topic
     * subscriptions using this function's return value.
     */
    topic: (x: B) => any;
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
    equiv?: Predicate2<B>;
    /**
     * Optional subscription ID for the PubSub instance.
     */
    id?: string;
}

/**
 * Topic based stream splitter. Applies `topic` function to each
 * received value and only forwards it to child subscriptions for
 * returned topic. The actual topic (return value from `topic` fn) can
 * be of any type, apart from `undefined`. Complex topics (e.g objects /
 * arrays) are allowed and they're matched with registered topics using
 * @thi.ng/equiv by default (but customizable via `equiv` option).
 * Each topic can have any number of subscribers.
 *
 * If a transducer is specified for the `PubSub`, it is always applied
 * prior to passing the input to the topic function. I.e. in this case
 * the topic function will receive the transformed inputs.
 *
 * PubSub supports dynamic topic subscriptions and unsubscriptions via
 * `subscribeTopic()` and `unsubscribeTopic()`. However, the standard
 * `subscribe()` / `unsubscribe()` methods are NOT supported (since
 * meaningless) and will throw an error! `unsubscribe()` can only be
 * called WITHOUT argument to unsubscribe the entire `PubSub` instance
 * (incl. all topic subscriptions) from the parent stream.
 */
export class PubSub<A, B> extends Subscription<A, B> {

    topicfn: (x: B) => any;
    topics: EquivMap<any, Subscription<B, B>>;

    constructor(opts?: PubSubOpts<A, B>) {
        opts = opts || <PubSubOpts<A, B>>{};
        super(null, opts.xform, null, opts.id || `pubsub-${Subscription.NEXT_ID++}`);
        this.topicfn = opts.topic;
        this.topics = new EquivMap<any, Subscription<B, B>>(null, { equiv: opts.equiv });
    }

    /**
     * Unsupported. Use `subscribeTopic()` instead.
     */
    subscribe(): Subscription<B, any> {
        unsupported(`use subscribeTopic() instead`);
        return null;
    }

    /**
     * Unsupported. Use `subscribeTopic()` instead.
     */
    transform(): Subscription<B, any> {
        unsupported(`use subscribeTopic() instead`);
        return null;
    }

    subscribeTopic<C>(topicID: any, tx: Transducer<B, C>, id?: string): Subscription<B, C>;
    // subscribeTopic<S extends Subscription<B, C>, C>(topicID: any, sub: S): S;
    subscribeTopic<C>(topicID: any, sub: Subscription<B, C>): Subscription<B, C>;
    subscribeTopic(topicID: any, sub: Partial<ISubscriber<B>>, id?: string): Subscription<B, B>;
    subscribeTopic(topicID: any, sub: any, id?: string): Subscription<any, any> {
        let t = this.topics.get(topicID);
        if (!t) {
            this.topics.set(topicID, t = new Subscription<B, B>());
        }
        return t.subscribe(sub, id);
    }

    unsubscribeTopic(topicID: any, sub: Subscription<B, any>) {
        let t = this.topics.get(topicID);
        if (t) {
            return t.unsubscribe(sub);
        }
        return false;
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            for (let t of this.topics.values()) {
                t.unsubscribe();
            }
            this.topics.clear();
            return super.unsubscribe();
        }
        unsupported();
    }

    done() {
        for (let t of this.topics.values()) {
            t.done();
        }
        super.done();
    }

    protected dispatch(x: B) {
        DEBUG && console.log(this.id, "dispatch", x);
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

export function pubsub<A, B>(opts: PubSubOpts<A, B>) {
    return new PubSub(opts);
}