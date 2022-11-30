const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const U8Slice = bindgen.Slice([]u8, [*]u8);
pub const ConstU8Slice = bindgen.Slice([]const u8, [*]const u8);

pub const ASlice = bindgen.Slice([]A, [*]A);
pub const ConstASlice = bindgen.Slice([]const A, [*]const A);

pub const A = extern struct {
    a: u16,
};

export fn A_align() usize {
    return @alignOf(A);
}

export fn A_size() usize {
    return @sizeOf(A);
}

export fn A_a_align() usize {
    return @alignOf(u16);
}

export fn A_a_offset() usize {
    return @offsetOf(A, "a");
}

export fn A_a_size() usize {
    return @sizeOf(u16);
}

pub const B = extern struct {
    slice: U8Slice,
    constSlice: ConstU8Slice,
    ptr: *u8,
    constPtr: *const u8,
    ptr2: *[2]u8,
    ptr2sentinel: *[2:0]u8,
    constPtr2: *const [2]u8,
    constPtr2sentinel: *const [2:0]u8,
    ptrMulti: [*]u8,
    ptrMultiSentinel: [*:255]u8,
    constPtrMulti: [*]const u8,
    constPtrMultiSentinel: [*:255]const u8,
    array: [2]i32,
    arraySentinel: [2:0]i32,
    aSingle: A,
    aSlice: ASlice,
    constASlice: ConstASlice,
    aPtr: *A,
    aPtr2: *[2]A,
    /// Multiple A's
    aPtrMulti: [*]A,
};

export fn B_align() usize {
    return @alignOf(B);
}

export fn B_size() usize {
    return @sizeOf(B);
}

export fn B_slice_align() usize {
    return @alignOf(U8Slice);
}

export fn B_slice_offset() usize {
    return @offsetOf(B, "slice");
}

export fn B_slice_size() usize {
    return @sizeOf(U8Slice);
}

export fn B_constSlice_align() usize {
    return @alignOf(ConstU8Slice);
}

export fn B_constSlice_offset() usize {
    return @offsetOf(B, "constSlice");
}

export fn B_constSlice_size() usize {
    return @sizeOf(ConstU8Slice);
}

export fn B_ptr_align() usize {
    return @alignOf(*u8);
}

export fn B_ptr_offset() usize {
    return @offsetOf(B, "ptr");
}

export fn B_ptr_size() usize {
    return @sizeOf(*u8);
}

export fn B_constPtr_align() usize {
    return @alignOf(*const u8);
}

export fn B_constPtr_offset() usize {
    return @offsetOf(B, "constPtr");
}

export fn B_constPtr_size() usize {
    return @sizeOf(*const u8);
}

export fn B_ptr2_align() usize {
    return @alignOf(*[2]u8);
}

export fn B_ptr2_offset() usize {
    return @offsetOf(B, "ptr2");
}

export fn B_ptr2_size() usize {
    return @sizeOf(*[2]u8);
}

export fn B_ptr2sentinel_align() usize {
    return @alignOf(*[2:0]u8);
}

export fn B_ptr2sentinel_offset() usize {
    return @offsetOf(B, "ptr2sentinel");
}

export fn B_ptr2sentinel_size() usize {
    return @sizeOf(*[2:0]u8);
}

export fn B_constPtr2_align() usize {
    return @alignOf(*const [2]u8);
}

export fn B_constPtr2_offset() usize {
    return @offsetOf(B, "constPtr2");
}

export fn B_constPtr2_size() usize {
    return @sizeOf(*const [2]u8);
}

export fn B_constPtr2sentinel_align() usize {
    return @alignOf(*const [2:0]u8);
}

export fn B_constPtr2sentinel_offset() usize {
    return @offsetOf(B, "constPtr2sentinel");
}

export fn B_constPtr2sentinel_size() usize {
    return @sizeOf(*const [2:0]u8);
}

export fn B_ptrMulti_align() usize {
    return @alignOf([*]u8);
}

export fn B_ptrMulti_offset() usize {
    return @offsetOf(B, "ptrMulti");
}

export fn B_ptrMulti_size() usize {
    return @sizeOf([*]u8);
}

export fn B_ptrMultiSentinel_align() usize {
    return @alignOf([*:255]u8);
}

export fn B_ptrMultiSentinel_offset() usize {
    return @offsetOf(B, "ptrMultiSentinel");
}

export fn B_ptrMultiSentinel_size() usize {
    return @sizeOf([*:255]u8);
}

export fn B_constPtrMulti_align() usize {
    return @alignOf([*]const u8);
}

export fn B_constPtrMulti_offset() usize {
    return @offsetOf(B, "constPtrMulti");
}

export fn B_constPtrMulti_size() usize {
    return @sizeOf([*]const u8);
}

export fn B_constPtrMultiSentinel_align() usize {
    return @alignOf([*:255]const u8);
}

export fn B_constPtrMultiSentinel_offset() usize {
    return @offsetOf(B, "constPtrMultiSentinel");
}

export fn B_constPtrMultiSentinel_size() usize {
    return @sizeOf([*:255]const u8);
}

export fn B_array_align() usize {
    return @alignOf([2]i32);
}

export fn B_array_offset() usize {
    return @offsetOf(B, "array");
}

export fn B_array_size() usize {
    return @sizeOf([2]i32);
}

export fn B_arraySentinel_align() usize {
    return @alignOf([2:0]i32);
}

export fn B_arraySentinel_offset() usize {
    return @offsetOf(B, "arraySentinel");
}

export fn B_arraySentinel_size() usize {
    return @sizeOf([2:0]i32);
}

export fn B_aSingle_align() usize {
    return @alignOf(A);
}

export fn B_aSingle_offset() usize {
    return @offsetOf(B, "aSingle");
}

export fn B_aSingle_size() usize {
    return @sizeOf(A);
}

export fn B_aSlice_align() usize {
    return @alignOf(ASlice);
}

export fn B_aSlice_offset() usize {
    return @offsetOf(B, "aSlice");
}

export fn B_aSlice_size() usize {
    return @sizeOf(ASlice);
}

export fn B_constASlice_align() usize {
    return @alignOf(ConstASlice);
}

export fn B_constASlice_offset() usize {
    return @offsetOf(B, "constASlice");
}

export fn B_constASlice_size() usize {
    return @sizeOf(ConstASlice);
}

export fn B_aPtr_align() usize {
    return @alignOf(*A);
}

export fn B_aPtr_offset() usize {
    return @offsetOf(B, "aPtr");
}

export fn B_aPtr_size() usize {
    return @sizeOf(*A);
}

export fn B_aPtr2_align() usize {
    return @alignOf(*[2]A);
}

export fn B_aPtr2_offset() usize {
    return @offsetOf(B, "aPtr2");
}

export fn B_aPtr2_size() usize {
    return @sizeOf(*[2]A);
}

export fn B_aPtrMulti_align() usize {
    return @alignOf([*]A);
}

export fn B_aPtrMulti_offset() usize {
    return @offsetOf(B, "aPtrMulti");
}

export fn B_aPtrMulti_size() usize {
    return @sizeOf([*]A);
}
