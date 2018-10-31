export const declareIndices = (proto: any, props: string[]) => {
    const get = (i: number) => function () { return this.buf[this.i + i * this.s]; };
    const set = (i: number) => function (n: number) { this.buf[this.i + i * this.s] = n; };
    props.forEach((id, i) => {
        Object.defineProperty(proto, i, {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
        Object.defineProperty(proto, id, {
            get: get(i),
            set: set(i),
            enumerable: true,
        });
    });
};
