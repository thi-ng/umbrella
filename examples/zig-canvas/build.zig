const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    const lib = b.addSharedLibrary("main", "zig/main.zig", .unversioned);
    lib.setTarget(.{ .cpu_arch = .wasm32, .os_tag = .freestanding });
    lib.setBuildMode(.ReleaseSmall);
    lib.strip = true;
    lib.addPackagePath("wasmapi", "../../node_modules/@thi.ng/wasm-api/include/wasmapi.zig");
    lib.addPackagePath("dom", "../../node_modules/@thi.ng/wasm-api-dom/include/dom.zig");
    lib.setOutputDir("src");
    lib.install();
}
