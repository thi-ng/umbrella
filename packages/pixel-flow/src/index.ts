// SPDX-License-Identifier: Apache-2.0
import type { ICopy, Predicate2 } from "@thi.ng/api";
import type { IPixelBuffer } from "@thi.ng/pixel";

const { abs, ceil } = Math;

/**
 * Configuration options. See {@link OpticalFlow} for algorithm details.
 *
 * @remarks
 * The resulting flow field will have a resolution of:
 *
 * ```text
 * [
 *   ceil((imgWidth - 2 * margin) / step),
 *   ceil((imgHeight - 2 * margin) / step)
 * ]
 * ```
 *
 * Where `step` is {@link OpticalFlowOpts.step} and `margin` is the sum of
 * {@link OpticalFlowOpts.windowSize} and {@link OpticalFlowOpts.displace}.
 */
export interface OpticalFlowOpts {
	/**
	 * Number of pixels to skip between samples (in both X/Y direction).
	 *
	 * @defaultValue 6
	 */
	step: number;
	/**
	 * Maximum per-axis displacement distance in pixels used for computing the
	 * frame differences. MUST be a multiple of
	 * {@link OpticalFlowOpts.displaceStep}.
	 *
	 * @remarks
	 * Both this value and `displaceStep` indirectly control the granularity of
	 * flow directions. See {@link OpticalFlow} for algorithm details.
	 *
	 * @defaultValue 9
	 */
	displace: number;
	/**
	 * Pixel step size to iterate the `[-displace,displace]` interval in each
	 * direction.
	 *
	 * @remarks
	 * Both this value and {@link OpticalFlowOpts.displace} indirectly control
	 * the granularity of flow directions. See {@link OpticalFlow} for algorithm
	 * details.
	 *
	 * @defaultValue 3
	 */
	displaceStep: number;
	/**
	 * Half the kernel window size, used to compute summed frame difference for
	 * a displace region. MUST be a multiple of
	 * {@link OpticalFlowOpts.windowStep}.
	 *
	 * @remarks
	 * See {@link OpticalFlow} for algorithm details.
	 *
	 * @defaultValue 12
	 */
	windowSize: number;
	/**
	 * Pixel step size to iterate a single kernel window. Also see
	 * {@link OpticalFlowOpts.windowSize}.
	 *
	 * @defaultValue 3
	 */
	windowStep: number;
	/**
	 * Amplitude/scale factor of flow vectors.
	 *
	 * @defaultValue 1
	 */
	amp: number;
	/**
	 * Temporal smoothing linear interpolation factor for flow vectors.
	 *
	 * @defaultValue 0.25
	 */
	smooth: number;
	/**
	 * Minimum summed difference threshold for a kernel window to be considered
	 * as candidate. Values < 0 mean all deltas are considered.
	 *
	 * @remarks
	 * The summed window difference is computed as:
	 *
	 * ```text
	 * sum(pow(abs(a[i]-b[i])/range,2)) / windowSize
	 * ```
	 *
	 * Therefore, the thresold also is to be specified in the [0,1] interval.
	 *
	 * @defaultValue 0.001
	 */
	threshold: number;
	/**
	 * Pixel value range (default: 255). If processing float buffers, this
	 * option likely will have to be set to 1.0.
	 *
	 * @defaultValue 255
	 */
	range: number;
	/**
	 * Displacement window selection mode (see {@link OpticalFlow} for more details).
	 *
	 * @defaultValue "min"
	 */
	mode: "min" | "max";
}

/**
 * Naive dense Optical Flow extraction. See {@link OpticalFlowOpts} for
 * configuration options and details.
 *
 * @remarks
 * The algorithm requires a previous and current frame. The flow field is
 * obtained by sampling the current frame at a given
 * {@link OpticalFlowOpts.step} distance. For each of these sample/grid
 * positions a kernel window (of `2*windowSize+1` pixels) is being swept/applied
 * to compute the differences to the previous frame. To compute these
 * differences, the previous frame is offset multiple times in both X/Y
 * directions within the `[-displace, +displace)` interval. The kernel computes
 * the summed difference for each of these displaced window regions and selects
 * the window with the minimum or maximum change (depending on
 * {@link OpticalFlowOpts.mode}). The relative (displacement) position of that
 * selected window is then used as the flow vector for that cell, which will
 * then be linearly interpolated to apply temporal smoothing of the field
 * (configurable via {@link OpticalFlowOpts.smooth}) and minimize jittering.
 */
