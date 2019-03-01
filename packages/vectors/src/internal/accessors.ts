export const declareIndex = (
    proto: any,
    id: string,
    idx: number,
    strided = true,
    defNumeric = true
) => {
    const get = strided
        ? function() {
              return this.buf[this.offset + idx * this.stride];
          }
        : function() {
              return this.buf[this.offset + idx];
          };
    const set = strided
        ? function(n: number) {
              this.buf[this.offset + idx * this.stride] = n;
          }
        : function(n: number) {
              this.buf[this.offset + idx] = n;
          };

    defNumeric &&
        Object.defineProperty(proto, idx, {
            get,
            set,
            enumerable: true
        });
    Object.defineProperty(proto, id, {
        get,
        set,
        enumerable: true
    });
};

export const declareIndices = (
    proto: any,
    props: string[],
    strided?: boolean,
    defNumeric?: boolean
) => props.forEach((id, i) => declareIndex(proto, id, i, strided, defNumeric));
