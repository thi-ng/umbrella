import { DCons } from "@thi.ng/dcons/dcons";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Transducer } from "@thi.ng/transducers";
import type { IWriteableChannel } from "./api.js";
import { Channel } from "./channel.js";

export class Mult<T> implements IWriteableChannel<T> {
    protected static nextID = 0;

    protected src: Channel<any>;
    protected taps: DCons<Channel<any>>;
    protected tapID = 0;

    constructor();
    constructor(id: string);
    constructor(src: Channel<T>);
    constructor(tx: Transducer<any, T>);
    constructor(id: string, tx: Transducer<any, T>);
    constructor(...args: any[]) {
        let id, src;
        switch (args.length) {
            case 2:
                id = args[0];
                src = args[1];
                break;
            case 1:
                if (typeof args[0] === "string") {
                    id = args[0];
                } else {
                    src = args[0];
                }
                break;
            case 0:
                id = "mult" + Mult.nextID++;
                break;
            default:
                illegalArity(args.length);
        }
        if (src instanceof Channel) {
            this.src = src;
        } else {
            this.src = new Channel<T>(id, src);
        }
        this.taps = new DCons();
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

    tap<R>(ch?: Channel<R> | Transducer<T, R>) {
        if (this.taps) {
            if (!(ch instanceof Channel)) {
                ch = new Channel<R>(this.src.id + "-tap" + this.tapID++, ch!);
            } else if (this.taps.find(ch)) {
                return ch;
            }
            this.taps.push(ch);
            return ch;
        }
    }

    untap(ch: Channel<any>) {
        if (this.taps) {
            const t = this.taps.find(ch);
            if (t) {
                this.taps.remove(t);
                return true;
            }
        }
        return false;
    }

    untapAll(close = true) {
        if (this.taps) {
            let tap = this.taps.head;
            while (tap) {
                close && tap.value.close();
                this.taps.remove(tap);
                tap = tap.next;
            }
            return true;
        }
        return false;
    }

    protected async process() {
        let x;
        while (((x = null), (x = await this.src.read())) !== undefined) {
            let t = this.taps.head;
            while (t) {
                if (!(await t.value.write(x))) {
                    this.taps.remove(t);
                }
                t = t.next;
            }
        }
        for (let t of this.taps) {
            await t.close();
        }
        delete (<any>this).src;
        delete (<any>this).taps;
        delete (<any>this).tapID;
    }
}
