pub const Bar = enum(i32) {
    A,
    B = 16,
    C,
    D = 32,
};

pub const Foo = struct {
    single: []const u8,
    multi: [2][]const u8,
    singlePtr: *[]const u8,
    multiPtr: *[2][]const u8,
    kind: Bar,
};

export fn Foo_align() usize {
    return @alignOf(Foo);
}

export fn Foo_size() usize {
    return @sizeOf(Foo);
}

export fn Foo_single_align() usize {
    return @alignOf([]const u8);
}

export fn Foo_single_offset() usize {
    return @offsetOf(Foo, "single");
}

export fn Foo_single_size() usize {
    return @sizeOf([]const u8);
}

export fn Foo_multi_align() usize {
    return @alignOf([2][]const u8);
}

export fn Foo_multi_offset() usize {
    return @offsetOf(Foo, "multi");
}

export fn Foo_multi_size() usize {
    return @sizeOf([2][]const u8);
}

export fn Foo_singlePtr_align() usize {
    return @alignOf(*[]const u8);
}

export fn Foo_singlePtr_offset() usize {
    return @offsetOf(Foo, "singlePtr");
}

export fn Foo_singlePtr_size() usize {
    return @sizeOf(*[]const u8);
}

export fn Foo_multiPtr_align() usize {
    return @alignOf(*[2][]const u8);
}

export fn Foo_multiPtr_offset() usize {
    return @offsetOf(Foo, "multiPtr");
}

export fn Foo_multiPtr_size() usize {
    return @sizeOf(*[2][]const u8);
}

export fn Foo_kind_align() usize {
    return @alignOf(Bar);
}

export fn Foo_kind_offset() usize {
    return @offsetOf(Foo, "kind");
}

export fn Foo_kind_size() usize {
    return @sizeOf(Bar);
}
