import { Fn } from "@thi.ng/api";
import { Subscription } from "./subscription";
import { nextID } from "./utils/idgen";

/**
 * A `MetaStream` is a subscription type which transforms each incoming
 * value into a new stream, subscribes to it (via an hidden / internal
 * subscription) and then only passes values from that stream to its own
 * subscribers. If a new value is received, the meta stream first
 * unsubscribes from any still active stream, before creating and
 * subscribing to the new stream. Hence this stream type is useful for
 * cases where streams need to be dynamically created & inserted into an
 * existing dataflow topology.
 *
 * The user supplied `factory` function will be called for each incoming
 * value and is responsible for creating the new stream instances. If
 * the function returns null/undefined, no further action will be taken
 * (acts like a filter transducer).
 *
 * ```
 * a = metastream((x) => (x & 1) ? fromIterable(tx.repeat(x, 3), 100) : null)
 *
 * a.subscribe(trace())
 * a.next(23)
 *
 * // 23
 * // 23
 * // 23
 *
 * a.next(42) // ignored by factory fn
 *
 * a.next(43)
 * // 43
 * // 43
 * // 43
 * ```
 *
 * The factory function does NOT need to create new streams, but can
 * only merely return other existing streams, and so making the meta
 * stream act like a switch.
 *
 * If the meta stream is the only subscriber to these input streams,
 * you'll need to add a dummy subscription to each in order to keep them
 * alive and support dynamic switching between them. See issue #74
 *
 * ```
 * a = fromIterable(tx.repeat("a"), 1000, false);
 * b = fromIterable(tx.repeat("b"), 1000, false);
 *
 * // dummy subscriptions
 * a.subscribe({})
 * b.subscribe({})
 *
 * m = metaStream((x) => x ? a : b);
 * m.subscribe(trace("meta from: "));
 *
 * m.next(true);
 * // meta from: a
 * // meta from: a
 *
 * m.next(false);
 * // meta from: b
 * // meta from: b
 * ```
 *
 * @param factory
 * @param id
 */
export const metaStream = <A, B>(
    factory: Fn<A, Subscription<B, B>>,
    id?: string
) => new MetaStream(factory, id);

export class MetaStream<A, B> extends Subscription<A, B> {
    factory: Fn<A, Subscription<B, B>>;
    stream: Subscription<B, B>;
    sub: Subscription<B, B>;

    constructor(factory: Fn<A, Subscription<B, B>>, id?: string) {
        super(null, null, null, id || `metastram-${nextID()}`);
        this.factory = factory;
    }

    next(x: A) {
        if (this.stream) {
            this.stream.unsubscribe(this.sub);
        }
        let stream = this.factory(x);
        if (stream) {
            this.stream = stream;
            this.sub = this.stream.subscribe({
                next: (x) => {
                    stream === this.stream && super.dispatch(x);
                },
                done: () => {
                    this.stream.unsubscribe(this.sub);
                    if (stream === this.stream) {
                        this.stream = null;
                        this.sub = null;
                    }
                },
                error: (e) => super.error(e)
            });
        }
    }

    done() {
        if (this.stream) {
            this.stream.unsubscribe(this.sub);
            delete this.stream;
            delete this.sub;
        }
        super.done();
    }
}
