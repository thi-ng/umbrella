const std = @import("std");
const npm = @import("npm.zig");
const wasm = std.Target.wasm;

pub fn build(b: *std.build.Builder) void {
    const lib = b.addSharedLibrary("main", "zig/main.zig", .unversioned);
    lib.setTarget(.{
        .cpu_arch = .wasm32,
        .os_tag = .freestanding,
        // can't use SIMD if Safari support is required =:_(
        // .cpu_features_add = wasm.featureSet(&.{wasm.Feature.simd128}),
    });
    lib.setBuildMode(.ReleaseSmall);
    lib.strip = true;
    // helper lib to simplify using thi.ng/wasm-api API packages
    var pkgs = npm.init(.{
        // base path to common node_modules directory under which
        // all to be imported packages are located
        .base = "../../node_modules",
        // we don't need to specify core wasmapi, only custom/extra packages
        // wasmapi is also auto-added as dependency for each of these
        .packages = &[_]npm.Pkg{
            .{ .id = "dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
            .{ .id = "timer", .path = "@thi.ng/wasm-api-timer/zig/lib.zig" },
        },
    });
    defer pkgs.deinit();
    pkgs.addAllTo(lib);
    lib.setOutputDir("src");
    lib.install();
}
