const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const ASlice = bindgen.Slice([]A, [*]A);
pub const ConstASlice = bindgen.Slice([]const A, [*]const A);

pub const A = *const fn (x: *u32, y: bindgen.ConstStringPtr) void;

pub const B = extern struct {
    a: A,
    ptr: *A,
    ptr2: *[2]A,
    array: [2]A,
    slice: ASlice,
};
