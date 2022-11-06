const gen = @import("api-generated.zig");

pub usingnamespace gen;

pub extern "todo" fn loadTasks(tasks: *[]gen.Task) void;
pub extern "todo" fn persistTasks(tasks: [*]gen.Task, num: usize) void;

pub extern "todo" fn _formatDateTime(epoch: u32, addr: *anyopaque, maxLen: usize) usize;

pub fn formatDateTime(epoch: u32, buf: []u8) []u8 {
    return buf[0.._formatDateTime(epoch, buf.ptr, buf.len)];
}
