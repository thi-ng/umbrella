# zig-todo-list

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-todo-list.png)

[Live demo](http://demo.thi.ng/umbrella/zig-todo-list/)

Please refer to the [example build instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions) on the wiki.

Additionally, this example requires Zig & Binaryen installed (and on the
`$PATH`) for building the WebAssembly binary.

You can download the latest version from the Zig website or (my own preferred
method) using [asdf](https://asdf-vm.com/) to install it (even just locally for
this project):

```bash
# if needed, first install zig plugin for asdf
asdf plugin-add zig https://github.com/cheetah/asdf-zig.git

# asdf supports multiple versions of a tool, here to install latest dev version
asdf install zig 0.14.1

# global use of that version
asdf global zig 0.14.1

# or only use that version in this project (already pre-configured)
asdf local zig 0.14.1
```

-   [Zig](https://ziglang.org) v0.14.0 or newer versions (see
    [comments](https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/README.md#using-the-zig-build-system))
-   [Binaryen](https://github.com/WebAssembly/binaryen)

Please see the comments in
[build.zig](https://github.com/thi-ng/tpl-umbrella-zig/blob/main/build.zig) for
more details...

## Authors

- Karsten Schmidt

## License

&copy; 2022 - 2025 Karsten Schmidt // Apache Software License 2.0
