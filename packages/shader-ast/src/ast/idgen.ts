let symID = 0;

/**
 * Helper for deterministic code generation / testing. Resets sym ID
 * counter.
 */
export const resetSymID = () => (symID = 0);

/**
 * Generates a new symbol name, e.g. `_sa2`. Uses base36 for counter to
 * keep names short.
 */
export const gensym = () => `_s${(symID++).toString(36)}`;
