import { ReadonlyVec } from "@thi.ng/vectors";

export const textLabel = (p: ReadonlyVec, fill: string, label: string) => [
    "text",
    { fill },
    p,
    label
];
