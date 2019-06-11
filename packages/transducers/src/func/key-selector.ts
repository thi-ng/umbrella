import { renamer } from "./renamer";

export const keySelector = (keys: PropertyKey[]) =>
    renamer(keys.reduce((acc: any, x) => ((acc[x] = x), acc), {}));
