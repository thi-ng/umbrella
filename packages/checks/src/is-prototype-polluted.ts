const ILLEGAL_KEYS = new Set(["__proto__", "prototype", "constructor"]);
export const isPrototypePolluted = (key: string): Boolean => ILLEGAL_KEYS.includes(key);
