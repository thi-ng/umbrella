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

/**
 * Pen up/down, optional delay (in ms), if omitted values used from
 * {@link AxiDrawOpts}.
 */
export type PenUpDownCommand = ["u" | "d", number?];

/**
 * Move to abs pos (in worldspace coords, default mm), optional speed factor
 * (default: 1)
 */
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
	 * Conversion factor from geometry worldspace units to inches.
	 * Default units are millimeters.
	 *
	 * @defaultValue 25.4
	 */
	unitsPerInch: number;
	/**
	 * Hardware resolution (steps / inch)
	 *
	 * @defaultValue 2032
	 */
	stepsPerInch: number;
	/**
	 * Steps per second
	 *
	 * @defaultValue 4000
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
	 * @defaultValue 300
	 */
	delayUp: number;
	/**
	 * Delay after pen down
	 *
	 * @defaultValue 300
	 */
	delayDown: number;
	/**
	 * Time in ms to subtract from actual delay time until next command
	 *
	 * @defaultValue 0
	 */
	preDelay: number;
	/**
	 * Sequence for `start` {@link DrawCommand}
	 *
	 * @defaultValue `[ON, PEN, UP]`
	 */
	start: DrawCommand[];
	/**
	 * Sequence for `end` {@link DrawCommand}
	 *
	 * @defaultValue `[UP, HOME, OFF]`
	 */
	stop: DrawCommand[];
	/**
	 * Logger instance
	 */
	logger: ILogger;
}

export const START: StartCommand = ["start"];

export const STOP: StopCommand = ["stop"];

export const HOME: HomeCommand = ["home"];

export const PEN: PenConfigCommand = ["pen"];

export const UP: PenUpDownCommand = ["u"];

export const DOWN: PenUpDownCommand = ["d"];

export const ON: MotorCommand = ["on"];

export const OFF: MotorCommand = ["off"];
