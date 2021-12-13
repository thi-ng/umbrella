import type { FnN, FnN3, FnN4 } from "@thi.ng/api";

export interface DTMetric {
    /**
     * Distance metric
     */
    dist: FnN3;
    /**
     * Separation function
     */
    sep: FnN4;
    /**
     * Result post-processing fn, e.g. Math.sqrt() for {@link EUCLEDIAN}
     */
    post?: FnN;
}
