/**
 * Exposes given `value` as `id` in global scope, iff `always = true`
 * (default: false) or if `process.env.NODE_ENV != "production"` or if the
 * `UMBRELLA_GLOBALS` env var is set to 1.
 *
 * @param id -
 * @param value -
 * @param always -
 */
export const exposeGlobal = (id: string, value: any, always = false) =>
    typeof global !== undefined &&
    (always ||
        process?.env?.NODE_ENV !== "production" ||
        process?.env?.UMBRELLA_GLOBALS === "1") &&
    ((<any>global)[id] = value);
