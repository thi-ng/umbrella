import { compare } from "@thi.ng/compare";
import { identity } from "@thi.ng/compose";
import { SortOpts } from "../api";

export const __sortOpts = <A, B>(opts?: Partial<SortOpts<A, B>>) =>
    <SortOpts<A, B>>{
        key: identity,
        compare,
        ...opts
    };
