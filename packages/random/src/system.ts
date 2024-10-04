import { WrappedRandom } from "./wrapped.js";

/**
 * {@link IRandom} wrapper for `Math.random()`. Used as default PRNG throughout
 * most other thi.ng projects, though usually is configurable.
 */
export const SYSTEM = new WrappedRandom(Math.random);
