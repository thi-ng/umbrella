const std = @import("std");
const wasm = @import("wasmapi");

pub const ASlice = wasm.Slice([]A, [*]A);
pub const ConstASlice = wasm.Slice([]const A, [*]const A);

pub const A = *const fn(x: *u32, y: wasm.ConstStringPtr) void;

pub const B = extern struct {
    a: A,
    ptr: *A,
    ptr2: *[2]A,
    array: [2]A,
    slice: ASlice,
};
