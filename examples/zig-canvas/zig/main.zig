const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");

const Point = @Vector(2, i16);
const Stroke = std.ArrayList(Point);

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// JS externals
pub extern "app" fn clearCanvas(canvas: i32) void;
pub extern "app" fn downloadCanvas(canvas: i32) void;
pub extern "app" fn drawStroke(canvas: i32, points: [*]Point, len: u32) void;

// allocator, also exposed & used by JS-side WasmBridge
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

// pre-create container for storing drawn gestures
var strokes = std.ArrayList(*Stroke).init(WASM_ALLOCATOR);
var currStroke: ?*Stroke = null;

// state
var window: dom.WindowInfo = undefined;
var canvasID: i32 = -1;

// event handlers

/// mousedown/touchstart handler
fn startStroke(event: *const dom.Event) void {
    var stroke: *Stroke = WASM_ALLOCATOR.create(Stroke) catch return;
    var strokeInst = std.ArrayList(Point).init(WASM_ALLOCATOR);
    strokeInst.append(scaledPoint(event.clientX, event.clientY)) catch return;
    stroke.* = strokeInst;
    strokes.append(stroke) catch return;
    currStroke = stroke;
}

/// mousemove/touchmove handler (only if active stroke)
fn updateStroke(event: *const dom.Event) void {
    if (currStroke) |curr| {
        curr.append(scaledPoint(event.clientX, event.clientY)) catch return;
        dom.preventDefault();
        requestRedraw();
    }
}

/// mouseup/touchend handler
fn endStroke(_: *const dom.Event) void {
    currStroke = null;
}

/// Computes point scaled to current DPR
fn scaledPoint(x: i16, y: i16) Point {
    return [2]i16{
        (x - 8) * window.dpr,
        (y - 8) * window.dpr,
    };
}

fn onKeyDown(event: *const dom.Event) void {
    if (event.modifiers & @enumToInt(dom.KeyModifier.CTRL) == 0) return;
    const key = event.getKey();
    if (std.mem.eql(u8, key, "z")) {
        undoStroke();
        dom.preventDefault();
    }
}

fn onResize(_: *const dom.Event) void {
    resizeCanvas();
    requestRedraw();
}

fn onBtUndo(_: *const dom.Event) void {
    undoStroke();
}

fn onBtDownload(_: *const dom.Event) void {
    downloadCanvas(canvasID);
}

fn resizeCanvas() void {
    dom.getWindowInfo(&window);
    dom.setCanvasSize(
        canvasID,
        // need to subtract margins defined via CSS (assuming 1rem = 16px)
        window.innerWidth - 4 * 8,
        window.innerHeight - 5 * 8 - 24,
        window.dpr,
    );
}

/// Triggers redraw during next RAF cycle. This app redraws on demand,
/// but we NEVER want to do so from the event loop!
fn requestRedraw() void {
    _ = dom.requestAnimationFrame(redraw) catch return;
}

/// Redraw handler, calls into JS API to draw to canvas
fn redraw(_: f64) void {
    clearCanvas(canvasID);
    for (strokes.items) |stroke| {
        drawStroke(canvasID, stroke.items.ptr, stroke.items.len);
    }
}

/// Attempts to discard most recent stroke and if successful
/// also triggers redraw
fn undoStroke() void {
    if (strokes.popOrNull()) |stroke| {
        stroke.clearAndFree();
        currStroke = null;
        requestRedraw();
    }
}

/// Creates & initializes DOM, event listeners
fn initDOM() anyerror!void {
    try dom.init(WASM_ALLOCATOR);
    dom.getWindowInfo(&window);

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
    _ = try dom.addListener(btUndo, "click", onBtUndo);

    const btDownload = dom.createElement(&.{
        .tag = "button",
        .text = "download",
        .parent = toolbar,
    });
    _ = try dom.addListener(btDownload, "click", onBtDownload);

    // main editor canvas
    canvasID = dom.createCanvas(&.{
        .id = "editor",
        // dummy size, will update via resizeCanvas() later
        .width = 100,
        .height = 100,
        .dpr = window.dpr,
        .parent = container,
    });
    resizeCanvas();

    _ = try dom.addListener(canvasID, "mousedown", startStroke);
    _ = try dom.addListener(canvasID, "mousemove", updateStroke);
    _ = try dom.addListener(canvasID, "mouseup", endStroke);

    _ = try dom.addListener(canvasID, "touchstart", startStroke);
    _ = try dom.addListener(canvasID, "touchmove", updateStroke);
    _ = try dom.addListener(canvasID, "touchend", endStroke);

    _ = try dom.addListener(dom.WINDOW, "keydown", onKeyDown);
    _ = try dom.addListener(dom.WINDOW, "resize", onResize);
}

/// Main entry point (called from JS)
export fn start() void {
    initDOM() catch |e| @panic(@errorName(e));
    wasm.printStr("started");
}
