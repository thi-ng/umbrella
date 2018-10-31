import { unsupported } from "@thi.ng/errors/unsupported";

/**
 * Specialized / optimized version of `@thi.ng/defmulti` for vector
 * operations. Uses hardcoded logic to dispatch on length (vector size)
 * of first argument.
 */
export const vop = () => {
    const impls = new Array(5);
    let fallback;
    const fn = (...args: any[]) => {
        const g = impls[args[0].length] || fallback;
        return g ? g(...args) : unsupported(`no impl for vec size ${args[0].length}`);
    };
    fn.add = (dim: number, fn) => (impls[dim] = fn);
    fn.default = (fn) => (fallback = fn);
    return fn;
};
