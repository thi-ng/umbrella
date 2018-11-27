import { MultiVecOpV } from "./api";
import { vop } from "./internal/vop";

export const fromHomogeneous: MultiVecOpV = vop(1);

export const fromHomogeneous3 =
    fromHomogeneous.add(3,
        (out, [x, y, w]) => (
            !out && (out = []),
            out[0] = x / w,
            out[1] = y / w,
            out
        )
    );

export const fromHomogeneous4 =
    fromHomogeneous.add(4,
        (out, [x, y, z, w]) => (
            !out && (out = []),
            out[0] = x / w,
            out[1] = y / w,
            out[2] = z / w, out
        )
    );
