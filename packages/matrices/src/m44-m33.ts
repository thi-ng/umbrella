import { setS3 } from "@thi.ng/vectors3";
import { MatOpM } from "./api";

export const mat44to33: MatOpM =
    (m33, m44) => (
        !m33 && (m33 = []),
        setS3(m33, m44),
        setS3(m33, m44, 3, 4),
        setS3(m33, m44, 6, 8)
    );
