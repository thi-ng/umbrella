import type { IReset } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { delayed } from "@thi.ng/compose";
import { assert, ioerror, unsupported } from "@thi.ng/errors";
import { ConsoleLogger } from "@thi.ng/logger";
import {
	abs2,
	mulN2,
	ReadonlyVec,
	set2,
	sub2,
	Vec,
	zero,
	ZERO2,
} from "@thi.ng/vectors";
import { SerialPort } from "serialport";
import {
	AxiDrawOpts,
	AxiDrawState,
	DrawCommand,
	HOME,
	OFF,
	ON,
	PEN,
	UP,
} from "./api.js";
import { AxiDrawControl } from "./control.js";
import { complete } from "./polyline.js";

export const DEFAULT_OPTS: AxiDrawOpts = {
	logger: new ConsoleLogger("axidraw"),
	control: new AxiDrawControl(),
	refresh: 1000,
	unitsPerInch: 25.4,
	stepsPerInch: 2032,
	speed: 4000,
	up: 60,
	down: 30,
	delayUp: 150,
	delayDown: 150,
	preDelay: 0,
	start: [ON, PEN, UP],
	stop: [UP, HOME, OFF],
	sigint: true,
};

export class AxiDraw implements IReset {
	serial!: SerialPort;
	opts: AxiDrawOpts;
	isConnected = false;
	isPenDown = false;
	penLimits: [number, number];
	pos: Vec = [0, 0];
	targetPos: Vec = [0, 0];

	constructor(opts: Partial<AxiDrawOpts> = {}) {
		this.opts = { ...DEFAULT_OPTS, ...opts };
		this.penLimits = [this.opts.down, this.opts.up];
	}

	reset() {
		zero(this.pos);
		zero(this.targetPos);
		return this;
	}

	/**
	 * Async function. Attempts to connect to the drawing machine via given
	 * (partial) serial port path/name, returns true if successful.
	 *
	 * @remarks
	 * First matching port will be used. If `path` is a sting, a port name must
	 * only start with it in order to be considered a match.
	 *
	 * An error is thrown if no matching port could be found.
	 *
	 * @param path
	 */
	async connect(path: string | RegExp = "/dev/tty.usbmodem") {
		const isStr = isString(path);
		for (let port of await SerialPort.list()) {
			if (
				(isStr && port.path.startsWith(path)) ||
				(!isStr && path.test(port.path))
			) {
				this.opts.logger.info(`using device: ${port.path}...`);
				this.serial = new SerialPort({
					path: port.path,
					baudRate: 38400,
				});
				this.isConnected = true;
				if (this.opts.sigint) {
					this.opts.logger.debug("installing signal handler...");
					process.on("SIGINT", this.onSignal.bind(this));
				}
				return;
			}
		}
		ioerror(`no matching device for ${path}`);
	}

	/**
	 * Async function. Converts sequence of {@link DrawCommand}s into actual EBB
	 * commands and sends them via configured serial port to the AxiDraw. If
	 * `wrap` is enabled (default), the given commands will be automatically
	 * wrapped with start/stop commands via {@link complete}. Returns total
	 * number of milliseconds taken for drawing (incl. any pauses caused by the
	 * control).
	 *
	 * @remarks
	 * This function is async and if using `await` will only return once all
	 * commands have been processed or cancelled.
	 *
	 * The `control` implementation/ provided as part of {@link AxiDrawOpts} can
	 * be used to pause, resume or cancel the drawing (see
	 * {@link AxiDrawOpts.control} for details).
	 *
	 * Reference:
	 * - http://evil-mad.github.io/EggBot/ebb.html
	 *
	 * @example
	 * ```ts
	 * // execute start sequence, draw a triangle, then exec stop sequence
	 * axi.draw([
	 *   ["start"],
	 *   ...axi.polyline([[50,50], [100,50], [75, 100], [50,50]]),
	 *   ["stop"]
	 * ]);
	 * ```
	 *
	 * @param commands
	 * @param wrap
	 */
	async draw(commands: Iterable<DrawCommand>, wrap = true) {
		assert(
			this.isConnected,
			"AxiDraw not yet connected, need to call .connect() first"
		);
		let t0 = Date.now();
		const { control, logger, preDelay, refresh } = this.opts;
		for (let $cmd of wrap ? complete(commands) : commands) {
			if (control) {
				let state = control.deref();
				if (state === AxiDrawState.PAUSE) {
					const penDown = this.isPenDown;
					if (penDown) this.penUp();
					do {
						await delayed(0, refresh);
					} while ((state = control.deref()) === AxiDrawState.PAUSE);
					if (state === AxiDrawState.CONTINUE && penDown) {
						this.penDown();
					}
				}
				if (state === AxiDrawState.CANCEL) {
					this.penUp();
					break;
				}
			}
			const [cmd, a, b] = $cmd;
			let wait: number = -1;
			switch (cmd) {
				case "start":
				case "stop":
					this.draw(this.opts[cmd], false);
					break;
				case "home":
					this.home();
					break;
				case "reset":
					this.reset();
					break;
				case "on":
					this.motorsOn();
					break;
				case "off":
					this.motorsOff();
					break;
				case "pen":
					this.penConfig(a, b);
					break;
				case "u":
					wait = this.penUp(a, b);
					break;
				case "d":
					wait = this.penDown(a, b);
					break;
				case "w":
					wait = <number>a;
					break;
				case "m":
					wait = this.moveTo(a, b);
					break;
				default:
					unsupported(`unknown command: ${$cmd}`);
			}
			if (wait > 0) {
				wait = Math.max(0, wait - preDelay);
				logger.debug(`waiting ${wait}ms...`);
				await delayed(0, wait);
			}
		}
		return Date.now() - t0;
	}

