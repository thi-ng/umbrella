import type { Fn, Fn0, Fn2, FnAny, Nullable, Predicate } from "@thi.ng/api";
import { shuffle } from "@thi.ng/arrays/shuffle";
import { isFunction } from "@thi.ng/checks/is-function";
import { DCons } from "@thi.ng/dcons/dcons";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { cycle } from "@thi.ng/transducers/cycle";
import { delayed } from "@thi.ng/transducers/delayed";
import { range } from "@thi.ng/transducers/range";
import { isReduced, unreduced } from "@thi.ng/transducers/reduced";
import type {
    ChannelItem,
    ErrorHandler,
    IBuffer,
    IReadWriteableChannel,
} from "./api.js";
import { FixedBuffer } from "./buffer.js";

const enum State {
    OPEN,
    CLOSED,
    DONE,
}

export class Channel<T> implements IReadWriteableChannel<T> {
    static constantly<T>(x: T, delay?: number) {
        const chan = new Channel<T>(delay ? <any>delayed(delay) : null);
        chan.produce(() => x);
        return chan;
    }

    static repeatedly<T>(fn: Fn0<T>, delay?: number) {
        const chan = new Channel<T>(delay ? <any>delayed(delay) : null);
        chan.produce(fn);
        return chan;
    }

    static cycle<T>(src: Iterable<T>, delay?: number) {
        return Channel.from(cycle(src), delay ? <any>delayed(delay) : null);
    }

    static range(): Channel<number>;
    static range(to: number): Channel<number>;
    static range(from: number, to: number): Channel<number>;
    static range(from: number, to: number, step: number): Channel<number>;
    static range(
        from: number,
        to: number,
        step: number,
        delay: number
    ): Channel<number>;
    static range(...args: any[]): Channel<number> {
        const [from, to, step, delay] = args;
        return Channel.from(
            range(from, to, step),
            delay !== undefined ? <any>delayed(delay) : null
        );
    }

    /**
     * Constructs new channel which closes automatically after given period.
     *
     * @param delay - time in ms
     */
    static timeout(delay: number): Channel<any> {
        const chan = new Channel(`timeout-${Channel.NEXT_ID++}`);
        setTimeout(() => chan.close(), delay);
        return chan;
    }

    /**
     * Shorthand for: `Channel.timeout(delay).take()`
     *
     * @param delay - time in ms
     */
    static sleep(delay: number) {
        return Channel.timeout(delay).read();
    }

    /**
     * Creates new channel with single value from given promise, then closes
     * automatically iff promise has been resolved.
     *
     * @param p - promise
     */
    static fromPromise<T>(p: Promise<T>) {
        const chan = new Channel<T>();
        p.then((x) =>
            (async () => {
                await chan.write(x);
                await chan.close();
                return x;
            })()
        );
        return chan;
    }

    static from<T>(src: Iterable<any>): Channel<T>;
    static from<T>(src: Iterable<any>, close: boolean): Channel<T>;
    static from<T>(src: Iterable<any>, tx: Transducer<any, T>): Channel<T>;
    static from<T>(
        src: Iterable<any>,
        tx: Transducer<any, T>,
        close: boolean
    ): Channel<T>;
    static from<T>(...args: any[]) {
        let close, tx;
        switch (args.length) {
            case 1:
                break;
            case 2:
                if (typeof args[1] === "boolean") {
                    close = args[1];
                } else {
                    tx = args[1];
                }
                break;
            case 3:
                tx = args[1];
                close = args[2];
                break;
            default:
                illegalArity(args.length);
        }
        const chan = new Channel<T>(tx);
        chan.into(args[0], close);
        return chan;
    }

    /**
     * Takes an array of channels and blocks until any of them becomes
     * readable (or has been closed). The returned promised resolves into
     * an array of `[value, channel]`. Channel order is repeatedly
     * shuffled for each read attempt.
     *
     * @param chans - source channels
     */
    static select(chans: Channel<any>[]) {
        return new Promise<any>((resolve) => {
            const _select = () => {
                for (let c of shuffle(chans)) {
                    if (c.isReadable() || c.isClosed()) {
                        c.read().then((x: any) => resolve([x, c]));
                        return;
                    }
                }
                Channel.SCHEDULE.call(null, _select, 0);
            };
            Channel.SCHEDULE.call(null, _select, 0);
        });
    }

