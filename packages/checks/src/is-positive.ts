export const isPosititve = (x: any): x is number =>
    typeof x === "number" && x > 0;
