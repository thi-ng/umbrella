import { CommonOpts } from "../api";

let NEXT_ID = 0;

export const nextID = () => NEXT_ID++;

export const optsWithID = <T extends CommonOpts>(
    prefix: string,
    opts?: Partial<T>
) =>
    <Partial<T>>(!opts || !opts.id ? { ...opts, id: prefix + nextID() } : opts);
