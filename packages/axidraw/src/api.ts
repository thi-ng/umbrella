import type { IDeref } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import type { ReadonlyVec } from "@thi.ng/vectors";

/** Start command sequence (configurable via {@link AxiDrawOpts}) */
export type StartCommand = ["start"];

/** Stop command sequence (configurable via {@link AxiDrawOpts}) */
export type StopCommand = ["stop"];

/** Return plotter to initial XY position */
export type HomeCommand = ["home"];

/** Reset curr position as home (0,0) */
export type ResetCommand = ["reset"];

/** Turn XY motors on/off */
export type MotorCommand = ["on" | "off"];

/** Pen config, min/down position, max/up position (in %) */
export type PenConfigCommand = ["pen", number?, number?];

/**
 * Pen up/down, optional delay (in ms), optional custom level/position. If
 * omitted, default values used from {@link AxiDrawOpts}. Using -1 as delay also
 * uses default.
 */
export type PenUpDownCommand = ["u" | "d", number?, number?];

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
	| ResetCommand
	| MotorCommand
	| PenConfigCommand
	| PenUpDownCommand
	| MoveXYCommand
	| WaitCommand;

/**
 * Global plotter drawing configuration. Also see {@link DEFAULT_OPTS}.
 */
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
	 * @defaultValue 150
	 */
	delayUp: number;
	/**
	 * Delay after pen down
	 *
	 * @defaultValue 150
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
	/**
	 * Optional implementation to pause, resume or cancel the processing of
	 * drawing commands (see {@link AxiDrawControl} for default impl).
	 *
	 * @remarks
	 * If a control is provided, it will be checked prior to processing each
	 * individual command. Drawing will be paused if the control state is in
	 * {@link AxiDrawState.PAUSE} state and the control will be rechecked every
	 * {@link AxiDrawOpts.refresh} milliseconds for updates. In paused state,
	 * the pen will be automatically lifted (if it wasn't already) and when
	 * resuming it will be sent down again (if it was originally down).
	 *
	 * Draw commands are only sent to the machine if no control is provided at
	 * all or if the control is in the {@link AxiDrawState.CONTINUE} state.
	 */
	control?: IDeref<AxiDrawState>;
	/**
	 * Refresh interval for checking the control FSM in paused state.
	 *
	 * @defaultValue 1000
	 */
	refresh: number;
	/**
	 * If true (default), installs SIGINT handler to lift pen when the Node.js
	 * process is terminated.
	 */
	sigint: boolean;
}

export const START: StartCommand = ["start"];

export const STOP: StopCommand = ["stop"];

export const HOME: HomeCommand = ["home"];

export const RESET: ResetCommand = ["reset"];

export const PEN: PenConfigCommand = ["pen"];

export const UP: PenUpDownCommand = ["u"];

export const DOWN: PenUpDownCommand = ["d"];

export const ON: MotorCommand = ["on"];

export const OFF: MotorCommand = ["off"];

/**
 * FSM state enum for (interactive) control for processing of drawing commands.
 * See {@link AxiDraw.draw} and {@link AxiDrawControl} for details.
 */
export enum AxiDrawState {
	/**
	 * Draw command processing can continue as normal.
	 */
	CONTINUE,
	/**
	 * Draw command processing is suspended indefinitely.
	 */
	PAUSE,
	/**
	 * Draw command processing is cancelled.
	 */
	CANCEL,
}
