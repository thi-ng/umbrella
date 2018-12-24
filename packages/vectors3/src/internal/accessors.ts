export const declareIndex = (
    proto: any,
    id: string,
    i: number,
    strided = true,
    defNumeric = true
) => {
    const get = strided ?
        function () { return this.buf[this.i + i * this.s]; } :
        function () { return this.buf[this.i + i]; };
    const set = strided ?
        function (n: number) { this.buf[this.i + i * this.s] = n; } :
        function (n: number) { this.buf[this.i + i] = n; };

    defNumeric && Object.defineProperty(proto, i, {
        get,
        set,
        enumerable: true,
    });
    Object.defineProperty(proto, id, {
        get,
        set,
        enumerable: true,
    });
};

export const declareIndices = (
    proto: any,
    props: string[],
    strided?: boolean,
    defNumeric?: boolean
) => props.forEach((id, i) => declareIndex(proto, id, i, strided, defNumeric));
