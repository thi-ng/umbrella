const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");

const Point = @Vector(2, i16);
const Stroke = std.ArrayList(Point);

// use JS panic handler
pub const panic = wasm.panic;

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
        redraw();
        dom.preventDefault();
    }
}

/// mouseup/touchend handler
fn endStroke(event: *const dom.Event) void {
    _ = event;
    currStroke = null;
}

/// computes point scaled to current DPR
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

fn onResize(event: *const dom.Event) void {
    _ = event;
    resizeCanvas();
    redraw();
}

fn onBtUndo(event: *const dom.Event) void {
    _ = event;
    undoStroke();
}

fn onBtDownload(event: *const dom.Event) void {
    _ = event;
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

fn redraw() void {
    clearCanvas(canvasID);
    for (strokes.items) |stroke| {
        drawStroke(canvasID, stroke.items.ptr, stroke.items.len);
    }
}

fn undoStroke() void {
    if (strokes.items.len > 0) {
        strokes.pop().clearAndFree();
        currStroke = null;
        redraw();
    }
}

/// main entry point (called from JS)
/// initialize & create DOM, setup event listeners
export fn start() void {
    dom.init(WASM_ALLOCATOR) catch return;
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
    _ = dom.addListener(btUndo, "click", onBtUndo);

    const btDownload = dom.createElement(&.{
        .tag = "button",
        .text = "download",
        .parent = toolbar,
    });
    _ = dom.addListener(btDownload, "click", onBtDownload);

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

    _ = dom.addListener(canvasID, "mousedown", startStroke);
    _ = dom.addListener(canvasID, "mousemove", updateStroke);
    _ = dom.addListener(canvasID, "mouseup", endStroke);

    _ = dom.addListener(canvasID, "touchstart", startStroke);
    _ = dom.addListener(canvasID, "touchmove", updateStroke);
    _ = dom.addListener(canvasID, "touchend", endStroke);

    _ = dom.addListener(dom.WINDOW, "keydown", onKeyDown);
    _ = dom.addListener(dom.WINDOW, "resize", onResize);

    wasm.printStr("started");
}
