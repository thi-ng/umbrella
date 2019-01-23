import { SamplingOpts } from "@thi.ng/geom-resample";

export interface ArcSamplingOpts extends SamplingOpts {
    /**
     * Defines the target angle between sampled points. If greater than
     * the actual range of the arc, only the two end points will be
     * returned at most. This option is used to derive a `num` value and
     * takes priority if `num` is given as well.
     *
     * This option is useful to adapt the sampling based on angular
     * resolution, rather than a fixed number of samples.
     */
    theta: number;
}
