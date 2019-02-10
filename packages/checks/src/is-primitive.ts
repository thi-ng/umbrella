export const isPrimitive =
    (x: any): x is (string | number) => {
        const t = typeof x;
        return t === "string" || t === "number";
    };
