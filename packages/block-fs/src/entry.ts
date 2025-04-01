import type { Nullable } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { utf8Length } from "@thi.ng/strings/utf8";
import { EntryType, type EntrySpec } from "./api.js";
import { Directory } from "./directory.js";
import type { BlockFS } from "./fs.js";

export class Entry {
	static readonly NAME_MAX_LENGTH = 31;
	static readonly SIZE = 64;

	protected view: DataView;

	constructor(
		public readonly fs: BlockFS,
		public readonly parent: Directory | null,
		public readonly blockID: number,
		public readonly data: Uint8Array,
		public readonly offset: number
	) {
		this.view = new DataView(
			data.buffer,
			data.byteOffset + offset,
			Entry.SIZE
		);
	}

	get free() {
		return !!(this.data[this.offset] & 0b1000_0000);
	}

	set free(free: boolean) {
		if (free) this.data[this.offset] |= 0b1000_0000;
		else this.data[this.offset] &= 0b0111_1111;
	}

	get type() {
		return <EntryType>((this.data[this.offset] >> 6) & 1);
	}

	set type(type: EntryType) {
		if (type) this.data[this.offset] |= 0b0100_0000;
		else this.data[this.offset] &= 0b1011_1111;
	}

	get locked() {
		return !!(this.data[this.offset] & 0b0010_0000);
	}

	set locked(locked: boolean) {
		if (locked) this.data[this.offset] |= 0b0010_0000;
		else this.data[this.offset] &= 0b1101_1111;
	}

	get owner() {
		return this.data[this.offset] & 0b0001_1111;
	}

	set owner(owner: number) {
		if (owner < 0 || owner > 31) illegalArgs("illegal owner ID");
		this.data[this.offset] = (this.data[this.offset] & 0b1110_0000) | owner;
	}

	get name() {
		if (this.free) return "";
		const offset = this.offset + 1;
		let terminator = this.data.indexOf(0, offset);
		if (terminator < 0 || terminator > offset + Entry.NAME_MAX_LENGTH)
			terminator = offset + Entry.NAME_MAX_LENGTH;
		return new TextDecoder().decode(this.data.subarray(offset, terminator));
	}

	set name(name: string) {
		const length = utf8Length(name);
		if (
			(!length && this.blockID !== this.fs.rootDirBlockID) ||
			length > Entry.NAME_MAX_LENGTH
		)
			illegalArgs(`invalid name: '${name}'`);
		const offset = this.offset + 1;
		this.data.fill(0, offset, offset + Entry.NAME_MAX_LENGTH);
		new TextEncoder().encodeInto(
			name,
			this.data.subarray(offset, offset + Entry.NAME_MAX_LENGTH)
		);
	}

	get size() {
		return this.view.getBigUint64(32, true);
	}

	set size(size: bigint) {
		this.view.setBigUint64(32, size, true);
	}

	get ctime() {
		return Number(this.view.getBigUint64(40, true));
	}

	set ctime(epoch: number) {
		this.view.setBigUint64(40, BigInt(epoch), true);
	}

	get mtime() {
		return Number(this.view.getBigUint64(48, true));
	}

	set mtime(epoch: number) {
		this.view.setBigUint64(48, BigInt(epoch), true);
	}

	get start() {
		return this.view.getUint32(56, true);
	}

	set start(block: number) {
		this.view.setUint32(56, block, true);
	}

	get end() {
		return this.view.getUint32(60, true);
	}

	set end(block: number) {
		this.view.setUint32(60, block, true);
	}

	set(spec: EntrySpec) {
		this.type = spec.type;
		this.locked = spec.locked ?? false;
		this.owner = spec.owner ?? 0;
		this.name = spec.name;
		this.size = spec.size ?? 0n;
		this.ctime = spec.ctime ?? Date.now();
		this.mtime = spec.mtime ?? spec.ctime ?? Date.now();
		this.start = spec.start;
		this.end = spec.end ?? spec.start;
	}

	release() {
		this.data.fill(0, this.offset, this.offset + Entry.SIZE);
		this.free = true;
	}

	async save() {
		this.fs.storage.saveBlock(this.blockID, this.data);
	}

	/**
	 * Returns absolute path for this entry
	 */
	get path() {
		let path: string[] = [];
		let entry: Nullable<Entry> = this;
		while (entry) {
			path.unshift(entry.name);
			entry = entry.parent?.entry;
		}
		return path.join("/");
	}

	/**
	 * Returns {@link Directory} wrapper for this entry (only if a directory,
	 * else throws errror).
	 */
	get directory() {
		if (this.type !== EntryType.DIR) illegalArgs("entry isn't a directory");
		return new Directory(this.fs, this);
	}
}
