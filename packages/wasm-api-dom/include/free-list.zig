const std = @import("std");
const builtin = @import("builtin");

/// Wraps `std.Arraylist` with a simple add()/remove()/get()/has() API and
/// adds free slot tracking & re-use (depending on value type, potentially
/// without any memory overhead). Free slots are stored as implicit singly
/// linked list within the same array as the actual values/items.
pub fn FreeList(comptime T: type) type {
    const Item = union {
        value: T,
        id: ?usize,
    };
    return struct {
        list: std.ArrayList(Item),
        freeId: ?usize = null,

        const Self = @This();

        pub fn init(allocator: std.mem.Allocator) Self {
            return .{
                .list = std.ArrayList(Item).init(allocator),
            };
        }

        pub fn deinit(self: *Self) void {
            self.list.deinit();
            self.freeId = null;
        }

        /// Adds given `item` to the list and returns slot ID. If possible
        /// re-uses existing free slots, else attempts to allocate a new slot.
        pub fn add(self: *Self, item: T) std.mem.Allocator.Error!usize {
            if (self.freeId) |id| {
                self.freeId = self.list.items[id].id;
                self.list.items[id] = .{ .value = item };
                return id;
            } else {
                const id = self.list.items.len;
                try self.list.append(.{ .value = item });
                return id;
            }
        }

        /// Adds given `id` to the internal free slot list and removes related
        /// value/item
        pub fn remove(self: *Self, id: usize) void {
            if (!(builtin.mode == .ReleaseFast or builtin.mode == .ReleaseSmall)) {
                if (!self.has(id)) return;
            }
            self.list.items[id] = .{ .id = self.freeId };
            self.freeId = id;
        }

        /// Checks if given `id` is valid (skipped in unsafe release modes) and
        /// returns item value or null if ID is invalid.
        pub fn get(self: *const Self, id: usize) ?T {
            if (builtin.mode == .ReleaseFast or builtin.mode == .ReleaseSmall) {
                return self.list.items[id].value;
            }
            return if (self.has(id)) self.list.items[id].value else null;
        }

        /// Returns true if given `id` is valid, i.e. is referring to a
        /// currently used item (and isn't part of the list of free slots).
        pub fn has(self: *const Self, id: usize) bool {
            if (id >= self.list.items.len) return false;
            var freeId = self.freeId;
            while (true) {
                if (freeId) |fid| {
                    if (fid == id) return false;
                    freeId = self.list.items[fid].id;
                } else {
                    return true;
                }
            }
        }

        /// Writes all current free slot IDs to given slice & returns sub-slice
        pub fn allFreeIDs(self: *const Self, ids: []usize) []usize {
            var i: usize = 0;
            var freeId = self.freeId;
            while (true) {
                if (freeId) |fid| {
                    ids[i] = fid;
                    i += 1;
                    freeId = self.list.items[fid].id;
                } else {
                    return ids[0..i];
                }
            }
        }
    };
}

test "FreeList" {
    var x: f64 = 123;
    var foo = FreeList(f64).init(std.testing.allocator);
    defer foo.deinit();
    try std.testing.expect(try foo.add(x) == 0);
    try std.testing.expect(try foo.add(x) == 1);

    try std.testing.expect(foo.has(0));
    try std.testing.expect(foo.has(1));

    foo.remove(0);
    try std.testing.expect(!foo.has(0));
    try std.testing.expect(!foo.has(2));

    try std.testing.expect(try foo.add(x) == 0);
    try std.testing.expect(try foo.add(x) == 2);
    try std.testing.expect(foo.has(2));

    foo.remove(1);
    foo.remove(2);
    try std.testing.expect(try foo.add(x) == 2);

    foo.remove(0);
    try std.testing.expect(try foo.add(x) == 0);
    try std.testing.expect(try foo.add(x) == 1);

    try std.testing.expect(foo.freeId == null);
}
