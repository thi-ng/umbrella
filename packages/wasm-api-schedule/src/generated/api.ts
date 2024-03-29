/**
 * Generated by @thi.ng/wasm-api-bindgen at 2023-03-26T00:14:48.759Z
 * DO NOT EDIT!
 */

// @ts-ignore possibly includes unused imports
import { Pointer, WasmStringPtr, type MemorySlice, type WasmTypeBase, type WasmTypeConstructor } from "@thi.ng/wasm-api";

export enum ScheduleType {
	/**
	 * One-off execution in the future
	 */
	ONCE,
	/**
	 * Recurring execution at fixed interval
	 */
	INTERVAL,
	/**
	 * As soon as possible execution
	 */
	IMMEDIATE,
}