    /**
     * Takes an array of channels to merge into new channel. Any closed
     * channels will be automatically removed from the input selection.
     * Once all inputs are closed, the target channel will close too (by
     * default).
     *
     * @remarks
     * If `named` is true, the merged channel will have tuples of:
     * `[src-id, val]` If false (default), only received values will be
     * forwarded.
     *
     * @param chans - source channels
     * @param out - result channel
     * @param close - true, if result closes
     * @param named - true, to emit labeled tuples
     */
    static merge(
        chans: Channel<any>[],
        out?: Channel<any>,
        close = true,
        named = false
    ) {
        out = out || new Channel<any>();
        (async () => {
            while (true) {
                let [x, ch] = await Channel.select(chans);
                if (x === undefined) {
                    chans.splice(chans.indexOf(ch), 1);
                    if (!chans.length) {
                        close && (await out.close());
                        break;
                    }
                } else {
                    await out.write(named ? [ch.id, x] : x);
                }
            }
        })();
        return out;
    }

    /**
     * Takes an array of channels to merge into new channel of tuples.
     * Whereas `Channel.merge()` realizes a sequential merging with no
     * guarantees about ordering of the output.
     *
     * @remarks
     * The output channel of this function will collect values from all
     * channels and a new tuple is emitted only once a new value has
     * been read from ALL channels. Therefore the overall throughput is
     * dictated by the slowest of the inputs.
     *
     * Once any of the inputs closes, the process is terminated and the
     * output channel is closed too (by default).
     *
     * @example
     * ```ts
     * Channel.mergeTuples([
     *   Channel.from([1, 2, 3]),
     *   Channel.from([10, 20, 30]),
     *   Channel.from([100, 200, 300])
     * ]).consume();
     *
     * // chan-0 : [ 1, 10, 100 ]
     * // chan-0 : [ 2, 20, 200 ]
     * // chan-0 : [ 3, 30, 300 ]
     * // chan-0 done
     *
     * Channel.mergeTuples([
     *   Channel.from([1, 2, 3]),
     *   Channel.from([10, 20, 30]),
     *   Channel.from([100, 200, 300])
     * ], null, false).consume();
     * ```
     *
     * @param chans - source channels
     * @param out - result channel
     * @param closeOnFirst - true, if result closes when first input is done
     * @param closeOutput - true, if result closes when all inputs are done
     */
    static mergeTuples(
        chans: Channel<any>[],
        out?: Channel<any>,
        closeOnFirst = true,
        closeOutput = true
    ) {
        out = out || new Channel<any>();
        (async () => {
            let buf = [];
            let orig = [...chans];
            let sel = new Set(chans);
            let n = chans.length;
            while (true) {
                let [x, ch] = await Channel.select([...sel]);
                let idx = orig.indexOf(ch);
                if (x === undefined) {
                    if (closeOnFirst || chans.length === 1) {
                        break;
                    }
                    chans.splice(idx, 1);
                }
                buf[idx] = x;
                sel.delete(ch);
                if (--n === 0) {
                    await out.write(buf);
                    buf = [];
                    n = chans.length;
                    sel = new Set(chans);
                }
            }
            closeOutput && (await out.close());
        })();
        return out;
    }

    static MAX_WRITES = 1024;
    static NEXT_ID = 0;

    static SCHEDULE: Fn2<FnAny<void>, number, void> =
        typeof setImmediate === "function" ? setImmediate : setTimeout;

    private static RFN: Reducer<DCons<any>, any> = [
        <any>(() => null),
        (acc) => acc,
        (acc: DCons<any>, x) => acc.push(x),
    ];

    id: string;
    onerror: ErrorHandler;

    protected state: State;
    protected buf: IBuffer<T>;
    protected tx: Reducer<DCons<T>, T>;
    protected writes: DCons<ChannelItem<T>>;
    protected reads: DCons<(x: T) => void>;
    protected txbuf: DCons<T>;

    protected isBusy: boolean;

