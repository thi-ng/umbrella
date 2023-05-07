let symID = 0;

/**
 * Helper for deterministic code generation / testing. Resets sym ID counter
 * (for {@link gensym}) to given ID (default: 0).
 *
 * @param id
 */
export const resetSymID = (id = 0) => (symID = id);

/**
 * Generates a new symbol name with optional given `prefix` (default: "_s"),
 * e.g. `_s123`. Uses base36 for internal counter to keep names short.
 *
 * @remarks
 * Also see {@link resetSymID}.
 *
 * @param prefix -
 */
export const gensym = (prefix = "_s") => `${prefix}${(symID++).toString(36)}`;
