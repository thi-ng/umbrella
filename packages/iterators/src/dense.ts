import { filter } from "./filter";

export const dense = <T>(input: Iterable<T>) => filter((x) => x != null, input);
