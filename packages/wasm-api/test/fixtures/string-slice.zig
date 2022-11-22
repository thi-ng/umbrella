const std = @import("std");
const wasm = @import("wasmapi");

pub const Foo = extern struct {
    single: wasm.ConstString,
    singleMut: wasm.String,
    multi: [2]wasm.ConstString,
    singlePtr: *wasm.ConstString,
    multiPtr: *[2]wasm.ConstString,
    slice: wasm.ConstStringSlice,
    mutSlice: wasm.StringSlice,
};

export fn Foo_align() usize {
    return @alignOf(Foo);
}

export fn Foo_size() usize {
    return @sizeOf(Foo);
}

export fn Foo_single_align() usize {
    return @alignOf(wasm.ConstString);
}

export fn Foo_single_offset() usize {
    return @offsetOf(Foo, "single");
}

export fn Foo_single_size() usize {
    return @sizeOf(wasm.ConstString);
}

export fn Foo_singleMut_align() usize {
    return @alignOf(wasm.String);
}

export fn Foo_singleMut_offset() usize {
    return @offsetOf(Foo, "singleMut");
}

export fn Foo_singleMut_size() usize {
    return @sizeOf(wasm.String);
}

export fn Foo_multi_align() usize {
    return @alignOf([2]wasm.ConstString);
}

export fn Foo_multi_offset() usize {
    return @offsetOf(Foo, "multi");
}

export fn Foo_multi_size() usize {
    return @sizeOf([2]wasm.ConstString);
}

export fn Foo_singlePtr_align() usize {
    return @alignOf(*wasm.ConstString);
}

export fn Foo_singlePtr_offset() usize {
    return @offsetOf(Foo, "singlePtr");
}

export fn Foo_singlePtr_size() usize {
    return @sizeOf(*wasm.ConstString);
}

export fn Foo_multiPtr_align() usize {
    return @alignOf(*[2]wasm.ConstString);
}

export fn Foo_multiPtr_offset() usize {
    return @offsetOf(Foo, "multiPtr");
}

export fn Foo_multiPtr_size() usize {
    return @sizeOf(*[2]wasm.ConstString);
}

export fn Foo_slice_align() usize {
    return @alignOf(wasm.ConstStringSlice);
}

export fn Foo_slice_offset() usize {
    return @offsetOf(Foo, "slice");
}

export fn Foo_slice_size() usize {
    return @sizeOf(wasm.ConstStringSlice);
}

export fn Foo_mutSlice_align() usize {
    return @alignOf(wasm.StringSlice);
}

export fn Foo_mutSlice_offset() usize {
    return @offsetOf(Foo, "mutSlice");
}

export fn Foo_mutSlice_size() usize {
    return @sizeOf(wasm.StringSlice);
}
