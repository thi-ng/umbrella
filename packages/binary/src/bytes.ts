export const bytes16 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    return le ? [b0, b1] : [b1, b0];
};

export const bytes24 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    const b2 = (x >> 16) & 0xff;
    return le ? [b0, b1, b2] : [b2, b1, b0];
};

export const bytes32 = (x: number, le = false) => {
    const b0 = x & 0xff;
    const b1 = (x >> 8) & 0xff;
    const b2 = (x >> 16) & 0xff;
    const b3 = (x >> 24) & 0xff;
    return le ? [b0, b1, b2, b3] : [b3, b2, b1, b0];
};
