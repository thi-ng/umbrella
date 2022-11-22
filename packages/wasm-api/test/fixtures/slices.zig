const std = @import("std");
const wasm = @import("wasmapi");

pub const U8Slice = wasm.Slice([]u8, [*]u8);
pub const ConstU8Slice = wasm.Slice([]const u8, [*]const u8);

pub const BSlice = wasm.Slice([]B, [*]B);
pub const ConstBSlice = wasm.Slice([]const B, [*]const B);

pub const A = extern struct {
    slice: U8Slice,
    constSlice: ConstU8Slice,
    ptr: *u8,
    constPtr: *const u8,
    ptr2: *[2]u8,
    ptr2sentinel: *[2:0]u8,
    constPtr2: *const [2]u8,
    constPtr2sentinel: *const [2:0]u8,
    array: [2]u8,
    bslice: BSlice,
    constBSlice: ConstBSlice,
    bptr: *B,
    bptr2: *[2]B,
};

export fn A_align() usize {
    return @alignOf(A);
}

export fn A_size() usize {
    return @sizeOf(A);
}

export fn A_slice_align() usize {
    return @alignOf(U8Slice);
}

export fn A_slice_offset() usize {
    return @offsetOf(A, "slice");
}

export fn A_slice_size() usize {
    return @sizeOf(U8Slice);
}

export fn A_constSlice_align() usize {
    return @alignOf(ConstU8Slice);
}

export fn A_constSlice_offset() usize {
    return @offsetOf(A, "constSlice");
}

export fn A_constSlice_size() usize {
    return @sizeOf(ConstU8Slice);
}

export fn A_ptr_align() usize {
    return @alignOf(*u8);
}

export fn A_ptr_offset() usize {
    return @offsetOf(A, "ptr");
}

export fn A_ptr_size() usize {
    return @sizeOf(*u8);
}

export fn A_constPtr_align() usize {
    return @alignOf(*const u8);
}

export fn A_constPtr_offset() usize {
    return @offsetOf(A, "constPtr");
}

export fn A_constPtr_size() usize {
    return @sizeOf(*const u8);
}

export fn A_ptr2_align() usize {
    return @alignOf(*[2]u8);
}

export fn A_ptr2_offset() usize {
    return @offsetOf(A, "ptr2");
}

export fn A_ptr2_size() usize {
    return @sizeOf(*[2]u8);
}

export fn A_ptr2sentinel_align() usize {
    return @alignOf(*[2:0]u8);
}

export fn A_ptr2sentinel_offset() usize {
    return @offsetOf(A, "ptr2sentinel");
}

export fn A_ptr2sentinel_size() usize {
    return @sizeOf(*[2:0]u8);
}

export fn A_constPtr2_align() usize {
    return @alignOf(*const [2]u8);
}

export fn A_constPtr2_offset() usize {
    return @offsetOf(A, "constPtr2");
}

export fn A_constPtr2_size() usize {
    return @sizeOf(*const [2]u8);
}

export fn A_constPtr2sentinel_align() usize {
    return @alignOf(*const [2:0]u8);
}

export fn A_constPtr2sentinel_offset() usize {
    return @offsetOf(A, "constPtr2sentinel");
}

export fn A_constPtr2sentinel_size() usize {
    return @sizeOf(*const [2:0]u8);
}

export fn A_array_align() usize {
    return @alignOf([2]u8);
}

export fn A_array_offset() usize {
    return @offsetOf(A, "array");
}

export fn A_array_size() usize {
    return @sizeOf([2]u8);
}

export fn A_bslice_align() usize {
    return @alignOf(BSlice);
}

export fn A_bslice_offset() usize {
    return @offsetOf(A, "bslice");
}

export fn A_bslice_size() usize {
    return @sizeOf(BSlice);
}

export fn A_constBSlice_align() usize {
    return @alignOf(ConstBSlice);
}

export fn A_constBSlice_offset() usize {
    return @offsetOf(A, "constBSlice");
}

export fn A_constBSlice_size() usize {
    return @sizeOf(ConstBSlice);
}

export fn A_bptr_align() usize {
    return @alignOf(*B);
}

export fn A_bptr_offset() usize {
    return @offsetOf(A, "bptr");
}

export fn A_bptr_size() usize {
    return @sizeOf(*B);
}

export fn A_bptr2_align() usize {
    return @alignOf(*[2]B);
}

export fn A_bptr2_offset() usize {
    return @offsetOf(A, "bptr2");
}

export fn A_bptr2_size() usize {
    return @sizeOf(*[2]B);
}

pub const B = extern struct {
    a: u16,
};

export fn B_align() usize {
    return @alignOf(B);
}

export fn B_size() usize {
    return @sizeOf(B);
}

export fn B_a_align() usize {
    return @alignOf(u16);
}

export fn B_a_offset() usize {
    return @offsetOf(B, "a");
}

export fn B_a_size() usize {
    return @sizeOf(u16);
}
