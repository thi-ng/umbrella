import type { ReadonlyVec } from "@thi.ng/vectors";
import type {
	CommentCommand,
	DrawCommand,
	HomeCommand,
	MotorCommand,
	MoveRelCommand,
	MoveXYCommand,
	PenConfigCommand,
	PenUpDownCommand,
	ResetCommand,
	StartCommand,
	StopCommand,
	WaitCommand,
} from "./api.js";

export const START: StartCommand = ["start"];

export const STOP: StopCommand = ["stop"];

export const HOME: HomeCommand = ["home"];

export const RESET: ResetCommand = ["reset"];

/**
 * Creates a {@link PenConfigCommand} using provided down/up positions.
 *
 * @param posDown
 * @param posUp
 */
export const PEN = (posDown?: number, posUp?: number): PenConfigCommand => [
	"pen",
	posDown,
	posUp,
];

/**
 * Creates a {@link PenUpDownCommand} to move the pen up.
 *
 * @param delay
 */
export const UP = (delay?: number): PenUpDownCommand => ["u", delay];

/**
 * Creates a {@link PenUpDownCommand} to move the pen down.
 *
 * @param delay
 */
export const DOWN = (delay?: number): PenUpDownCommand => ["d", delay];

export const ON: MotorCommand = ["on"];

export const OFF: MotorCommand = ["off"];

/**
 * Creates a {@link MoveXYCommand} command (absolute coordinates).
 *
 * @param pos
 * @param speed
 */
export const MOVE = (pos: ReadonlyVec, speed = 1): MoveXYCommand => [
	"M",
	pos,
	speed,
];

/**
 * Creates a {@link MoveRelCommand} command (relative coordinates).
 *
 * @param delta
 * @param speed
 */
export const MOVE_REL = (delta: ReadonlyVec, speed = 1): MoveRelCommand => [
	"m",
	delta,
	speed,
];

/**
 * Creates a {@link WaitCommand}. Default delay is 1000 ms.
 *
 * @param delay
 */
export const WAIT = (delay = 1000): WaitCommand => ["w", delay];

/**
 * Creates a {@link CommentCommand}.
 *
 * @param msg
 */
export const COMMENT = (msg: string): CommentCommand => ["comment", msg];

/**
 * Syntax sugar. Takes an iterable of draw commands, adds {@link START} as
 * prefix and {@link STOP} as suffix. I.e. it creates a "complete" drawing...
 *
 * @example
 * ```ts
 * [...complete([ MOVE([0, 0]) ])]
 * // [ ["start"], ["M", [0, 0]], ["stop"] ]
 * ```
 *
 * @param commands
 */
export function* complete(commands: Iterable<DrawCommand>) {
	yield START;
	yield* commands;
	yield STOP;
}
