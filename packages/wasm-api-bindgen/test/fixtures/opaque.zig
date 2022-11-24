const std = @import("std");
const wasm = @import("wasmapi");

pub const A = extern struct {
    a: wasm.OpaquePtr,
    ptr: *wasm.OpaquePtr,
    ptr2: *[2]wasm.OpaquePtr,
    constPtr: *wasm.ConstOpaquePtr,
    slice: wasm.OpaquePtrSlice,
    constSlice: wasm.ConstOpaquePtrSlice,
    array: [3]wasm.OpaquePtr,
    constArray: [3]wasm.ConstOpaquePtr,
};
