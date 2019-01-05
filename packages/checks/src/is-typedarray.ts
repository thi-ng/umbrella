export const isTypedArray =
    (x: any): x is ArrayLike<number> =>
        x && (x.constructor === Float32Array ||
            x.constructor === Uint32Array ||
            x.constructor === Uint8Array ||
            x.constructor === Uint8ClampedArray ||
            x.constructor === Int8Array ||
            x.constructor === Uint16Array ||
            x.constructor === Int16Array ||
            x.constructor === Int32Array ||
            x.constructor === Float64Array);