    constructor();
    constructor(id: string);
    constructor(buf: number | IBuffer<T>);
    constructor(tx: Transducer<any, T>);
    constructor(tx: Transducer<any, T>, err: ErrorHandler);
    constructor(id: string, buf: number | IBuffer<T>);
    constructor(id: string, tx: Transducer<any, T>);
    constructor(id: string, tx: Transducer<any, T>, err: ErrorHandler);
    constructor(id: string, buf: number | IBuffer<T>, tx: Transducer<any, T>);
    constructor(
        id: string,
        buf: number | IBuffer<T>,
        tx: Transducer<any, T>,
        err: ErrorHandler
    );
    constructor(...args: any[]) {
        let id, buf, tx, err;
        let [a, b] = args;
        switch (args.length) {
            case 0:
                break;
            case 1:
                if (typeof a === "string") {
                    id = a;
                } else if (maybeBuffer(a)) {
                    buf = a;
                } else {
                    tx = a;
                }
                break;
            case 2:
                if (typeof a === "string") {
                    id = a;
                    if (maybeBuffer(b)) {
                        buf = b;
                    } else {
                        tx = b;
                    }
                } else {
                    [tx, err] = args;
                }
                break;
            case 3:
                if (isFunction(args[1]) && isFunction(args[2])) {
                    [id, tx, err] = args;
                } else {
                    [id, buf, tx] = args;
                }
                break;
            case 4:
                [id, buf, tx, err] = args;
                break;
            default:
                illegalArity(args.length);
        }
        this.id = id || `chan-${Channel.NEXT_ID++}`;
        buf = buf || 1;
        this.buf = typeof buf === "number" ? new FixedBuffer<T>(buf) : buf;
        this.writes = new DCons();
        this.reads = new DCons();
        this.txbuf = new DCons();
        this.tx = tx ? tx(Channel.RFN) : null;
        this.onerror = tx && (err || defaultErrorHandler);
        this.state = State.OPEN;
        this.isBusy = false;
    }

    channel() {
        return this;
    }

    write(value: any): Promise<boolean> {
        return new Promise((resolve) => {
            if (this.state !== State.OPEN) {
                resolve(false);
            }
            if (this.writes.length < Channel.MAX_WRITES) {
                this.writes.push({
                    value: this.tx
                        ? async () => {
                              try {
                                  if (
                                      isReduced(this.tx[2](this.txbuf, value))
                                  ) {
                                      this.state = State.CLOSED;
                                  }
                              } catch (e) {
                                  this.onerror(<Error>e, this, value);
                              }
                          }
                        : () => value,
                    resolve,
                });
                this.process();
            } else {
                throw new Error(
                    `channel stalled (${Channel.MAX_WRITES} unprocessed writes)`
                );
            }
        });
    }

    read(): Promise<T | undefined> {
        return new Promise((resolve) => {
            if (this.state === State.DONE) {
                resolve(undefined);
            }
            this.reads.push(resolve);
            this.process();
        });
    }

    tryRead(timeout = 1000) {
        return new Promise((resolve) => {
            (async () =>
                resolve(
                    (await Channel.select([this, Channel.timeout(timeout)]))[0]
                ))();
        });
    }

    close(flush = false) {
        if (this.state === State.OPEN) {
            this.state = State.CLOSED;
            flush && this.flush();
            return this.process();
        }
    }

    isClosed() {
        return this.state !== State.OPEN;
    }

    isReadable() {
        return (
            (this.state !== State.DONE && this.buf && this.buf.length > 0) ||
            (this.writes && this.writes.length > 0) ||
            (this.txbuf && this.txbuf.length > 0)
        );
    }

    consume(fn: Fn<T, any> = (x) => console.log(this.id, ":", x)) {
        return (async () => {
            let x: Nullable<T>;
            while (((x = null), (x = await this.read())) !== undefined) {
                await fn(x);
            }
        })();
    }

    produce(fn: Fn0<T>, close = true) {
        return (async () => {
            while (!this.isClosed()) {
                const val = await fn();
                if (val === undefined) {
                    close && (await this.close());
                    break;
                }
                await this.write(val);
            }
        })();
    }

    consumeWhileReadable(fn: Fn<T, any> = (x) => console.log(this.id, ":", x)) {
        return (async () => {
            let x;
            while (this.isReadable()) {
                x = await this.read();
                if (x === undefined) {
                    break;
                }
                await fn(x);
                x = null;
            }
        })();
    }

