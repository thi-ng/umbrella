import type { Fn0 } from "@thi.ng/api";
import { delayed } from "@thi.ng/compose";
import { illegalState } from "@thi.ng/errors";
import { ConsoleLogger } from "@thi.ng/logger";
import { abs2, mulN2, ReadonlyVec, set2, sub2, Vec } from "@thi.ng/vectors";
import { SerialPort } from "serialport";
import type { AxiDrawOpts, DrawCommand } from "./api.js";

export const DEFAULT_OPTS: AxiDrawOpts = {
	logger: new ConsoleLogger("axidraw"),
	pageSize: [297, 210],
	stepsPerInch: 2032,
	speed: 4000,
	up: 60,
	down: 30,
	delayUp: 300,
	delayDown: 300,
	preDelay: 0,
	start: [["on"], ["pen"], ["u"]],
	stop: [["u"], ["home"], ["off"]],
};

export class AxiDraw {
	serial!: SerialPort;
	opts: AxiDrawOpts;
	pos: Vec = [0, 0];

	constructor(opts: Partial<AxiDrawOpts> = {}) {
		this.opts = { ...DEFAULT_OPTS, ...opts };
	}

	async connect(path: RegExp = /^\/dev\/tty\.usbmodem/) {
		for (let port of await SerialPort.list()) {
			if (path.test(port.path)) {
				this.opts.logger.info(`using device: ${port.path}...`);
				this.serial = new SerialPort({
					path: port.path,
					baudRate: 38400,
				});
				return true;
			}
		}
		return false;
	}

	/**
	 * Converts sequence of {@link DrawCommand}s into actual EBB commands and
	 * sends them via configured serial port to the AxiDraw. The optional
	 * `cancel` predicate is checked prior to each individual command and
	 * processing is stopped if that function returns a truthy result.
	 *
	 * @remarks
	 * This function is async and if using `await` will only return once all
	 * commands have been processed or cancelled.
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
	 * @param cancel
	 */
	async draw(commands: Iterable<DrawCommand>, cancel?: Fn0<boolean>) {
		if (!cancel) cancel = () => false;
		const { opts: config, pos } = this;
		const { stepsPerInch, speed, preDelay } = config;
		// scale factor: mm -> motor steps
		const scale = stepsPerInch / 25.4;
		let targetPos: Vec = [0, 0];
		let delta: Vec = [0, 0];
		for (let $cmd of commands) {
			if (cancel()) break;
			const [cmd, a, b] = $cmd;
			let wait: number = -1;
			switch (cmd) {
				case "start":
				case "stop":
					this.draw(config[cmd], cancel);
					break;
				case "home":
					this.draw([["m", [0, 0]]], cancel);
					break;
				case "on":
					this.send("EM,1,1\r");
					break;
				case "off":
					this.send("EM,0,0\r");
					break;
				case "pen":
					{
						let val = a !== undefined ? a : config.down;
						this.send(`SC,5,${(7500 + 175 * val) | 0}\r`);
						val = b !== undefined ? b : config.up;
						this.send(`SC,4,${(7500 + 175 * val) | 0}\r`);
						this.send(`SC,10,65535\r`);
					}
					break;
				case "u":
					wait = a !== undefined ? a : config.delayUp;
					this.send(`SP,1,${wait}\r`);
					break;
				case "d":
					wait = a !== undefined ? a : config.delayDown;
					this.send(`SP,0,${wait}\r`);
					break;
				case "w":
					wait = <number>a;
					break;
				case "m":
					{
						mulN2(targetPos, a, scale);
						sub2(delta, targetPos, pos);
						set2(pos, targetPos);
						config.logger.info("target", targetPos, "delta", delta);
						const maxAxis = Math.max(...abs2([], delta));
						wait = (1000 * maxAxis) / (speed * (b || 1));
						this.send(
							`XM,${wait | 0},${delta[0] | 0},${delta[1] | 0}\r`
						);
					}
					break;
				default:
					illegalState(`unknown command: ${$cmd}`);
			}
			if (wait > 0) {
				wait -= preDelay;
				config.logger.debug(`waiting ${wait}ms...`);
				await delayed(0, Math.max(0, wait));
			}
		}
	}

	/**
	 * Takes an array of 2D points and converts them into an array of
	 * {@link DrawCommand}s. The optional `speed` factor can be used to control
	 * draw speed (default: 1).
	 *
	 * @remarks
	 * Unless `onlyGeo` is explicitly enabled, the resulting command sequence
	 * will also contain necessary pen up/down commands.
	 *
	 * @param pts
	 * @param speed
	 * @param onlyGeo
	 */
	polyline(pts: ReadonlyVec[], speed = 1, onlyGeo = false): DrawCommand[] {
		const commands = pts.map((p) => <DrawCommand>["m", p, speed]);
		return onlyGeo
			? commands
			: [["u"], commands[0], ["d"], ...commands.slice(1), ["u"]];
	}

	protected send(msg: string) {
		this.opts.logger.debug(msg);
		this.serial.write(msg);
	}
}
