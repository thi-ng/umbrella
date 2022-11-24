const std = @import("std");
const wasmtypes = @import("wasmapi-types");

pub const A = extern struct {
    a: wasmtypes.OpaquePtr,
    ptr: *wasmtypes.OpaquePtr,
    ptr2: *[2]wasmtypes.OpaquePtr,
    constPtr: *wasmtypes.ConstOpaquePtr,
    slice: wasmtypes.OpaquePtrSlice,
    constSlice: wasmtypes.ConstOpaquePtrSlice,
    array: [3]wasmtypes.OpaquePtr,
    constArray: [3]wasmtypes.ConstOpaquePtr,
};
