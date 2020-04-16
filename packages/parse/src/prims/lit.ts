import { satisfy } from "./satisfy";

export const lit = <T>(c: T, id = "lit") => satisfy<T>((x) => x === c, id);
