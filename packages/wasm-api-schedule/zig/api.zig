//! Generated by @thi.ng/wasm-api-bindgen at 2022-11-23T12:10:08.507Z
//! DO NOT EDIT!

const std = @import("std");
const wasm = @import("wasmapi");

pub const ScheduleType = enum(i32) {
    /// One-off execution in the future
    once,
    /// Recurring execution at fixed interval
    interval,
    /// As soon as possible execution
    immediate,
};