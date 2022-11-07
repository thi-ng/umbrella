const std = @import("std");
const wasm = @import("wasmapi");
const dom = @import("dom");
const schedule = @import("schedule").schedule;

// expose thi.ng/wasm-api core API (incl. panic handler & allocation fns)
pub usingnamespace wasm;

// allocator, also exposed & used by JS-side WasmBridge & DOM module
// see further comments in:
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-dom/zig/events.zig
// https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api-schedule/zig/lib.zig
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
pub const WASM_ALLOCATOR = gpa.allocator();

/// Simple click counter component
const Counter = struct {
    elementID: i32,
    clicks: usize,
    step: usize,

    const Self = @This();

    /// Data structure used for capturing current counter state for delayed
    /// update via schedule.schedule() (see onClick handler below)
    const Snapshot = struct {
        /// Back reference to counter
        self: *const Self,
        /// Click count before update
        prev: usize,
        /// Current click count
        curr: usize,
    };

    /// Initialize instance & DOM element w/ listener
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
            .attribs = &.{
                // define & add click event listener w/ user context arg
                dom.Attrib.event("click", .{ .callback = onClick, .ctx = self }),
            },
        });
    }

    fn update(self: *const Self) void {
        // temp buffer for formatting new button label
        var buf: [32]u8 = undefined;
        // Zig string literals can be auto-coerced to `[*:0]const u8`
        // however, here we're creating a string dynamically and so must ensure
        // the formatted string has explicit zero termination
        // (aka using bufPrintZ() vs. bufPrint())
        var label = std.fmt.bufPrintZ(&buf, "clicks: {d:0>4}", .{self.clicks}) catch return;
        // update DOM element
        dom.setInnerText(self.elementID, label);
    }

    /// Allocate & prepare snapshot of current state
    /// Caller owns memory
    fn snapshot(self: *const Self) *Snapshot {
        var snap = WASM_ALLOCATOR.create(Snapshot) catch @panic("couldn't create snapshot");
        snap.* = .{
            .self = self,
            .curr = self.clicks,
            .prev = self.clicks - self.step,
        };
        return snap;
    }

    /// event listener & state update
    fn onClick(_: *const dom.Event, raw: ?*anyopaque) void {
        // safely cast raw pointer
        if (wasm.ptrCast(*Self, raw)) |self| {
            self.clicks += self.step;
            self.update();
            // Trigger delayed update of button background color
            // Supply a snapshot of current state as user context for the update
            // Since this is a one-off callback, we don't have to hold on
            // to the returned listener ID (auto-cleanup)
            _ = schedule(.once, &.{ .callback = onTimeout, .ctx = self.snapshot() }, 500) catch return;
        }
    }

    /// scheduled callback
    fn onTimeout(raw: ?*anyopaque) void {
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
const colors = [_][:0]const u8{
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
    // the WASM API modules auto-initialize themselves if the root source
    // file exposes a `WASM_ALLOCATOR`, otherwise you'll have to initialize manually:
    // try dom.init(customAllocator);
    // try schedule.init(customAllocator);

    // then instantiate all counter components
    for (counters) |*counter, i| try counter.init(dom.body, i + 1);
}

/// Main entry point
export fn start() void {
    init() catch |e| @panic(@errorName(e));
}
