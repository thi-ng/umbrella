export const DEFAULT_SAMPLES = 20;

export interface SamplingOpts {
    /**
     * Number of points to sample & return. Defaults to the implementing
     * type's `DEFAULT_RES` if neither this nor `theta` option is given.
     */
    num: number;
    /**
     * Approximate desired distance between sampled result points. If
     * given, takes priority over the `num` option, but the latter MIGHT
     * be used as part of the sampling process (implementation
     * specific).
     */
    dist: number;
    /**
     * If `true`, the shape's end point will be included in the result
     * array. The default setting for open geometries is `true`, for
     * closed ones `false`. This option has no influence on any internal
     * resolution calculation.
     *
     * For open geometry this option is useful to when re-sampling paths
     * of consecutive segments, where the end points of each segment
     * coincide with the start points of the next segment. For all but
     * the last segment, this option should be `false` and so can be
     * used to avoid duplicate vertices in the concatenated result.
     *
     * When sampling closed shapes, enabling this option will include an
     * extra point (start), i.e. if the `num` option was given, results
     * in `num+1` points.
     */
    last: boolean;
}
