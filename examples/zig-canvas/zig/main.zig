const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");

const Point = @Vector(2, u16);
const Stroke = std.ArrayList(Point);

// JS externals

pub extern "app" fn clearCanvas(canvas: i32) void;
pub extern "app" fn drawStroke(canvas: i32, points: [*]Point, len: u32) void;

// allocator, also exposed & used by JS-side WasmBridge
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

// pre-create container for storing drawn gestures
var strokes = std.ArrayList(*Stroke).init(WASM_ALLOCATOR);
var currStroke: ?*Stroke = null;

var window: dom.WindowInfo = undefined;
var canvasID: i32 = -1;

// event handlers

fn onMouseDown(event: *const dom.Event) void {
    var stroke: *Stroke = WASM_ALLOCATOR.create(Stroke) catch return;
    var strokeInst = std.ArrayList(Point).init(WASM_ALLOCATOR);
    strokeInst.append([2]u16{
        event.clientX * window.dpr,
        event.clientY * window.dpr,
    }) catch return;
    stroke.* = strokeInst;
    strokes.append(stroke) catch return;
    currStroke = stroke;
}

fn onMouseDrag(event: *const dom.Event) void {
    if (currStroke) |curr| {
        curr.append([2]u16{
            event.clientX * window.dpr,
            event.clientY * window.dpr,
        }) catch return;
        redraw();
    }
}

fn onMouseUp(event: *const dom.Event) void {
    _ = event;
    currStroke = null;
}

fn onKeyDown(event: *const dom.Event) void {
    if (event.modifiers & @enumToInt(dom.KeyModifier.CTRL) == 0) return;
    if (std.mem.indexOfScalar(u8, event.key[0..], 0)) |idx| {
        const key = event.key[0..idx];
        if (std.mem.eql(u8, key, "z")) {
            undoStroke();
        }
    }
}

fn onResize(event: *const dom.Event) void {
    _ = event;
    dom.getWindowInfo(&window);
    dom.setCanvasSize(
        canvasID,
        window.innerWidth,
        window.innerHeight,
        window.dpr,
    );
    redraw();
}

fn undoStroke() void {
    if (strokes.items.len > 0) {
        strokes.pop().clearAndFree();
        currStroke = null;
        redraw();
    }
}

fn redraw() void {
    clearCanvas(canvasID);
    for (strokes.items) |stroke| {
        drawStroke(canvasID, stroke.items.ptr, stroke.items.len);
    }
}

// main function (called from JS)
// initialize & create DOM & setup all event listeners

export fn start() void {
    dom.init(WASM_ALLOCATOR) catch return;
    dom.getWindowInfo(&window);

    const container = dom.createElement(&.{
        .tag = "main",
        .parent = 0,
        .index = 0,
    });

    const toolbar = dom.createElement(&.{
        .tag = "div",
        .parent = container,
    });

    const btUndo = dom.createElement(&.{
        .tag = "button",
        .parent = toolbar,
    });
    dom.setInnerText(btUndo, "undo");
    const listener = struct {
        fn onclick(event: *const dom.Event) void {
            _ = event;
            undoStroke();
        }
    };
    _ = dom.addListener(btUndo, "click", listener.onclick);

    // main editor canvas
    canvasID = dom.createCanvas(&.{
        .width = window.innerWidth,
        .height = window.innerHeight - 50,
        .dpr = window.dpr,
        .parent = container,
    });
    _ = dom.addListener(canvasID, "mousedown", onMouseDown);
    _ = dom.addListener(canvasID, "mousemove", onMouseDrag);
    _ = dom.addListener(canvasID, "mouseup", onMouseUp);

    _ = dom.addListener(-1, "keydown", onKeyDown);
    _ = dom.addListener(-1, "resize", onResize);

    wasm.printStr("started");
}
