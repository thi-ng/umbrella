import { Atom } from "@thi.ng/atom";
import { defonce } from "@thi.ng/memoize";

// `defonce` is used here to protect the app stat atom from
// re-initializing during hot module replacement.
// in other words, the atom is *only* initialized once when the
// application first loads / reloads
export const state = defonce(
    "umbrella.example.hmr",
    () =>
        new Atom<any>({
            launched: new Date(),
            seed: (Math.random() * 100) | 0,
        })
);
