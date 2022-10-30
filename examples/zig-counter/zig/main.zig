const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/wasmapi.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/events.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Simple click counter component
const Counter = struct {
    listener: dom.EventListener,
    elementID: i32,
    listenerID: u16,
    clicks: usize,
    step: usize,

    const Self = @This();

    /// Initialize internal state & DOM element w/ listener
    pub fn init(self: *Self, parent: i32, step: usize) !void {
        self.clicks = 0;
        self.step = step;
        // create DOM button element
        self.elementID = dom.createElement(&.{
            .tag = "button",
            .class = "db w5 ma2 tc",
            .text = "click me!",
            .parent = parent,
        });
        // define & add click event listener w/ user context arg
        self.listener = .{ .callback = onClick, .ctx = self };
        self.listenerID = try dom.addListener(self.elementID, "click", &self.listener);
    }

    fn update(self: *const Self) void {
        // format new button label
        var buf: [32]u8 = undefined;
        var label = std.fmt.bufPrint(&buf, "clicks: {d:0>4}", .{self.clicks}) catch return;
        // update DOM element
        dom.setInnerText(self.elementID, label);
    }

    /// event listener & state update
    fn onClick(_: *const dom.Event, raw: ?*anyopaque) void {
        // safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += self.step;
            self.update();
        }
    }
};

var counters: [3]Counter = undefined;

/// Since various initialization functions can return errors
/// we're bundling them all in a single fn, which is then called by start()
/// and so only needs one code site for error handling
fn init() !void {
    // the DOM API module must always be intialized first!
    try dom.init(WASM_ALLOCATOR);
    // then instantiate all counter components
    for (counters) |*counter, i| try counter.init(dom.body, i + 1);
}

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
}
