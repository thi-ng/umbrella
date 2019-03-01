import { unsupported } from "@thi.ng/errors";

/**
 * Specialized / optimized version of `@thi.ng/defmulti` for vector
 * operations. Uses simplified logic to dispatch on length (vector size)
 * of `dispatch` argument.
 *
 * @param dispatch arg index
 */
export const vop = (dispatch = 0) => {
    const impls = new Array(5);
    let fallback;
    const fn = (...args: any[]) => {
        const g = impls[args[dispatch].length] || fallback;
        return g
            ? g(...args)
            : unsupported(`no impl for vec size ${args[dispatch].length}`);
    };
    fn.add = (dim: number, fn) => (impls[dim] = fn);
    fn.default = (fn) => (fallback = fn);
    // fn.impls = impls;
    return fn;
};
