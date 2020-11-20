import type { Fn, IID, ILength, IRelease } from "@thi.ng/api";
import { Channel } from "./channel";

export interface ChannelItem<T> {
    value(): Promise<T>;
    resolve(success: boolean): void;
}

export interface IBuffer<T> extends ILength, IRelease {
    isEmpty(): boolean;
    isFull(): boolean;
    drop(): ChannelItem<T> | undefined;
    push(x: ChannelItem<T>): boolean;
}

export interface IChannel<T> extends IID<string> {
    channel(): Channel<T>;
    close(flush?: boolean): Promise<void> | undefined;
}

export interface IReadableChannel<T> extends IChannel<T> {
    read(): Promise<T | undefined>;
}

export interface IWriteableChannel<T> extends IChannel<T> {
    write(val: any): Promise<boolean>;
}

export interface IReadWriteableChannel<T>
    extends IReadableChannel<T>,
        IWriteableChannel<T> {}

export type TopicFn<T> = Fn<T, string>;

export type ErrorHandler = (e: Error, chan: Channel<any>, val?: any) => void;
