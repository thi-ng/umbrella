// SPDX-License-Identifier: Apache-2.0
const std = @import("std");
const wasm = @import("wasm-api");
const dom = @import("wasm-api-dom");

const api = @import("api.zig");
const types = @import("types.zig");
const State = @import("state.zig");

// only needed for debug builds
pub fn log(
    comptime _: std.log.Level,
    comptime _: @Type(.EnumLiteral),
    comptime _: []const u8,
    _: anytype,
) void {}

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-schedule/zig/lib.zig
pub const WASM_ALLOCATOR = std.heap.wasm_allocator;

/// Central app state
var STATE: State = undefined;

/// Dummy handler to log input event value to console
fn onInput(e: *const dom.types.Event, _: ?*anyopaque) callconv(.c) void {
    wasm.printStr(e.body.input.getValue());
}

/// Key event handler to handle Enter & Esc keys
fn onKeydown(e: *const dom.types.Event, _: ?*anyopaque) callconv(.c) void {
    if (std.mem.eql(u8, e.body.key.getKey(), "Enter")) {
        onAddTask(e, null);
    } else if (std.mem.eql(u8, e.body.key.getKey(), "Escape")) {
        dom.setStringAttrib(dom.getElementByID("newtask"), "value", "");
    }
}

fn onAddTask(_: *const dom.types.Event, _: ?*anyopaque) callconv(.c) void {
    const input = dom.getElementByID("newtask");
    const body = dom.getStringAttribAlloc(input, "value");
    defer WASM_ALLOCATOR.free(body);
    wasm.printHexdump(body.ptr, body.len);

    // skip empty inputs (taking sentinel into account)
    if (body.len == 0) return;

    _ = STATE.addTask(body) catch |e| @panic(@errorName(e));
    dom.setStringAttrib(input, "value", "");
    STATE.storeTasks();
}

fn initApp() !void {
    // the WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);
    // try schedule.init(customAllocator);

    // Initialize app state
    STATE = State.init(WASM_ALLOCATOR);

    // Create DOM tree & setup event handlers
    _ = dom.createElement(&.{
        .tag = "div",
        .class = "w-100",
        .parent = dom.body,
        .index = 0,
        .children = dom.children(&.{
            .{ .tag = "h1", .class = "mt0", .text = "ToDo List" },
            .{
                .tag = "div",
                .id = "tasks",
            },
            .{
                .tag = "div",
                .class = "flex flex-column mb3",
                .children = dom.children(&.{
                    .{ .tag = "h3", .text = "Add new task" },
                    .{
                        .tag = "input",
                        .id = "newtask",
                        .class = "pa2",
                        .attribs = dom.attribs(&.{
                            dom.types.Attrib.string("placeholder", "What needs to be done?"),
                            dom.types.Attrib.flag("autofocus", true),
                            dom.types.Attrib.event("keydown", onKeydown, null),
                            dom.types.Attrib.event("input", onInput, null),
                        }),
                    },
                    .{
                        .tag = "button",
                        .class = "ma0 mt2 db w-100 pa2",
                        .text = "Add Task",
                        .attribs = dom.attribs(&.{
                            dom.types.Attrib.event("click", onAddTask, null),
                        }),
                    },
                }),
            },
        }),
    });

    var tasks: []types.Task = undefined;
    api.loadTasks(&tasks);
    defer WASM_ALLOCATOR.free(tasks);

    for (tasks) |*t| {
        _ = try STATE.addExisting(State.TaskItem.initFromTask(&STATE, t));
    }
}

export fn start() void {
    initApp() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}
