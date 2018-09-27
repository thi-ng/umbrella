import { map } from "@thi.ng/transducers/xform/map";

export const asSet = (x: string) =>
    new Set(map((x) => x.trim(), x.split(",")));

// helper transducer to convert a CSV string into an ES6 Set
export const xformAsSet = map(asSet);
