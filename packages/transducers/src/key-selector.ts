import { renamer } from "./renamer.js";

export const keySelector = (keys: PropertyKey[]) =>
    renamer(keys.reduce((acc: any, x) => ((acc[x] = x), acc), {}));
