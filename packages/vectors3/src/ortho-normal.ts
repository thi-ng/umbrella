import { VecOpVVV } from "./api";
import { cross3 } from "./cross";
import { sub3 } from "./sub";

export const orthoNormal3: VecOpVVV =
    (out, a, b, c) =>
        cross3(out, sub3(out, c, a), sub3([], b, a));
