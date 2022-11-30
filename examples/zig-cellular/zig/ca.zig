//! Multi-behavior 2D cellular automata
//!
//! Cells can be in a configurable number of states with each state
//! using a different user supplied behavior to determine how the
//! next cell state will be reached...
//!
//! Ported from original Java version
//! (c) 2007 - 2022 Karsten Schmidt

const std = @import("std");

pub const Neighborhood = []const [2]i8;

pub const Behavior = struct {
    // Relative neighbor offset coordinates
    neighbors: Neighborhood,
    // Min. required number of neighbor cells which are in next cell state at
    // present
    threshold: u8 = 1,
    // Probability of a cell mutating to its next state (even if neighbor
    // threshold isn't reached)
    mutate: f32 = 0,
};

allocator: std.mem.Allocator,
rnd: std.rand.Random,
behaviors: []const Behavior,
buf: []u8,
cells: []u8,
swap: []u8,
width: u16,
height: u16,
max: u8,

const Self = @This();

pub fn init(
    allocator: std.mem.Allocator,
    rnd: std.rand.Random,
    width: u16,
    height: u16,
    behaviors: []const Behavior,
    max: u8,
) !Self {
    const num = @as(usize, width) * @as(usize, height);
    // allocate 2x amount and use 2nd half as swap space
    var buf = try allocator.alloc(u8, 2 * num);
    return .{
        .allocator = allocator,
        .rnd = rnd,
        .behaviors = behaviors,
        .buf = buf,
        .cells = buf[0..num],
        .swap = buf[num..],
        .width = width,
        .height = height,
        .max = max,
    };
}

pub fn deinit(self: *Self) void {
    self.allocator.free(self.buf);
}

pub fn seed(self: *Self) void {
    for (self.cells) |*cell| {
        cell.* = self.rnd.uintLessThan(u8, self.max);
    }
}

pub fn update(self: *Self) void {
    var y: i16 = 0;
    var i: usize = 0;
    while (y < self.height) : (y += 1) {
        var x: i16 = 0;
        while (x < self.width) : (x += 1) {
            const currState = self.cells[i];
            const nextState = @mod(currState + 1, self.max);
            const behavior = self.behaviors[@mod(currState, self.behaviors.len)];
            var num: u8 = 0;
            for (behavior.neighbors) |offset| {
                var xx = wrapAround(i16, x + offset[0], @intCast(i16, self.width));
                var yy = wrapAround(i16, y + offset[1], @intCast(i16, self.height));
                if (self.cells[@intCast(usize, yy) * self.width + @intCast(usize, xx)] == nextState) num += 1;
                if (num >= behavior.threshold) break;
            }
            self.swap[i] = if (num >= behavior.threshold or self.rnd.float(f32) < behavior.mutate) nextState else currState;
            i += 1;
        }
    }
    std.mem.swap([]u8, &self.cells, &self.swap);
}

inline fn wrapAround(comptime T: type, x: T, max: T) T {
    return if (x < 0) x + max else if (x >= max) x - max else x;
}
