import type { CommonOpts, ISubscription } from "./api";
import { Subscription } from "./subscription";

/**
 * Abstract base class for sidechained subscription types (e.g.
 * {@link sidechainPartition}, {@link sidechainToggle}).
 */
export abstract class ASidechain<A, S, B> extends Subscription<A, B> {
    sideSub!: ISubscription<any, S>;

    constructor(opts?: Partial<CommonOpts>) {
        super(undefined, opts);
    }

    unsubscribe(sub?: ISubscription<B, any>) {
        const res = super.unsubscribe(sub);
        if (!sub || !this.subs.length) {
            this.sideSub.unsubscribe();
        }
        return res;
    }

    done() {
        this.sideSub.unsubscribe();
        super.done();
    }
}
