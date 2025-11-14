// SPDX-License-Identifier: Apache-2.0
const types = @import("types.zig");

pub extern "todo" fn loadTasks(tasks: *[]types.Task) void;
pub extern "todo" fn persistTasks(tasks: [*]types.Task, num: usize) void;

pub extern "todo" fn _formatDateTime(epoch: u32, addr: *anyopaque, maxLen: usize) usize;

pub fn formatDateTime(epoch: u32, buf: []u8) [:0]u8 {
    return buf[0.._formatDateTime(epoch, buf.ptr, buf.len) :0];
}
