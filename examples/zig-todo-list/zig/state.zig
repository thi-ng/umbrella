// SPDX-License-Identifier: Apache-2.0
const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");
const schedule = @import("wasm-api-schedule").schedule;

const api = @import("api.zig");
const types = @import("types.zig");

allocator: std.mem.Allocator,
tasks: std.ArrayList(*TaskItem),

pub const TaskItem = struct {
    parent: *Self,
    task: types.Task,
    root: i32 = undefined,
    date: i32 = undefined,

    pub fn init(parent: *Self, body: [:0]const u8) TaskItem {
        return TaskItem{
            .parent = parent,
            .task = .{
                .body = body,
                .dateCreated = @intCast(wasm.epoch() / 1000),
            },
        };
    }

    pub fn initFromTask(parent: *Self, task: *const types.Task) TaskItem {
        return TaskItem{ .parent = parent, .task = task.* };
    }

    pub fn initUI(self: *TaskItem) void {
        self.root = dom.createElement(&.{
            .tag = "div",
            .class = "task pa2",
            .parent = dom.getElementByID("tasks"),
            .children = dom.children(&.{
                .{
                    .tag = "input",
                    .class = "db h2",
                    .attribs = dom.attribs(&.{
                        dom.types.Attrib.string("type", "checkbox"),
                        dom.types.Attrib.event("change", onTaskComplete, self),
                    }),
                },
                .{
                    .tag = "span",
                    .class = "ml3",
                    .text = self.task.body,
                },
            }),
        });

        var buf: [32]u8 = undefined;
        self.date = dom.createElement(&.{
            .tag = "span",
            .class = "ml3 tr",
            .text = api.formatDateTime(self.task.dateCreated, &buf),
            .parent = self.root,
        });
    }

    fn onTaskComplete(_: *const dom.types.Event, raw: ?*anyopaque) callconv(.c) void {
        if (wasm.ptrCast(*TaskItem, raw)) |self| {
            self.markDone();
            self.parent.storeTasks();
            _ = schedule(.once, 1000, onExpire, self) catch @panic("can't create timeout");
        }
    }

    fn onExpire(raw: ?*anyopaque) void {
        if (wasm.ptrCast(*TaskItem, raw)) |self| {
            self.deinit();
        }
    }

    pub fn markDone(self: *TaskItem) void {
        var buf: [32]u8 = undefined;
        self.task.state = .done;
        self.task.dateDone = @intCast(wasm.epoch() / 1000);
        dom.setInnerText(self.date, api.formatDateTime(self.task.dateDone, &buf));
        dom.addClass(self.root, "task-done");
        dom.addClass(self.root, "fadeout");
    }

    pub fn deinit(self: *TaskItem) void {
        for (self.parent.tasks.items, 0..) |item, i| {
            if (item == self) {
                _ = self.parent.tasks.orderedRemove(i);
                break;
            }
        }
        _ = dom.removeElement(self.root);
        self.parent.allocator.free(std.mem.span(self.task.body));
        self.parent.allocator.destroy(self);
    }
};

const Self = @This();

pub fn init(allocator: std.mem.Allocator) Self {
    return Self{
        .allocator = allocator,
        .tasks = std.ArrayList(*TaskItem).empty,
    };
}

pub fn addTask(self: *Self, body: []const u8) !*TaskItem {
    return self.addExisting(
        TaskItem.init(self, try self.allocator.dupeZ(u8, body)),
    );
}

pub fn addExisting(self: *Self, item: TaskItem) !*TaskItem {
    var itemAlloc = try self.allocator.create(TaskItem);
    try self.tasks.append(self.allocator, itemAlloc);
    itemAlloc.* = item;
    itemAlloc.initUI();
    return itemAlloc;
}

pub fn storeTasks(self: *const Self) void {
    var tasks = std.ArrayList(types.Task).empty;
    defer tasks.deinit(self.allocator);
    for (self.tasks.items) |item| {
        if (item.task.state == .open) {
            tasks.append(self.allocator, item.task) catch |e| @panic(@errorName(e));
        }
    }
    api.persistTasks(tasks.items.ptr, tasks.items.len);
}
