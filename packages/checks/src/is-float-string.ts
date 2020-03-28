const RE = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

export const isFloatString = (x: string) => x.length > 0 && RE.test(x);
