const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const A = extern struct {
    a: bindgen.OpaquePtr,
    ptr: *bindgen.OpaquePtr,
    ptr2: *[2]bindgen.OpaquePtr,
    constPtr: *bindgen.ConstOpaquePtr,
    slice: bindgen.OpaquePtrSlice,
    constSlice: bindgen.ConstOpaquePtrSlice,
    array: [3]bindgen.OpaquePtr,
    constArray: [3]bindgen.ConstOpaquePtr,
};
