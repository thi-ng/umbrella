const std = @import("std");
const wasmtypes = @import("wasmapi-types");

pub const ASlice = wasmtypes.Slice([]A, [*]A);
pub const ConstASlice = wasmtypes.Slice([]const A, [*]const A);

pub const A = *const fn(x: *u32, y: wasmtypes.ConstStringPtr) void;

pub const B = extern struct {
    a: A,
    ptr: *A,
    ptr2: *[2]A,
    array: [2]A,
    slice: ASlice,
};
