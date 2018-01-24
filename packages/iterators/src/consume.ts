export default function consume(iter: Iterator<any>, n = Number.POSITIVE_INFINITY) {
    while (n-- > 0 && !iter.next().done) { }
    return iter;
}