    reduce<A>(rfn: Reducer<A, T>, acc?: A): Promise<A> {
        return (async () => {
            const [init, complete, reduce] = rfn;
            acc = acc != null ? acc : init();
            let x: Nullable<T>;
            while (((x = null), (x = await this.read())) !== undefined) {
                acc = <any>reduce(acc!, x);
                if (isReduced(acc)) {
                    acc = (<any>acc).deref();
                    break;
                }
            }
            return unreduced(complete(acc!));
        })();
    }

    transduce<A, B>(
        tx: Transducer<T, B>,
        rfn: Reducer<A, B>,
        acc?: A
    ): Promise<A> {
        return (async () => {
            const _rfn = tx(rfn);
            return unreduced(_rfn[1](await this.reduce(_rfn, acc)));
        })();
    }

    into(src: Iterable<T>, close = true) {
        return (async () => {
            for (let x of src) {
                if (this.isClosed()) {
                    break;
                }
                await this.write(x);
            }
            close && (await this.close());
        })();
    }

    pipe<R>(dest: Channel<R> | Transducer<T, R>, close = true) {
        if (!(dest instanceof Channel)) {
            dest = new Channel<R>(dest);
        }
        this.consume((x: T) => (<Channel<R>>dest).write(x)) // return undefined here?
            .then(() => {
                close && (<Channel<R>>dest).close();
            });
        return dest;
    }

    split<A, B>(
        pred: Predicate<T>,
        truthy?: Channel<A>,
        falsey?: Channel<B>,
        close = true
    ) {
        if (!(truthy instanceof Channel)) {
            truthy = new Channel<A>();
        }
        if (!(falsey instanceof Channel)) {
            falsey = new Channel<B>();
        }
        this.consume((x: T) => (pred(x) ? truthy! : falsey!).write(x)).then(
            () => {
                close && (truthy!.close(), falsey!.close());
            }
        );
        return [truthy, falsey];
    }

    concat(chans: Iterable<Channel<T>>, close = true) {
        return (async () => {
            for (let c of chans) {
                await c.consume((x: T) => this.write(x));
            }
            close && (await this.close());
        })();
    }

    release() {
        if (this.state === State.CLOSED) {
            this.state = State.DONE;
            this.flush();
            this.buf.release();
            delete (<any>this).reads;
            delete (<any>this).writes;
            delete (<any>this).buf;
            delete (<any>this).txbuf;
            delete (<any>this).tx;
            delete (<any>this).isBusy;
            delete (<any>this).onerror;
        }
    }

    protected async process() {
        if (!this.isBusy) {
            this.isBusy = true;
            const { buf, txbuf, reads, writes } = this;
            let doProcess: any = true;
            while (doProcess) {
                while (reads.length && (txbuf.length || buf.length)) {
                    if (txbuf.length) {
                        const val = txbuf.drop();
                        if (val !== undefined) {
                            reads.drop()!(val);
                        }
                    } else {
                        const val = await buf.drop()!.value();
                        if (val !== undefined) {
                            reads.drop()!(val);
                        }
                    }
                }
                while (writes.length && !buf.isFull()) {
                    const put = writes.drop()!;
                    buf.push(put);
                    put.resolve(true);
                }
                if (this.state === State.CLOSED) {
                    if (this.tx && !writes.length) {
                        try {
                            // finalize/complete transducer
                            this.tx[1](this.txbuf);
                        } catch (e) {
                            this.onerror(<Error>e, this);
                        }
                    }
                    if (!this.isReadable()) {
                        this.release();
                        return;
                    }
                }
                doProcess =
                    (reads.length && (txbuf.length || buf.length)) ||
                    (writes.length && !buf.isFull());
            }
            this.isBusy = false;
        }
    }

    protected flush() {
        let op: any;
        while ((op = this.reads.drop())) {
            op();
        }
        while ((op = this.writes.drop())) {
            op.resolve(false);
        }
        this.buf.release();
    }
}

const defaultErrorHandler = (e: Error, chan: Channel<any>, val?: any) =>
    console.log(
        chan.id,
        "error occurred",
        e.message,
        val !== undefined ? val : ""
    );

const maybeBuffer = (x: any) =>
    x instanceof FixedBuffer || typeof x === "number";
