import { illegalState } from "@thi.ng/errors/illegal-state";
import { SerialPort } from "serialport";
import type { ISerial, SerialConnection } from "./api.js";

/**
 * Default connection using the actual serial port.
 */
export const SERIAL_PORT: SerialConnection = {
	list: () => SerialPort.list(),
	ctor: (path, baudRate) => new SerialPort({ path, baudRate }),
};

/**
 * Mock serial connection which uses a in-memory logger to record all draw
 * commands. Only intended for testing/dev purposes.
 */
export const MOCK_SERIAL: SerialConnection = {
	list: async (path) => [{ path }],
	ctor: () => new MockSerial(),
};

/**
 * Minimal mock "serial port" implementation for testing purposes. Records all
 * sent messages into an internal string array for later analysis.
 */
export class MockSerial implements ISerial {
	sent: string[] = [];
	isClosed: boolean = false;

	/**
	 * Clears internal log of "sent" message.
	 */
	clear() {
		this.sent = [];
	}

	close() {
		this.isClosed = true;
	}

	/**
	 * Appends
	 * @param msg
	 */
	write(msg: string): void {
		this.isClosed && illegalState("connection already closed");
		this.sent.push(msg);
	}
}
