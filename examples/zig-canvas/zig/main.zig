//! Main Zig application (aka root package)

const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");
const State = @import("state.zig");
const api = @import("api.zig");

const Attrib = dom.Attrib;

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/events.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Pre-declare state, will be fully initialized via the initDOM()
var STATE: State = undefined;

// event handlers

/// mousedown/touchstart handler
/// the optional opaque pointer argument must be first cast & checked for non-null values
/// in this example we're using this arg to pass the global STATE var as user context
/// (this is purely for demonstration purposes and quite obviously we could just work
/// with that global var directly here...)
fn startStroke(event: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        state.startStroke(event.body.mouse.clientX, event.body.mouse.clientY);
    }
}

/// mousemove/touchmove handler (only if active stroke)
/// the optional opaque pointer argument must be first cast & checked for non-null values
fn updateStroke(event: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        state.updateStroke(event.body.mouse.clientX, event.body.mouse.clientY);
        dom.preventDefault();
    }
}

/// mouseup/touchend handler
/// the optional opaque pointer argument must be first cast & checked for non-null values
fn endStroke(_: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| state.endStroke();
}

fn onKeyDown(event: *const dom.Event, raw: ?*anyopaque) void {
    // bail if Control key isn't pressed...
    if (!event.body.key.hasModifier(.ctrl)) return;
    const key = event.body.key.getKey();
    if (std.mem.eql(u8, key, "z")) {
        if (wasm.ptrCast(*State, raw)) |state| {
            state.undoStroke();
            dom.preventDefault();
        }
    }
}

fn onResize(_: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        resizeCanvas();
        state.requestRedraw();
    }
}

fn onBtUndo(_: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| state.undoStroke();
}

fn onBtDownload(_: *const dom.Event, _: ?*anyopaque) void {
    api.downloadCanvas(STATE.canvasID);
}

fn onToggleFullscreen(_: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        if (!state.window.isFullscreen()) {
            dom.requestFullscreen(dom.window, null);
        } else {
            dom.exitFullscreen(null);
        }
    }
}

fn resizeCanvas() void {
    const window = &STATE.window;
    dom.getWindowInfo(window);
    dom.setCanvasSize(
        STATE.canvasID,
        // need to subtract margins defined via CSS (assuming 1rem = 16px)
        window.innerWidth - 4 * 8,
        window.innerHeight - 5 * 8 - 24,
        window.dpr,
    );
}

/// Creates & initializes DOM, app state, event listeners etc.
fn initApp() !void {
    // the WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);

    // now we can initialize our app state
    STATE = State.init(WASM_ALLOCATOR);

    const container = dom.createElement(&.{
        .tag = "main",
        .id = "app",
        .parent = dom.body,
        .index = 0,
        .children = &.{
            .{
                .tag = "div",
                .children = &.{
                    .{
                        .tag = "div",
                        .class = "dib mr3",
                        .children = &.{
                            .{ .tag = "strong", .text = "thi.ng/wasm-api-dom canvas" },
                        },
                    },
                    .{
                        .tag = "button",
                        .text = "undo",
                        .class = "mr1",
                        .attribs = &.{
                            Attrib.event("click", .{ .callback = onBtUndo, .ctx = &STATE }),
                        },
                    },
                    .{
                        .tag = "button",
                        .text = "download",
                        .class = "mr1",
                        .attribs = &.{
                            Attrib.event("click", .{ .callback = onBtDownload }),
                        },
                    },
                    .{
                        .tag = "button",
                        .text = "fullscreen",
                        .attribs = &.{
                            Attrib.flag("disabled", !STATE.window.hasFullscreen()),
                            Attrib.event("click", .{ .callback = onToggleFullscreen, .ctx = &STATE }),
                        },
                    },
                },
            },
        },
    });

    // main editor canvas
    STATE.canvasID = dom.createCanvas(&.{
        .id = "editor",
        // dummy size, will update via resizeCanvas() later
        .width = 100,
        .height = 100,
        .dpr = STATE.window.dpr,
        .parent = container,
        .attribs = &.{
            Attrib.event("mousedown", .{ .callback = startStroke, .ctx = &STATE }),
            Attrib.event("mousemove", .{ .callback = updateStroke, .ctx = &STATE }),
            Attrib.event("mouseup", .{ .callback = endStroke, .ctx = &STATE }),
            Attrib.event("touchstart", .{ .callback = startStroke, .ctx = &STATE }),
            Attrib.event("touchmove", .{ .callback = updateStroke, .ctx = &STATE }),
            Attrib.event("touchend", .{ .callback = endStroke, .ctx = &STATE }),
        },
    });
    resizeCanvas();

    _ = try dom.addListener(dom.window, "keydown", &.{ .callback = onKeyDown, .ctx = &STATE });
    _ = try dom.addListener(dom.window, "resize", &.{ .callback = onResize, .ctx = &STATE });
}

/// Main entry point (called from JS)
export fn start() void {
    initApp() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}
