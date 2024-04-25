import type { Fn, Maybe } from "@thi.ng/api";
import type { IReadWriteBuffer } from "@thi.ng/buffers";

export type ChannelValue<T> = [T, Fn<boolean, void>];

export type ChannelBuffer<T> = IReadWriteBuffer<ChannelValue<T>>;

export interface IClosable {
	close(): void;
	closed(): boolean;
}

export interface IReadable<T> {
	read(): Promise<Maybe<T>>;
}

export interface IWriteable<T> {
	write(val: T): Promise<boolean>;
	writable(): boolean;
}

export interface IChannel<T> extends IReadable<T>, IWriteable<T>, IClosable {}

export type TopicFn<T> = Fn<T, string>;
