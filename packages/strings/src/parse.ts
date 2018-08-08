export const parseInt = (x: string, defaultVal = 0, radix = 10) => {
    const n = parseInt(x, radix);
    return isNaN(n) ? defaultVal : n;
};

export const parseFloat = (x: string, defaultVal = 0) => {
    const n = parseFloat(x);
    return isNaN(n) ? defaultVal : n;
};
