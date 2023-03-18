import { cycle, take } from "@thi.ng/transducers";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type {
	CommentCommand,
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

export const PEN = (delayDown?: number, delayUp?: number): PenConfigCommand => [
	"pen",
	delayDown,
	delayUp,
];

export const UP = (delay?: number): PenUpDownCommand => ["u", delay];

export const DOWN = (delay?: number): PenUpDownCommand => ["d", delay];

export const ON: MotorCommand = ["on"];

export const OFF: MotorCommand = ["off"];

/**
 * Creates a {@link MoveXYCommand} command.
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
 * Creates a {@link MoveRelCommand} command.
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
export const COMMENT = (msg = ""): CommentCommand => ["comment", msg];

/**
 * Yields a sequence of `n` repetitions of {@link DOWN}, {@link UP} commands,
 * e.g. for dipping a brush a few times into a paint reservoir to refill.
 *
 * @example
 * ```ts
 * [...DIP(3, 100, 200)]
 * // [
 * //   [ "d", 100 ],
 * //   [ "u", 200 ],
 * //   [ "d", 100 ],
 * //   [ "u", 200 ],
 * //   [ "d", 100 ],
 * //   [ "u", 200 ]
 * // ]
 * ```
 *
 * @param n
 * @param delayDown
 * @param delayUp
 */
export const DIP = (n: number, delayDown?: number, delayUp?: number) =>
	take(n * 2, cycle([DOWN(delayDown), UP(delayUp)]));