export class OpticalFlow<T extends IPixelBuffer & ICopy<T>> {
	prev: T;
	flow: Float64Array;
	step: number;
	displace: number;
	displaceStep: number;
	windowSize: number;
	windowStep: number;
	amp: number;
	smooth: number;
	width: number;
	height: number;
	margin: number;
	threshold: number;
	invRange: number;
	mode: "min" | "max";
	pred: Predicate2<number>;

	constructor(startFrame: T, opts: Partial<OpticalFlowOpts>) {
		this.prev = startFrame.copy();
		this.displace = opts?.displace ?? 9;
		this.displaceStep = opts?.displaceStep ?? 3;
		this.windowSize = opts?.windowSize ?? 12;
		this.windowStep = opts?.windowStep ?? 3;
		this.amp = opts?.smooth ?? 1;
		this.smooth = opts?.smooth ?? 0.25;
		this.threshold = opts?.threshold ?? -1;
		this.invRange = 1 / (opts?.range ?? 255);
		this.mode = opts?.mode ?? "min";
		this.pred = this.mode == "min" ? (a, b) => a < b : (a, b) => a > b;
		const margin = (this.margin = this.windowSize + this.displace);
		const step = (this.step = opts?.step ?? 6);
		this.width = ceil((startFrame.width - 2 * margin) / step);
		this.height = ceil((startFrame.height - 2 * margin) / step);
		this.flow = new Float64Array(this.width * this.height * 2);
	}

	/**
	 * Computes optical flow between given frame and (stored) previous frame,
	 * according to configured options. Returns updated flowfield in a format
	 * compatible with thi.ng/tensors `asTensor()`.
	 *
	 * @remarks
	 * See {@link OpticalFlow} class docs for more details.
	 *
	 * @param curr
	 */
	update(curr: T) {
		const {
			amp,
			displace,
			displaceStep,
			flow,
			invRange,
			margin,
			mode,
			pred,
			prev,
			smooth,
			step,
			threshold,
			windowSize,
			windowStep,
		} = this;
		const srcA = prev.data;
		const srcB = curr.data;
		const width = prev.width;
		const w = prev.width - margin;
		const h = prev.height - margin;
		const invWindowScale = 1 / (1 + 2 * (windowSize / windowStep)) ** 2;
		const isMax = mode === "max";
		const initialDist = isMax ? threshold : Infinity;
		const dirScale = amp / displace;
		let x: number,
			y: number,
			x2: number,
			y2: number,
			maxX: number,
			maxY: number,
			i: number,
			j: number,
			idx: number,
			idxA: number,
			idxB: number,
			sum: number,
			dx: number,
			dy: number,
			candidate: number,
			meanX = 0,
			meanY = 0;
		for (y = margin, idx = 0; y < h; y += step) {
			maxY = y + displace;
			for (x = margin; x < w; x += step) {
				candidate = initialDist;
				dx = 0;
				dy = 0;
				maxX = x + displace;
				for (y2 = y - displace; y2 <= maxY; y2 += displaceStep) {
					for (x2 = x - displace; x2 <= maxX; x2 += displaceStep) {
						sum = 0;
						for (
							j = -windowSize;
							j <= windowSize;
							j += windowStep
						) {
							for (
								i = -windowSize,
									idxA = (y + j) * width + x,
									idxB = (y2 + j) * width + x2;
								i <= windowSize;
								i += windowStep
							) {
								sum +=
									(abs(srcA[idxA] - srcB[idxB]) * invRange) **
									2;
								idxA += windowStep;
								idxB += windowStep;
							}
						}
						sum *= invWindowScale;
						if (sum >= threshold && pred(sum, candidate)) {
							candidate = sum;
							dx = x - x2;
							dy = y - y2;
						}
					}
				}
				dx *= dirScale;
				dy *= dirScale;
				meanX += flow[idx] += (dx - flow[idx]) * smooth;
				idx++;
				meanY += flow[idx] += (dy - flow[idx]) * smooth;
				idx++;
			}
		}
		srcA.set(srcB);
		idx >>= 1;
		return {
			type: <const>"f64",
			data: flow,
			shape: <[number, number, number]>[this.height, this.width, 2],
			stride: <[number, number, number]>[this.width * 2, 2, 1],
			dir: [meanX / idx, meanY / idx],
		};
	}
}
