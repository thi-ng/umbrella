import { Reducer, Transducer } from "./api";
import { isReduced, unreduced } from "./reduced";
import { push } from "./rfn/push";

export function* iterator<A, B>(tx: Transducer<A, B>, xs: Iterable<A>): IterableIterator<B> {
    const [_, complete, reduce] = <Reducer<B[], A>>tx(push()); _;
    for (let x of xs) {
        const y = reduce([], x);
        if (isReduced(y)) {
            yield* unreduced(complete((<any>y).deref()));
            return;
        }
        if ((<B[]>y).length) {
            yield* (<B[]>y);
        }
    }
    yield* unreduced(complete([]));
}
