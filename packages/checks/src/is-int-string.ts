const RE = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;

export const isIntString = (x: string) => RE.test(x);
