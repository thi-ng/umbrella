import { filter } from "./filter.js";

export const dense = <T>(input: Iterable<T>) => filter((x) => x != null, input);
