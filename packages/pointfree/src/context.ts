import type { Stack, StackContext, StackEnv } from "./api";

/**
 * Creates a new StackContext tuple from given d-stack and/or
 * environment only (the r-stack is always initialized empty).
 *
 * @param stack - initial d-stack
 * @param env - initial environment
 */
export const ctx = (stack: Stack = [], env: StackEnv = {}): StackContext => [
    stack,
    [],
    env,
];
