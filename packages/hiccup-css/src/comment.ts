export function comment(body: string, force = false) {
    return (acc, opts) =>
        (opts.format.comments || force ?
            (Array.prototype.push.apply(acc, ["/* ", body, " */"]), acc) :
            acc);
}
