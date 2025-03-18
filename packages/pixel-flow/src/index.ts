import type { ICopy } from "@thi.ng/api";
import type { IPixelBuffer } from "@thi.ng/pixel";

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
	 * frame differences. Should be a multiple of
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
	 * a displace region. Should be a multiple of
	 * {@link OpticalFlowOpts.windowStep}.
	 *
	 * @remarks
	 * See {@link OpticalFlow} for algorithm details.
	 *
	 * @defaultValue 12
	 */
	windowSize: number;
	/**
	 * Pixel step size to iterate a single kernel window.
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
	 * as candidate.
	 *
	 * @defaultValue -1
	 */
	threshold: number;
}

/**
 * Naive dense Optical Flow extraction. See {@link OpticalFlowOpts} for
 * configuration options and details.
 *
 * @remarks
 * The algorithm requires a previous and current frame. The flow field is
 * obtained by sampling the current frame at a given
 * {@link OpticalFlowOpts.step} distance. For each of these sample/grid
 * positions a kernel window is being swept/applied to compute the differences
 * to the previous frame. To compute these differences, the previous frame is
 * offset multiple times in both X/Y directions within the `[-displace,
 * +displace)` interval. The kernel computes the summed difference for each of
 * these displaced window regions and selects the window with the minimum
 * change. The relative (displacement) position of that minimum is the flow
 * vector for that cell, which will then be linearly interpolated to apply
 * temporal smoothing of the field (configurable) and minimize jittering.
 */
export class OpticalFlow<T extends IPixelBuffer & ICopy<T>> {
	prev: T;
	flow: number[][];
	step: number;
	displace: number;
	displaceStep: number;
	windowSize: number;
	windowStep: number;
	amp: number;
	smooth: number;
	flowWidth: number;
	flowHeight: number;
	margin: number;
	threshold: number;

	constructor(initialFrame: T, opts: Partial<OpticalFlowOpts>) {
		this.prev = initialFrame.copy();
		this.step = opts?.step ?? 6;
		this.displace = opts?.displace ?? 9;
		this.displaceStep = opts?.displaceStep ?? 3;
		this.windowSize = opts?.windowSize ?? 12;
		this.windowStep = opts?.windowStep ?? 3;
		this.amp = opts?.smooth ?? 1;
		this.smooth = opts?.smooth ?? 0.25;
		this.threshold = opts?.threshold ?? -1;
		this.margin = this.windowSize + this.displace;
		this.flowWidth = Math.ceil(
			(initialFrame.width - 2 * this.margin) / this.step
		);
		this.flowHeight = Math.ceil(
			(initialFrame.height - 2 * this.margin) / this.step
		);
		this.flow = new Array(this.flowWidth * this.flowHeight);
		for (let i = 0; i < this.flow.length; i++) this.flow[i] = [0, 0];
	}

	update(curr: T) {
		const {
			prev,
			flow,
			windowSize,
			windowStep,
			displace,
			displaceStep,
			margin,
			step,
			smooth,
			amp,
			threshold,
		} = this;
		const srcA = prev.data;
		const srcB = curr.data;
		const width = prev.width;
		const w = prev.width - margin;
		const h = prev.height - margin;
		for (let y = margin, flowIndex = 0; y < h; y += step) {
			const maxY = y + displace;
			for (let x = margin; x < w; x += step) {
				let min = Infinity;
				let dx = 0;
				let dy = 0;
				const maxX = x + displace;
				for (let y2 = y - displace; y2 <= maxY; y2 += displaceStep) {
					for (
						let x2 = x - displace;
						x2 <= maxX;
						x2 += displaceStep
					) {
						let sum = 0;
						for (
							let j = -windowSize;
							j <= windowSize;
							j += windowStep
						) {
							for (
								let i = -windowSize,
									idxA = (y + j) * width + x,
									idxB = (y2 + j) * width + x2;
								i <= windowSize;
								i += windowStep
							) {
								sum += Math.abs(srcA[idxA] - srcB[idxB]) ** 2;
								idxA += windowStep;
								idxB += windowStep;
							}
						}
						if (sum > threshold && sum < min) {
							min = sum;
							dx = x2 - x;
							dy = y2 - y;
						}
					}
				}
				const cell = flow[flowIndex++];
				cell[0] += (dx * amp - cell[0]) * smooth;
				cell[1] += (dy * amp - cell[1]) * smooth;
			}
		}
		srcA.set(srcB);
		return flow;
	}
}
