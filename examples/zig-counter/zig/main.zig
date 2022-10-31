const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");
const timer = @import("timer");

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/events.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-timer/zig/lib.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Simple click counter component
const Counter = struct {
    listener: dom.EventListener,
    listenerID: u16,
    elementID: i32,
    clicks: usize,
    step: usize,

    const Self = @This();

    /// Data structure used for capturing current counter state for delayed
    /// update via timer.schedule() (see onClick handler below)
    const Snapshot = struct {
        callback: timer.TimerCallback,
        /// Back reference to counter
        self: *const Self,
        /// Click count before update
        prev: usize,
        /// Current click count
        curr: usize,
    };

    /// Create & initialize instance & DOM element w/ listener
    pub fn init(self: *Self, parent: i32, step: usize) !void {
        self.clicks = 0;
        self.step = step;
        // create DOM button element
        self.elementID = dom.createElement(&.{
            .tag = "button",
            // Tachyons CSS class names
            .class = "db w5 ma2 pa2 tc bn",
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

    /// Allocate & prepare snapshot of current state
    /// Caller owns memory
    fn snapshot(self: *const Self) *Snapshot {
        var snap = WASM_ALLOCATOR.create(Snapshot) catch @panic("couldn't create snapshot");
        snap.callback = .{ .callback = onTimer, .ctx = snap };
        snap.self = self;
        snap.curr = self.clicks;
        snap.prev = self.clicks - self.step;
        return snap;
    }

    /// event listener & state update
    fn onClick(_: *const dom.Event, raw: ?*anyopaque) void {
        // safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += self.step;
            self.update();
            // Trigger delayed update of button background color
            // Since this is a one-off callback, we don't have to hold on
            // to the returned listener ID (auto-cleanup)
            _ = timer.schedule(&self.snapshot().callback, 500, .once) catch return;
        }
    }

    /// timer callback
    fn onTimer(raw: ?*anyopaque) void {
        if (wasm.ptrCast(*Snapshot, raw)) |snap| {
            // update CSS classes based on given click counts
            dom.removeClass(snap.self.elementID, colors[@mod(snap.prev, colors.len)]);
            dom.addClass(snap.self.elementID, colors[@mod(snap.curr, colors.len)]);
            // free snapshot
            WASM_ALLOCATOR.destroy(snap);
        }
    }
};

var counters: [3]Counter = undefined;

/// Button background colors (Tachyons CSS class names)
const colors = [_][]const u8{
    "bg-red",
    "bg-hot-pink",
    "bg-yellow",
    "bg-blue",
    "bg-green",
    "bg-light-yellow",
    "bg-light-purple",
};

/// Since various initialization functions can return errors
/// we're bundling them all in a single fn, which is then called by start()
/// and so only needs one code site for error handling
fn init() !void {
    // the WASM API modules must always be intialized first!
    try dom.init(WASM_ALLOCATOR);
    try timer.init(WASM_ALLOCATOR);

    // then instantiate all counter components
    for (counters) |*counter, i| try counter.init(dom.body, i + 1);
}

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
}
