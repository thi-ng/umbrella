const std = @import("std");
const wasm = @import("wasmapi");

pub const ASlice = wasm.Slice([]A, [*]A);
pub const ConstASlice = wasm.Slice([]const A, [*]const A);

pub const A = enum(i32) {
    foo,
    bar,
    baz = 10,
};

pub const B = extern struct {
    single: A,
    array: [2]A,
    slice: ASlice,
    ptr: *A,
    ptr2: *[2]A,
};
