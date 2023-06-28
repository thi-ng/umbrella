const std = @import("std");
const builtin = @import("builtin");
const Allocator = std.mem.Allocator;

/// `std.Arraylist` based data structure for associating and auto-indexing
/// newly added items with numeric IDs and managing a pool of free IDs.
/// Wraps `std.Arraylist` with a simple add()/remove()/get()/has() API and
/// adds free slot tracking & re-use (depending on value type, potentially
/// without any memory overhead). Free slots are stored as implicit linked
/// list within the same array as the actual values/items.
/// Important: The provided `.remove()` function MUST be used to remove
/// unused items and mark their slot IDs for re-use.
pub fn ManagedIndex(comptime T: type, comptime I: type) type {
    const info = @typeInfo(I);
    if (!(info == .Int and info.Int.bits > 0 and info.Int.signedness == std.builtin.Signedness.unsigned)) {
        @compileError("require unsigned int as index type");
    }
    const Item = union(enum) {
        /// Actual user defined value
        value: T,
        /// Free list slot ID. Index of the next avail free slot
        id: ?I,
    };

    return struct {
        /// backing array list
        list: std.ArrayList(Item),
        /// Index of the head of the implicitly stored list of free slots
        /// Free slots in the array list use `Item.id` fields, each storing
        /// the index of the next available free slot (or null)
        /// The backing array list only grows if `freeID` is null
        freeID: ?I = null,
        /// Number of currently used items
        used: usize = 0,

        const Self = @This();

        /// Initializes the underlying array list
        pub fn init(allocator: Allocator) Self {
            return .{
                .list = std.ArrayList(Item).init(allocator),
            };
        }

        /// Initializes the underlying array list with given initial capacity
        pub fn initCapacity(allocator: Allocator, num: usize) !Self {
            return .{
                .list = try std.ArrayList(Item).initCapacity(allocator, num),
            };
        }

        /// De-initializes the underlying array list
        pub fn deinit(self: *Self) void {
            self.list.deinit();
        }

        /// Clears, frees & resets this list and its backing array list.
        pub fn clear(self: *Self) void {
            self.list.clearAndFree();
            self.freeID = null;
            self.used = 0;
        }

        /// Adds given `item` to the list and returns slot ID. If possible
        /// re-uses existing free slots, else attempts to allocate a new slot.
        pub fn add(self: *Self, item: T) Allocator.Error!I {
            if (self.freeID) |id| {
                self.freeID = self.list.items[id].id;
                self.list.items[id] = .{ .value = item };
                self.used += 1;
                return @intCast(id);
            } else {
                const id = self.list.items.len;
                try self.list.append(.{ .value = item });
                self.used += 1;
                return @intCast(id);
            }
        }

        /// Adds given `id` to the internal free slot list and removes related
        /// value/item
        pub fn remove(self: *Self, id: I) void {
            if (!self.has(id)) return;
            self.list.items[id] = .{ .id = self.freeID };
            self.freeID = id;
            self.used -= 1;
        }

        /// Checks if given `id` is valid (skipped in unsafe release modes) and
        /// returns item value or null if ID is invalid.
        pub fn get(self: *const Self, id: I) ?T {
            if (builtin.mode == .ReleaseFast or builtin.mode == .ReleaseSmall) {
                return self.list.items[id].value;
            }
            return if (self.has(id)) self.list.items[id].value else null;
        }

        /// Returns true if given `id` is valid, i.e. is referring to a
        /// currently used item and isn't part of the list of free slots.
        pub fn has(self: *const Self, id: I) bool {
            if (id >= self.list.items.len) return false;
            var freeID = self.freeID;
            while (true) {
                if (freeID) |fid| {
                    if (fid == id) return false;
                    freeID = self.list.items[fid].id;
                } else {
                    return true;
                }
            }
        }

        /// Iterator for currently used values (in ascending index order)
        pub const ValueIterator = struct {
            parent: *const Self,
            i: usize = 0,

            pub fn init(parent: *const Self) @This() {
                return .{ .parent = parent };
            }

            pub inline fn next(self: *@This()) ?T {
                const items = self.parent.list.items;
                if (self.i >= items.len) return null;
                while (self.i < items.len) {
                    const val = switch (items[self.i]) {
                        .value => |value| value,
                        .id => null,
                    };
                    self.i += 1;
                    if (val != null) return val;
                }
                return null;
            }
        };

        /// Returns iterator of currently used values
        pub fn values(self: *const Self) ValueIterator {
            return ValueIterator.init(self);
        }

        /// Allocates a new slice containing only currently used values and
        /// returns it. Caller owns returned memory.
        pub fn valuesAsSlice(self: *Self, allocator: Allocator) Allocator.Error![]T {
            var slice = try allocator.alloc(T, self.used);
            var iter = self.values();
            var i: usize = 0;
            while (iter.next()) |value| {
                slice[i] = value;
                i += 1;
            }
            return slice;
        }

        /// Allocates a new slice of all currently free slot IDs and returns it.
        /// Caller owns returned memory.
        /// Internal/debug only.
        fn freeIndicesAsSlice(self: *const Self, allocator: Allocator) Allocator.Error![]I {
            var slice = try allocator.alloc(I, self.list.items.len - self.used);
            var i: I = 0;
            var freeID = self.freeID;
            while (i < slice.len) {
                if (freeID) |fid| {
                    slice[i] = fid;
                    freeID = self.list.items[fid].id;
                    i += 1;
                } else {
                    break;
                }
            }
            return slice;
        }
    };
}

test "ManagedIndex" {
    const allocator = std.testing.allocator;
    const expect = std.testing.expect;
    const expectEqualSlices = std.testing.expectEqualSlices;

    var list = ManagedIndex(f64, u8).init(allocator);
    defer list.deinit();
    try expect(try list.add(123) == 0);
    try expect(try list.add(123) == 1);

    try expect(list.has(0));
    try expect(list.has(1));
    try expect(list.used == 2);

    list.remove(0);
    try expect(!list.has(0));
    try expect(!list.has(2));
    try expect(list.used == 1);

    try expect(try list.add(123) == 0);
    try expect(try list.add(123) == 2);
    try expect(list.has(2));
    try expect(list.used == 3);

    list.remove(1);
    list.remove(2);

    var ids = try list.freeIndicesAsSlice(allocator);
    defer allocator.free(ids);
    try expectEqualSlices(u8, &[_]u8{ 2, 1 }, ids);

    try expect(try list.add(202) == 2);
    list.remove(0);
    try expect(try list.add(200) == 0);
    try expect(try list.add(201) == 1);
    try expect(list.freeID == null);

    var iter = list.values();
    try expect(if (iter.next()) |v| v == 200 else false);
    try expect(if (iter.next()) |v| v == 201 else false);
    try expect(if (iter.next()) |v| v == 202 else false);
    try expect(iter.next() == null);

    const slice = try list.valuesAsSlice(allocator);
    defer allocator.free(slice);
    try expectEqualSlices(f64, &[_]f64{ 200, 201, 202 }, slice);

    list.remove(0);
    list.remove(2);
    list.remove(1);

    var ids2 = try list.freeIndicesAsSlice(allocator);
    defer allocator.free(ids2);
    try expectEqualSlices(u8, &[_]u8{ 1, 2, 0 }, ids2);
}
