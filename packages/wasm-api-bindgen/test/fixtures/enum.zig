const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const ASlice = bindgen.Slice([]A, [*]A);
pub const ConstASlice = bindgen.Slice([]const A, [*]const A);

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
