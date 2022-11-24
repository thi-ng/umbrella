const std = @import("std");
const wasmtypes = @import("wasmapi-types");

pub const ASlice = wasmtypes.Slice([]A, [*]A);
pub const ConstASlice = wasmtypes.Slice([]const A, [*]const A);

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
