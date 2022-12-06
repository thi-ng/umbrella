import type { ILogger } from "@thi.ng/logger";
import type { ReadonlyVec } from "@thi.ng/vectors";

/** Start command sequence (configurable via {@link AxiDrawOpts}) */
export type StartCommand = ["start"];

/** Stop command sequence (configurable via {@link AxiDrawOpts}) */
export type StopCommand = ["stop"];

/** Return plotter to initial XY position */
export type HomeCommand = ["home"];

/** Turn XY motors on/off */
export type MotorCommand = ["on" | "off"];

/** Pen config, min/down position, max/up position (in %) */
export type PenConfigCommand = ["pen", number?, number?];

/** Pen up/down, optional delay (in ms) */
export type PenUpDownCommand = ["u" | "d", number?];

/** Move to abs pos (in mm), optional speed factor (1 = normal, 0.5 = half speed) */
export type MoveXYCommand = ["m", ReadonlyVec, number?];

/** Explicit delay (in ms) */
export type WaitCommand = ["w", number];

export type DrawCommand =
	| StartCommand
	| StopCommand
	| HomeCommand
	| MotorCommand
	| PenConfigCommand
	| PenUpDownCommand
	| MoveXYCommand
	| WaitCommand;

export interface AxiDrawOpts {
	/**
	 * Bounding rect of document in mm
	 *
	 * @defaultValue [297, 210]
	 */
	pageSize: [number, number];
	/**
	 * Hardware resolution (steps / inch)
	 *
	 * @defaultValue 2032
	 */
	stepsPerInch: number;
	/**
	 * Steps per second
	 *
	 * @defaultValue 1500
	 */
	speed: number;
	/**
	 * Up position (%)
	 *
	 * @defaultValue 60
	 */
	up: number;
	/**
	 * Up position (%)
	 *
	 * @defaultValue 30
	 */
	down: number;
	/**
	 * Delay after pen up
	 *
	 * @defaultValue 0
	 */
	delayUp: number;
	/**
	 * Delay after pen down
	 *
	 * @defaultValue 0
	 */
	delayDown: number;
	/**
	 * Time in ms to subtract from actual delay time until next command
	 */
	preDelay: number;
	/**
	 * Sequence for `start` {@link DrawCommand}
	 */
	start: DrawCommand[];
	/**
	 * Sequence for `end` {@link DrawCommand}
	 */
	stop: DrawCommand[];
	/**
	 * Logger instance
	 */
	logger: ILogger;
}
