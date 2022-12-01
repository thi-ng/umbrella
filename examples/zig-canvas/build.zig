const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    // IMPORTANT: This build file is more complicated than needed due to being part of this monorepo
    // Please consult the thi.ng/wasm-api README for details!
    // Outside the umbrella monorepo, the import path for that file will be (usually):
    // node_modules/@thi.ng/wasm-api/zig/build.zig
    @import("wasm-api-build.zig").wasmLib(b, .{
        // Only needed for this monorepo!!
        .base = "../../node_modules",
        // Declare extra WASM API packages to use
        .packages = &.{
            .{ .id = "wasm-api-dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
        },
        // build mode override
        .mode = .ReleaseSmall,
    }).install();
}
