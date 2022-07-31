let symID = 0;

/**
 * Helper for deterministic code generation / testing. Resets sym ID
 * counter.
 */
export const resetSymID = () => (symID = 0);

/**
 * Generates a new symbol name with optional given `prefix` (default: "_s"),
 * e.g. `_s123`. Uses base36 for internal counter to keep names short.
 *
 * @param prefix -
 */
export const gensym = (prefix = "_s") => `${prefix}${(symID++).toString(36)}`;
