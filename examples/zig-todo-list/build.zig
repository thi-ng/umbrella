const std = @import("std");

pub fn build(b: *std.Build) void {
    // IMPORTANT: This build file is more complicated than needed due to being part of this monorepo
    // Please consult the thi.ng/wasm-api README for details!
    // Outside the umbrella monorepo, the import path for that file will be (usually):
    // node_modules/@thi.ng/wasm-api/zig/build.zig
    b.installArtifact(@import("wasm-api-build.zig").wasmLib(b, .{
        // Only needed for this monorepo!!
        .base = "../../node_modules",
        // Declare extra WASM API packages to use
        .modules = &.{
            .{ .name = "wasm-api-dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
            .{ .name = "wasm-api-schedule", .path = "@thi.ng/wasm-api-schedule/zig/lib.zig" },
        },
        // build mode override
        .optimize = .ReleaseSmall,
    }));
}
