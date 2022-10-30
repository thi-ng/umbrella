//! Main Zig application (aka root package)

const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");
const State = @import("state.zig");
const api = @import("api.zig");

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
    // the WASM API modules must always be intialized first!
    try dom.init(WASM_ALLOCATOR);

    // now we can initialize our app state
    STATE = try State.init(WASM_ALLOCATOR);

    const container = dom.createElement(&.{
        .tag = "main",
        .id = "app",
        .parent = dom.body,
        .index = 0,
    });

    const toolbar = dom.createElement(&.{
        .tag = "div",
        .parent = container,
    });

    _ = dom.createElement(&.{
        .tag = "div",
        .class = "dib mr3",
        .parent = toolbar,
        .children = &.{
            .{ .tag = "strong", .text = "thi.ng/wasm-api-dom canvas" },
        },
    });

    const btUndo = dom.createElement(&.{
        .tag = "button",
        .text = "undo",
        .class = "mr1",
        .parent = toolbar,
    });
    _ = try dom.addListener(btUndo, "click", &.{ .callback = onBtUndo, .ctx = &STATE });

    const btDownload = dom.createElement(&.{
        .tag = "button",
        .text = "download",
        .class = "mr1",
        .parent = toolbar,
    });
    _ = try dom.addListener(btDownload, "click", &.{ .callback = onBtDownload });

    const btFullscreen = dom.createElement(&.{
        .tag = "button",
        .text = "fullscreen",
        .parent = toolbar,
    });
    dom.setBooleanAttrib(btFullscreen, "disabled", !STATE.window.hasFullscreen());
    _ = try dom.addListener(btFullscreen, "click", &.{ .callback = onToggleFullscreen, .ctx = &STATE });

    // main editor canvas
    STATE.canvasID = dom.createCanvas(&.{
        .id = "editor",
        // dummy size, will update via resizeCanvas() later
        .width = 100,
        .height = 100,
        .dpr = STATE.window.dpr,
        .parent = container,
    });
    resizeCanvas();

    _ = try dom.addListener(STATE.canvasID, "mousedown", &.{ .callback = startStroke, .ctx = &STATE });
    _ = try dom.addListener(STATE.canvasID, "mousemove", &.{ .callback = updateStroke, .ctx = &STATE });
    _ = try dom.addListener(STATE.canvasID, "mouseup", &.{ .callback = endStroke, .ctx = &STATE });

    _ = try dom.addListener(STATE.canvasID, "touchstart", &.{ .callback = startStroke, .ctx = &STATE });
    _ = try dom.addListener(STATE.canvasID, "touchmove", &.{ .callback = updateStroke, .ctx = &STATE });
    _ = try dom.addListener(STATE.canvasID, "touchend", &.{ .callback = endStroke, .ctx = &STATE });

    _ = try dom.addListener(dom.window, "keydown", &.{ .callback = onKeyDown, .ctx = &STATE });
    _ = try dom.addListener(dom.window, "resize", &.{ .callback = onResize, .ctx = &STATE });
}

/// Main entry point (called from JS)
export fn start() void {
    initApp() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}
