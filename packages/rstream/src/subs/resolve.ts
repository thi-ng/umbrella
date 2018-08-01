import { IID } from "@thi.ng/api/api";

import { DEBUG, State } from "../api";
import { Subscription } from "../subscription";

export interface ResolverOpts extends IID<string> {
    fail: (e: any) => void;
}

export class Resolver<T> extends Subscription<Promise<T>, T> {

    protected outstanding = 0;
    protected fail: (e: any) => void;

    constructor(opts: Partial<ResolverOpts> = {}) {
        super(null, null, null, opts.id || `resolve-${Subscription.NEXT_ID++}`);
        this.fail = opts.fail;
    }

    next(x: Promise<T>) {
        this.outstanding++;
        x.then(
            (y) => {
                if (this.state < State.DONE) {
                    this.dispatch(y);
                    if (--this.outstanding === 0) {
                        this.done();
                    }
                } else {
                    DEBUG && console.log(`resolved value in ${State[this.state]} state (${x})`);
                }
            },
            (e) => (this.fail || this.error)(e)
        );
    }

    done() {
        if (this.parent.getState() === State.DONE && this.outstanding === 0) {
            super.done();
        }
    }
}

export function resolve<T>(opts?: Partial<ResolverOpts>) {
    return new Resolver<T>(opts);
}
