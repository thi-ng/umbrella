/** @internal */
export const declareIndex = (
    proto: any,
    id: string,
    idx: number,
    strided = true,
    defNumeric = true
) => {
    const get =
        idx > 0
            ? strided
                ? function () {
                      return this.buf[this.offset + idx * this.stride];
                  }
                : function () {
                      return this.buf[this.offset + idx];
                  }
            : function () {
                  return this.buf[this.offset];
              };
    const set =
        idx > 0
            ? strided
                ? function (n: number) {
                      this.buf[this.offset + idx * this.stride] = n;
                  }
                : function (n: number) {
                      this.buf[this.offset + idx] = n;
                  }
            : function (n: number) {
                  this.buf[this.offset] = n;
              };
    defNumeric &&
        Object.defineProperty(proto, idx, {
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

/** @internal */
export const declareIndices = (
    proto: any,
    props: string[],
    strided?: boolean,
    defNumeric?: boolean
) => props.forEach((id, i) => declareIndex(proto, id, i, strided, defNumeric));
