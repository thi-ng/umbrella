const std = @import("std");
const wasm = @import("wasmapi");

pub const Foo = extern struct {
    single: wasm.StringPtr,
    constSingle: wasm.ConstStringPtr,
    multi: [2]wasm.ConstStringPtr,
    singlePtr: *wasm.ConstStringPtr,
    multiPtr: *[2]wasm.ConstStringPtr,
    slice: wasm.StringPtrSlice,
    constSlice: wasm.ConstStringPtrSlice,
};

export fn Foo_align() usize {
    return @alignOf(Foo);
}

export fn Foo_size() usize {
    return @sizeOf(Foo);
}

export fn Foo_single_align() usize {
    return @alignOf(wasm.StringPtr);
}

export fn Foo_single_offset() usize {
    return @offsetOf(Foo, "single");
}

export fn Foo_single_size() usize {
    return @sizeOf(wasm.StringPtr);
}

export fn Foo_constSingle_align() usize {
    return @alignOf(wasm.ConstStringPtr);
}

export fn Foo_constSingle_offset() usize {
    return @offsetOf(Foo, "constSingle");
}

export fn Foo_constSingle_size() usize {
    return @sizeOf(wasm.ConstStringPtr);
}

export fn Foo_multi_align() usize {
    return @alignOf([2]wasm.ConstStringPtr);
}

export fn Foo_multi_offset() usize {
    return @offsetOf(Foo, "multi");
}

export fn Foo_multi_size() usize {
    return @sizeOf([2]wasm.ConstStringPtr);
}

export fn Foo_singlePtr_align() usize {
    return @alignOf(*wasm.ConstStringPtr);
}

export fn Foo_singlePtr_offset() usize {
    return @offsetOf(Foo, "singlePtr");
}

export fn Foo_singlePtr_size() usize {
    return @sizeOf(*wasm.ConstStringPtr);
}

export fn Foo_multiPtr_align() usize {
    return @alignOf(*[2]wasm.ConstStringPtr);
}

export fn Foo_multiPtr_offset() usize {
    return @offsetOf(Foo, "multiPtr");
}

export fn Foo_multiPtr_size() usize {
    return @sizeOf(*[2]wasm.ConstStringPtr);
}

export fn Foo_slice_align() usize {
    return @alignOf(wasm.StringPtrSlice);
}

export fn Foo_slice_offset() usize {
    return @offsetOf(Foo, "slice");
}

export fn Foo_slice_size() usize {
    return @sizeOf(wasm.StringPtrSlice);
}

export fn Foo_constSlice_align() usize {
    return @alignOf(wasm.ConstStringPtrSlice);
}

export fn Foo_constSlice_offset() usize {
    return @offsetOf(Foo, "constSlice");
}

export fn Foo_constSlice_size() usize {
    return @sizeOf(wasm.ConstStringPtrSlice);
}
