export const declareIndices = (
    proto: any,
    props: string[],
    strided = true,
    defNumeric = true) => {

    const get = (i: number) =>
        strided ?
            function () { return this.buf[this.i + i * this.s]; } :
            function () { return this.buf[this.i + i]; };

    const set = (i: number) =>
        strided ?
            function (n: number) { this.buf[this.i + i * this.s] = n; } :
            function (n: number) { this.buf[this.i + i] = n; };

    props.forEach((id, i) => {
        defNumeric && Object.defineProperty(proto, i, {
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
