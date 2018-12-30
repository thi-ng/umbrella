import { ZERO4 } from "@thi.ng/vectors3/api";
import { setS3, setS4 } from "@thi.ng/vectors3/sets";
import { MatOpM } from "./api";

export const mat33to44: MatOpM =
    (m44, m33) => (
        !m44 && (m44 = []),
        setS3(m44, m33, 0, 0),
        setS3(m44, m33, 4, 3),
        setS3(m44, m33, 8, 6),
        setS3(m44, ZERO4, 12),
        setS4(m44, [0, 0, 0, 1], 3, 0, 4)
    );
