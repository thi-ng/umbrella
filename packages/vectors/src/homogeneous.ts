import type { MultiVecOpV } from "./api.js";
import { vop } from "./vop.js";
import { setC2, setC3 } from "./setc.js";

export const fromHomogeneous: MultiVecOpV = vop(1);

export const fromHomogeneous3 = fromHomogeneous.add(3, (out, [x, y, w]) =>
    setC2(out || [], x / w, y / w)
);

export const fromHomogeneous4 = fromHomogeneous.add(4, (out, [x, y, z, w]) =>
    setC3(out || [], x / w, y / w, z / w)
);
