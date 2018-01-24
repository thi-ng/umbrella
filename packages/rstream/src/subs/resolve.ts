import { State } from "../api";
import { Subscription } from "../subscription";

export class Resolver<T> extends Subscription<Promise<T>, T> {

    protected outstanding = 0;

    constructor(id?: string) {
        super(null, null, null, id || `resolve-${Subscription.NEXT_ID++}`);
    }

    next(x: Promise<T>) {
        this.outstanding++;
        x.then((y) => {
            if (this.state < State.DONE) {
                this.dispatch(y);
                if (--this.outstanding === 0) {
                    this.done();
                }
            } else {
                throw new Error(`resolved value in ${State[this.state]} state (${x})`);
            }
        }).catch((e) => this.error(this, e));
    }

    done() {
        if (this.parent.getState() === State.DONE && this.outstanding === 0) {
            super.done();
            delete this.outstanding;
        }
    }
}

export function resolve<T>(id?: string) {
    return new Resolver<T>(id);
}