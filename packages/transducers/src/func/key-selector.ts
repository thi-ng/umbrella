import { renamer } from "./renamer";

export function keySelector(keys: PropertyKey[]) {
    return renamer(keys.reduce((acc, x) => (acc[x] = x, acc), {}));
}
