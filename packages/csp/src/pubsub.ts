import type { IObjectOf } from "@thi.ng/api";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Transducer } from "@thi.ng/transducers";
import type { IWriteableChannel, TopicFn } from "./api";
import { Channel } from "./channel";
import { Mult } from "./mult";

export class PubSub<T> implements IWriteableChannel<T> {
    protected static NEXT_ID = 0;

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
                this.src = new Channel<T>("pubsub" + PubSub.NEXT_ID++);
                this.fn = args[0];
                break;
            default:
                illegalArity(args.length);
        }
        this.topics = {};
        this.process();
    }

    get id() {
        return this.src && this.src.id;
    }

    set id(id: string) {
        this.src && (this.src.id = id);
    }

    channel() {
        return this.src;
    }

    write(val: any) {
        if (this.src) {
            return this.src.write(val);
        }
        return Promise.resolve(false);
    }

    close(flush = false) {
        return this.src ? this.src.close(flush) : undefined;
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
    sub(id: string, tx?: Transducer<T, any>) {
        let topic = this.topics[id];
        if (!topic) {
            this.topics[id] = topic = new Mult(this.src.id + "-" + id);
        }
        return topic.tap(tx);
    }

    unsub(id: string, ch: Channel<T>) {
        let topic = this.topics[id];
        if (topic) {
            return topic.untap(ch);
        }
        return false;
    }

    unsubAll(id: string, close = true) {
        let topic = this.topics[id];
        if (topic) {
            return topic.untapAll(close);
        }
        return false;
    }

    protected async process() {
        let x;
        while (((x = null), (x = await this.src.read())) !== undefined) {
            const id = await this.fn(x);
            let topic = this.topics[id];
            topic && (await topic.write(x));
            topic = this.topics["*"];
            topic && (await topic.write(x));
        }
        for (let id of Object.keys(this.topics)) {
            this.topics[id].close();
        }
        delete (<any>this).src;
        delete (<any>this).topics;
        delete (<any>this).fn;
    }
}
