import type { Val1 } from "@thi.ng/api";
import { PackedBuffer } from "@thi.ng/pixel";

// event ID constants
export const SET_IMAGE = "set-image";
export const UPDATE_IMAGE = "update-image";
export const SET_KERNEL_WIDTH = "set-kernel-width";
export const SET_KERNEL_OFFSET = "set-kernel-offset";

// define all possible event structures/signatures
export interface EventTypeMap {
    [SET_IMAGE]: [typeof SET_IMAGE, File];
    [UPDATE_IMAGE]: [typeof UPDATE_IMAGE];
    [SET_KERNEL_WIDTH]: [typeof SET_KERNEL_WIDTH, number];
    [SET_KERNEL_OFFSET]: [typeof SET_KERNEL_OFFSET, number];
}

export type EventType = keyof EventTypeMap;

export type Event = Val1<EventTypeMap, EventType>;

export interface AppState {
    srcImg?: PackedBuffer;
    destImg?: PackedBuffer;
    threshold: {
        windowSize: number;
        offset: number;
    };
}
