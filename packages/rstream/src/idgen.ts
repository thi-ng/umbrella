import type { CommonOpts } from "./api";

let NEXT_ID = 0;

export const __nextID = () => NEXT_ID++;

/**
 * @param prefix
 * @param opts
 *
 * @internal
 */
export const __optsWithID = <T extends CommonOpts>(
    prefix: string,
    opts?: Partial<T>
) =>
    <Partial<T>>(
        (!opts || !opts.id ? { ...opts, id: prefix + "-" + __nextID() } : opts)
    );