	/**
	 * Syntax sugar for drawing a **single** command only, otherwise same as
	 * {@link AxiDraw.draw}.
	 *
	 * @param cmd
	 */
	draw1(cmd: DrawCommand) {
		return this.draw([cmd], false);
	}

	motorsOn() {
		this.send("EM,1,1\r");
	}

	motorsOff() {
		this.send("EM,0,0\r");
	}

	penConfig(down?: number, up?: number) {
		down = down !== undefined ? down : this.opts.down;
		this.sendPenConfig(5, down);
		this.penLimits[0] = down;
		up = up !== undefined ? up : this.opts.up;
		this.sendPenConfig(4, up);
		this.penLimits[1] = up;
		this.send(`SC,10,65535\r`);
	}

	penUp(delay?: number, level?: number) {
		if (level !== undefined) this.sendPenConfig(4, level);
		delay = delay !== undefined && delay >= 0 ? delay : this.opts.delayUp;
		this.send(`SP,1,${delay}\r`);
		this.isPenDown = false;
		return delay;
	}

	penDown(delay?: number, level?: number) {
		if (level !== undefined) this.sendPenConfig(5, level);
		delay = delay !== undefined && delay >= 0 ? delay : this.opts.delayDown;
		this.send(`SP,0,${delay}\r`);
		this.isPenDown = true;
		return delay;
	}

	moveTo(p: ReadonlyVec, tempo = 1) {
		const { pos, targetPos, opts } = this;
		// apply scale factor: worldspace units -> motor steps
		mulN2(targetPos, p, opts.stepsPerInch / opts.unitsPerInch);
		const delta = sub2([], targetPos, pos);
		set2(pos, targetPos);
		const maxAxis = Math.max(...abs2([], delta));
		const duration = (1000 * maxAxis) / (opts.speed * tempo);
		this.send(`XM,${duration | 0},${delta[0] | 0},${delta[1] | 0}\r`);
		return duration;
	}

	home() {
		this.moveTo(ZERO2);
	}

	protected async onSignal() {
		this.opts.logger.warn(`SIGNINT received, stop drawing...`);
		this.penUp(0);
		this.motorsOff();
		await delayed(0, 100);
		process.exit(1);
	}

	protected send(msg: string) {
		this.opts.logger.debug(msg);
		this.serial.write(msg);
	}

	/**
	 * Sends pen up/down config
	 *
	 * @remarks
	 * Reference:
	 * - https://github.com/evil-mad/AxiDraw-Processing/blob/80d81a8c897b8a1872b0555af52a8d1b5b13cec4/AxiGen1/AxiGen1.pde#L213
	 *
	 * @param id
	 * @param x
	 */
	protected sendPenConfig(id: number, x: number) {
		this.send(`SC,${id},${(7500 + 175 * x) | 0}\r`);
	}
}
