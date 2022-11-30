const std = @import("std");
const bindgen = @import("wasm-api-bindgen");

pub const Foo = extern struct {
    single: bindgen.StringPtr,
    constSingle: bindgen.ConstStringPtr,
    multi: [2]bindgen.ConstStringPtr,
    singlePtr: *bindgen.ConstStringPtr,
    multiPtr: *[2]bindgen.ConstStringPtr,
    slice: bindgen.StringPtrSlice,
    constSlice: bindgen.ConstStringPtrSlice,
};

export fn Foo_align() usize {
    return @alignOf(Foo);
}

export fn Foo_size() usize {
    return @sizeOf(Foo);
}

export fn Foo_single_align() usize {
    return @alignOf(bindgen.StringPtr);
}

export fn Foo_single_offset() usize {
    return @offsetOf(Foo, "single");
}

export fn Foo_single_size() usize {
    return @sizeOf(bindgen.StringPtr);
}

export fn Foo_constSingle_align() usize {
    return @alignOf(bindgen.ConstStringPtr);
}

export fn Foo_constSingle_offset() usize {
    return @offsetOf(Foo, "constSingle");
}

export fn Foo_constSingle_size() usize {
    return @sizeOf(bindgen.ConstStringPtr);
}

export fn Foo_multi_align() usize {
    return @alignOf([2]bindgen.ConstStringPtr);
}

export fn Foo_multi_offset() usize {
    return @offsetOf(Foo, "multi");
}

export fn Foo_multi_size() usize {
    return @sizeOf([2]bindgen.ConstStringPtr);
}

export fn Foo_singlePtr_align() usize {
    return @alignOf(*bindgen.ConstStringPtr);
}

export fn Foo_singlePtr_offset() usize {
    return @offsetOf(Foo, "singlePtr");
}

export fn Foo_singlePtr_size() usize {
    return @sizeOf(*bindgen.ConstStringPtr);
}

export fn Foo_multiPtr_align() usize {
    return @alignOf(*[2]bindgen.ConstStringPtr);
}

export fn Foo_multiPtr_offset() usize {
    return @offsetOf(Foo, "multiPtr");
}

export fn Foo_multiPtr_size() usize {
    return @sizeOf(*[2]bindgen.ConstStringPtr);
}

export fn Foo_slice_align() usize {
    return @alignOf(bindgen.StringPtrSlice);
}

export fn Foo_slice_offset() usize {
    return @offsetOf(Foo, "slice");
}

export fn Foo_slice_size() usize {
    return @sizeOf(bindgen.StringPtrSlice);
}

export fn Foo_constSlice_align() usize {
    return @alignOf(bindgen.ConstStringPtrSlice);
}

export fn Foo_constSlice_offset() usize {
    return @offsetOf(Foo, "constSlice");
}

export fn Foo_constSlice_size() usize {
    return @sizeOf(bindgen.ConstStringPtrSlice);
}
