import type { Fn, Maybe } from "@thi.ng/api";
import { fifo, type IReadWriteBuffer } from "@thi.ng/buffers";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { repeatedly } from "@thi.ng/transducers/repeatedly";

export const MAX_READS = 1024;

export enum ChannelState {
	OPEN,
	CLOSING,
	CLOSED,
}

export interface ChannelOpts {
	id: string;
}

export type CSPBuffer<T> = IReadWriteBuffer<[T, Fn<boolean, void>]>;

let NEXT_ID = 0;

export const __nextID = () => NEXT_ID++;

export class ChannelV3<T> {
	state: ChannelState = ChannelState.OPEN;
	writes: CSPBuffer<T>;
	reads: Fn<Maybe<T>, void>[] = [];
	races: Fn<ChannelV3<T>, void>[] = [];
	id: string;

	constructor(opts?: Partial<ChannelOpts>);
	constructor(buf: CSPBuffer<T> | number, opts?: Partial<ChannelOpts>);
	constructor(...args: any[]) {
		let buf: CSPBuffer<T> | number = 1;
		let opts: Maybe<Partial<ChannelOpts>>;
		switch (args.length) {
			case 1:
				if (isPlainObject(args[0])) opts = args[0];
				else buf = args[0];
				break;
			case 2:
				[buf, opts] = args;
				break;
		}
		this.writes = isNumber(buf) ? fifo(buf) : buf;
		this.id = opts?.id ?? `chan-${__nextID()}`;
	}

	async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
		while (this.state < ChannelState.CLOSED) {
			const x = await this.read();
			if (x !== undefined) yield x;
		}
	}

	read() {
		return new Promise<Maybe<T>>((resolve) => {
			if (!this.readable()) {
				resolve(undefined);
				return;
			}
			// if closing only allow more reads if there're still in-flight writes
			if (this.state < ChannelState.CLOSING || this.writes.readable()) {
				// limit number of read requests
				if (this.reads.length < MAX_READS) {
					this.reads.push(resolve);
				} else {
					resolve(undefined);
				}
			}
			if (this.writes.readable()) this.deliver();
		});
	}

	write(msg: T) {
		return new Promise<boolean>((resolve) => {
			if (!this.writable()) {
				resolve(false);
				return;
			}
			const { reads, writes, races } = this;
			if (!(writes.writable() && writes.write([msg, resolve]))) {
				resolve(false);
			}
			if (reads.length) {
				this.deliver();
			} else if (races.length) {
				races.shift()!(this);
			}
		});
	}

	race() {
		return new Promise<ChannelV3<T>>((resolve) => {
			if (!this.readable()) {
				resolve(this);
				return;
			}
			this.races.push(resolve);
			if (this.writes.readable()) {
				this.races.shift()!(this);
			}
		});
	}

	close() {
		if (this.state >= ChannelState.CLOSING) return;
		const { reads, writes, races } = this;
		this.state =
			reads.length || writes.readable()
				? ChannelState.CLOSING
				: ChannelState.CLOSED;
		// deliver outstanding
		while (reads.length && writes.readable()) this.deliver();
		// cancel remaining reads
		if (!writes.readable()) {
			while (reads.length) reads.shift()!(undefined);
		}
		this.state = writes.readable()
			? ChannelState.CLOSING
			: ChannelState.CLOSED;
		while (races.length) races.shift()!(this);
	}

	/**
	 * Returns true if the channel is principally readable (i.e. not yet
	 * closed), however there might not be any values available yet and reads
	 * might block.
	 */
	readable() {
		return this.state < ChannelState.CLOSED;
	}

	/**
	 * Returns true if the channel is principally writable (i.e. not closing or
	 * closed), however depending on buffer behavior the channel might not yet
	 * accept new values and writes might block.
	 */
	writable() {
		return this.state === ChannelState.OPEN;
	}

	/**
	 * Returns true if the channel is fully closed and no further reads or
	 * writes are possible.
	 */
	closed() {
		return this.state === ChannelState.CLOSED;
	}

	async drain(): Promise<T[]> {
		return await (async () =>
			Promise.all([
				...repeatedly(
					() => <Promise<T>>this.read(),
					this.writes.length
				),
			]))();
	}

	async consume(res: T[] = []) {
		for await (let x of this) res.push(x);
		return res;
	}

	deliver() {
		const { reads, writes } = this;
		const [msg, write] = writes.read();
		write(true);
		reads.shift()!(msg);
		if (this.state === ChannelState.CLOSING && !writes.readable()) {
			this.state = ChannelState.CLOSED;
		}
	}
}

export const select = async <T>(
	...inputs: ChannelV3<T>[]
): Promise<[Maybe<T>, ChannelV3<T>]> => {
	const sel = await Promise.race(inputs.map((x) => x.race()));
	for (let chan of inputs) {
		if (chan !== sel) chan.races.shift();
	}
	if (sel.writes.readable()) {
		const [msg, write] = sel.writes.read();
		write(true);
		return [msg, sel];
	}
	return [undefined, sel];
};

export const broadcast = async <T>(
	src: ChannelV3<T>,
	dest: ChannelV3<T>[],
	close = true
) => {
	for await (let x of src) {
		for (let chan of dest) chan.write(x);
	}
	if (close) {
		for (let chan of dest) chan.close();
	}
};

export const pipe = <T>(
	src: ChannelV3<T>,
	dest: ChannelV3<T>,
	close = true
) => {
	(async () => {
		for await (let x of src) {
			await dest.write(x);
			if (!dest.writable()) break;
		}
		close && dest.close();
	})();
	return dest;
};

export const merge = <T>(
	src: ChannelV3<T>[],
	dest?: ChannelV3<T>,
	close = true
) => {
	dest = dest || new ChannelV3<T>();
	(async () => {
		while (true) {
			const [x, ch] = await select(...src);
			if (x === undefined) {
				src.splice(src.indexOf(ch), 1);
				if (!src.length) {
					close && dest.close();
					break;
				}
			} else {
				await dest.write(x);
			}
		}
	})();
	return dest;
};

export const fromAsyncIterable = <T>(src: AsyncIterable<T>, close = true) => {
	const chan = new ChannelV3<T>();
	(async () => {
		for await (let x of src) {
			await chan.write(x);
			if (!chan.writable()) break;
		}
		close && chan.close();
	})();
	return chan;
};
