import { IObjectOf } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { DEBUG, ISubscribableSubscriber, ISubscriber } from "./api";
import { Subscription } from "./subscription";
import { unsupported } from "@thi.ng/api/error";

export interface PubSubOpts<A, B> {
    topic: (x: B) => PropertyKey;
    xform?: Transducer<A, B>;
    id?: string;
}

export class PubSub<A, B> extends Subscription<A, B> {

    topicfn: (x: B) => PropertyKey;
    topics: IObjectOf<Subscription<B, B>>;

    constructor(opts?: PubSubOpts<A, B>) {
        opts = opts || <PubSubOpts<A, B>>{};
        super(null, opts.xform, null, opts.id || `pubsub-${Subscription.NEXT_ID++}`);
        this.topicfn = opts.topic;
        this.topics = {};
    }

    /**
     * Unsupported. Use `subscribeTopic()` instead.
     *
     * @param _
     */
    subscribe(..._: any[]): Subscription<B, any> {
        unsupported(`use subscribeTopic() instead`);
        return null;
    }

    /**
     * Unsupported. Use `subscribeTopic()` instead.
     *
     * @param _
     */
    transform(..._: any[]): Subscription<B, any> {
        unsupported(`use subscribeTopic() instead`);
        return null;
    }

    subscribeTopic(topicID: PropertyKey, sub: Partial<ISubscriber<B>>, id?: string): Subscription<B, B>;
    subscribeTopic<C>(topicID: PropertyKey, tx: Transducer<B, C>, id?: string): Subscription<B, C>;
    subscribeTopic(topicID: PropertyKey, sub: any, id?: string): Subscription<any, any> {
        let t = this.topics[topicID];
        if (!t) {
            t = this.topics[topicID] = new Subscription<B, B>();
        }
        return t.subscribe(sub, id);
    }

    unsubscribeTopic(topicID: string, sub: Subscription<B, any>) {
        let t = this.topics[topicID];
        if (t) {
            return t.unsubscribe(sub);
        }
        return false;
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            const topics = this.topics;
            for (let id in this.topics) {
                topics[id].unsubscribe();
                delete this.topics[id];
            }
            return super.unsubscribe();
        }
        unsupported();
        return false;
    }

    done() {
        super.done();
        for (let id in this.topics) {
            this.topics[id].done();
        }
    }

    protected dispatch(x: B) {
        DEBUG && console.log(this.id, "dispatch", x);
        const t = this.topicfn(x);
        if (t != null) {
            const sub = this.topics[t];
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