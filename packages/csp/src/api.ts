import type { Fn, IID, ILength, IRelease, Maybe } from "@thi.ng/api";
import type { Channel } from "./channel.js";

export interface ChannelItem<T> {
	value(): Promise<T>;
	resolve(success: boolean): void;
}

export interface IBuffer<T> extends ILength, IRelease {
	isEmpty(): boolean;
	isFull(): boolean;
	drop(): Maybe<ChannelItem<T>>;
	push(x: ChannelItem<T>): boolean;
}

export interface IChannel<T> extends IID<string> {
	channel(): Channel<T>;
	close(flush?: boolean): Maybe<Promise<void>>;
}

export interface IReadableChannel<T> {
	read(): Promise<Maybe<T>>;
}

export interface IWriteableChannel<T> {
	write(val: T): Promise<boolean>;
}

export interface IReadWriteableChannel<T>
	extends IReadableChannel<T>,
		IWriteableChannel<T> {}

export type TopicFn<T> = Fn<T, string>;

export type ErrorHandler = (e: Error, chan: Channel<any>, val?: any) => void;
