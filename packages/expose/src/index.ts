// FIXME https://github.com/snowpackjs/snowpack/issues/3621#issuecomment-907731004
import.meta.hot;

declare const __SNOWPACK_ENV__: any;

/**
 * Exposes given `value` as `id` in global scope, iff `always = true`
 * (default: false) or if `process.env.NODE_ENV != "production"` or if the
 * `UMBRELLA_GLOBALS` env var is set to 1.
 *
 * @param id -
 * @param value -
 * @param always -
 */
export const exposeGlobal = (id: string, value: any, always = false) => {
    const glob: any =
        typeof global !== "undefined"
            ? global
            : typeof window !== "undefined"
            ? window
            : undefined;
    if (
        glob &&
        (always ||
            (() =>
                typeof process !== "undefined" &&
                typeof process.env !== "undefined"
                    ? process.env.NODE_ENV !== "production" ||
                      !!process.env.UMBRELLA_GLOBALS
                    : typeof __SNOWPACK_ENV__ !== "undefined"
                    ? __SNOWPACK_ENV__.MODE !== "production" ||
                      !!__SNOWPACK_ENV__.UMBRELLA_GLOBALS ||
                      !!__SNOWPACK_ENV__.SNOWPACK_PUBLIC_UMBRELLA_GLOBALS
                    : true)())
    ) {
        glob[id] = value;
    }
};
