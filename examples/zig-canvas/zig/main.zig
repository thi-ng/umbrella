//! Main Zig application (aka root package)

const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");
const State = @import("state.zig");
const api = @import("api.zig");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/include/wasmapi.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Pre-declare state, will be fully initialized via the initDOM()
var STATE: State = undefined;

// event handlers

/// mousedown/touchstart handler
/// the optional opaque pointer argument must be first cast & checked for non-null values
fn startStroke(event: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        state.startStroke(event.clientX, event.clientY);
    }
}

/// mousemove/touchmove handler (only if active stroke)
/// the optional opaque pointer argument must be first cast & checked for non-null values
fn updateStroke(event: *const dom.Event, raw: ?*anyopaque) void {
    if (wasm.ptrCast(*State, raw)) |state| {
        state.updateStroke(event.clientX, event.clientY);
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
    if (event.modifiers & @enumToInt(dom.KeyModifier.CTRL) == 0) return;
    const key = event.getKey();
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

/// Creates & initializes DOM, event listeners
fn initDOM() !void {
    STATE = try State.init(WASM_ALLOCATOR);

    const container = dom.createElement(&.{
        .tag = "main",
        .id = "app",
        .parent = dom.DOC_BODY,
        .index = 0,
    });

    const toolbar = dom.createElement(&.{
        .tag = "div",
        .parent = container,
    });

    _ = dom.createElement(&.{
        .tag = "span",
        .html = "<strong>thi.ng/wasm-api-dom canvas</strong>",
        .class = "mr3",
        .parent = toolbar,
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
        .parent = toolbar,
    });
    _ = try dom.addListener(btDownload, "click", &.{ .callback = onBtDownload });

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

    _ = try dom.addListener(dom.WINDOW, "keydown", &.{ .callback = onKeyDown, .ctx = &STATE });
    _ = try dom.addListener(dom.WINDOW, "resize", &.{ .callback = onResize, .ctx = &STATE });
}

/// Main entry point (called from JS)
export fn start() void {
    initDOM() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}
