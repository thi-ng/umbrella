import iterator from "./iterator";

export default function* interpose(x: any, input: Iterable<any>) {
    let iter = iterator(input),
        v: IteratorResult<any> = iter.next();
    while (!v.done) {
        yield v.value;
        v = iter.next();
        if (!v.done) {
            yield x;
        }
    }
}
