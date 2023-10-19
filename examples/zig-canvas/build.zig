const std = @import("std");

pub fn build(b: *std.Build) void {
    // IMPORTANT: Due to being part of this monorepo, this version of the build file is
    // slighty more complicated than needed...
    //
    // Please consult the thi.ng/wasm-api README for details!
    // Outside the umbrella monorepo, the import path for that file will be (usually):
    // node_modules/@thi.ng/wasm-api/zig/build.zig
    const lib = @import("wasm-api-build.zig").wasmLib(b, .{
        // Only needed for this monorepo!!
        .base = "../../node_modules",
        // Declare extra WASM API module to use
        .modules = &.{
            .{ .name = "wasm-api-dom", .path = "@thi.ng/wasm-api-dom/zig/lib.zig" },
        },
        // build mode override
        .optimize = .ReleaseSmall,
    });

    b.installArtifact(lib);

    const installDocs = b.addInstallDirectory(.{
        .source_dir = lib.getEmittedDocs(),
        // .prefix here means the default build output dir (aka /zig-out)
        // can be overridden using -p CLI arg (see `docs` script alias in package.json)
        .install_dir = .prefix,
        .install_subdir = "docs",
    });

    const docsStep = b.step("docs", "Generate documentation");
    docsStep.dependOn(&installDocs.step);

    // Alternatively, instead of calling WASM post-processing steps separately,
    // invoke them here instead (the above line needs to be removed then)...

    // const install = b.addInstallArtifact(lib);
    // install.step.dependOn(&lib.step);

    // const optimize = b.addSystemCommand(&.{
    //     "wasm-opt",
    //     "-o",
    //     "foo/opt.wasm",
    //     "-O3",
    // });
    // optimize.addFileSourceArg(lib.getOutputSource());
    // optimize.step.dependOn(&install.step);

    // const disasm = b.addSystemCommand(&.{
    //     "wasm-dis",
    //     "-o",
    //     "foo/opt.wast",
    //     "foo/opt.wasm",
    // });
    // disasm.step.dependOn(&optimize.step);

    // b.getInstallStep().dependOn(&disasm.step);
}
