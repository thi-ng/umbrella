import { sma } from "@thi.ng/transducers-stats/sma";
import { step } from "@thi.ng/transducers/step";
import { sparkline, type SparklineOpts } from "./sparkline.js";

export interface FpsCounterOpts {
	/**
	 * Number of recorded samples.
	 * Default: 25
	 */
	history: number;
	/**
	 * Moving average smoothing period.
	 * Default: 5
	 */
	smooth: number;
	/**
	 * Period (in ms) between label updates.
	 * Default: 250
	 */
	labelPeriod: number;
	/**
	 * Sparkline config options.
	 * Default: sparkline defaults
	 */
	sparkline?: Partial<SparklineOpts>;
}

/**
 * Customizable FPS counter with sparkline visualization of N previous
 * frames.
 *
 * @param opts -
 */
export const fpsCounter = (_opts?: Partial<FpsCounterOpts>) => {
	const opts = {
		history: 25,
		smooth: 5,
		labelPeriod: 250,
		sparkline: {},
		..._opts,
	};
	return <any>{
		init() {
			this.last = Date.now();
			this.lastLabel = this.last;
			this.buffer = [];
			this.ma = step(sma(opts.smooth));
		},
		render() {
			const t = Date.now();
			const fps = 1000 / (t - this.last);
			this.last = t;
			if (!this.buffer) return ["div"];
			const smoothFps = this.ma(fps);
			if (!smoothFps) return ["div"];
			this.buffer.push(smoothFps);
			this.buffer.length > opts.history && this.buffer.shift();
			const updateLabel = t - this.lastLabel > opts.labelPeriod;
			updateLabel && (this.lastLabel = t);
			return [
				"div",
				[
					sparkline,
					{ min: 0, max: 65, ...opts.sparkline },
					this.buffer,
				],
				[
					"span",
					{ __skip: !updateLabel },
					smoothFps ? smoothFps.toFixed(2) + " fps" : "",
				],
			];
		},
	};
};
