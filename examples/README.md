# @thi.ng/umbrella examples

This directory contains a growing number of standalone example projects,
including live online versions, build instructions and commented source
code.

If you want to [contribute](../CONTRIBUTING.md) an example, please get
in touch via PR, issue tracker, email or twitter!

| #  | Name                                         | Description                                              | Packages of interest                                              | Difficulty   |
|----|----------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------------|--------------|
| 1  | [async-effect](./async-effect)               | Async side effect handling (JSON I/O)                    | atom, hdom, interceptors                                          | intermediate |
| 2  | [bitmap-font](./bitmap-font)                 | Figlet style ASCII -> bitmap font transformation         | transducers, transducers-binary, rstream                          | intermediate |
| 3  | [canvas-dial](./canvas-dial)                 | Canvas dial component w/ mouse & touch events            | hdom, rstream, rstream-gestures, transducers, transducers-hdom    | intermediate |
| 4  | [cellular-automata](./cellular-automata)     | Transducer based, customizable 2D cellular automata      | hdom, hdom-components, transducers                                | basic        |
| 5  | [commit-table-ssr](./commit-table-ssr)       | Server-side & static file rendering of hiccup components | hiccup, transducers                                               | intermediate |
| 6  | [crypto-chart](./crypto-chart)               | Interactive rstream & transducer based SVG chart         | hdom, hiccup-svg, rstream, transducers                            | advanced     |
| 7  | [dashboard](./dashboard)                     | Barebones components w/ local state                      | hdom, transducers                                                 | basic        |
| 8  | [devcards](./devcards)                       | Multiple app instances with/without shared state         | atom, hdom                                                        | intermediate |
| 9  | [geom-convex-hull](./geom-convex-hull)       | 2D convex hull and shape clipping visualization          | geom, hdom, hdom-canvas                                           | basic        |
| 10 | [geom-knn](./geom-knn)                       | @thi.ng/geom-accel k-D tree                              | geom, geom-accel, hdom-canvas, vectors                            | intermediate |
| 11 | [geom-tessel](./geom-tessel)                 | @thi.ng/geom shape tesselations & hdom-canvas drawing    | geom, hdom-canvas, vectors                                        | intermediate |
| 12 | [gesture-analysis](./gesture-analysis)       | Mouse/touch gesture processing, analysis & visualization | rstream, rstream-gestures, transducers, hiccup-svg                | intermediate |
| 13 | [hdom-basics](./hdom-basics)                 | Hello world                                              | hdom, hiccup                                                      | basic        |
| 14 | [hdom-benchmark](./hdom-benchmark)           | hdom rendering perf / stress test, FPS counter           | hdom, rstream, transducers                                        | intermediate |
| 15 | [hdom-benchmark2](./hdom-benchmark2)         | hdom rendering perf / stress test, FPS counter           | hdom, hdom-components, hiccup-css, transducers, stats             | intermediate |
| 16 | [hdom-canvas-clock](./hdom-canvas-clock)     | hdom-canvas rendered clock                               | hdom, hdom-canvas, transducers                                    | basic        |
| 17 | [hdom-canvas-draw](./hdom-canvas-draw)       | hdom-canvas mouse / touch gesture drawing                | hdom, hdom-canvas, transducers                                    | intermediate |
| 18 | [hdom-canvas-shapes](./hdom-canvas-shapes)   | various hdom-canvas shape tests                          | hdom, hdom-canvas, rstream, transducers                           | basic        |
| 19 | [hdom-dropdown](./hdom-dropdown)             | custom dropdown menu                                     | hdom, hdom-components                                             | intermediate |
| 20 | [hdom-dropdown-fuzzy](./hdom-dropdown-fuzzy) | custom dropdown menu w/ fuzzy autocomplete               | hdom, hdom-components                                             | advanced     |
| 21 | [hdom-dyn-context](./hdom-dyn-context)       | dynamic hdom user context / theming                      | atom, hdom                                                        | basic        |
| 22 | [hdom-inner-html](./hdom-inner-html)         | using `.innerHTML` w/ hdom                               | hdom                                                              | intermediate |
| 23 | [hdom-localstate](./hdom-localstate)         | hdom component with local state                          | hdom                                                              | intermediate |
| 24 | [hdom-skip](./hdom-skip)                     | selective component updates                              | hdom                                                              | basic        |
| 25 | [hdom-theme-adr-0003](./hdom-theme-adr-0003) | hdom themed components proposal                          | hdom                                                              | intermediate |
| 26 | [hdom-vscroller](./hdom-vscroller)           | virtual scroller component for large tables / lists      | hdom                                                              | advanced     |
| 27 | [hmr-basics](./hmr-basics)                   | hdom & hot module replacement                            | hdom, memoize                                                     | basic        |
| 28 | [hydrate-basics](./hydrate-basics)           | hiccup / hdom DOM hydration                              | hiccup, hdom                                                      | intermediate |
| 30 | [imgui](./imgui)                             | Canvas based immediate mode GUI                          | atom, hdom-canvas, imgui                                          | advanced     |
| 31 | [interceptor-basics](./interceptor-basics)   | Event handling w/ interceptors and side effects          | atom, hdom, interceptors                                          | basic        |
| 32 | [interceptor-basics2](./interceptor-basics2) | Event handling w/ interceptors and side effects          | atom, hdom, interceptors                                          | intermediate |
| 33 | [iso-plasma](./iso-plasma)                   | 2D contour line extraction & animation                   | geom, geom-isoline                                                | intermediate |
| 34 | [json-components](./json-components)         | JSON->component transformation, live editor              | hdom, transducers                                                 | intermediate |
| 35 | [local-state](./local-state)                 | Local component state w/o HOF                            | hdom, paths                                                       | basic        |
| 36 | [login-form](./login-form)                   | Basic SPA without router                                 | atom, hdom                                                        | intermediate |
| 37 | [mandelbrot](./mandelbrot)                   | Worker-based mandelbrot fractal renderer                 | rstream, rstream-gestures, transducers-hdom                       | advanced     |
| 38 | [markdown](./markdown)                       | Markdown parser & editor w/ live preview                 | fsm, rstream, transducers-hdom                                    | advanced     |
| 39 | [package-stats](./package-stats)             | CLI util to visualize umbrella pkg stats                 | hiccup-svg, transducers                                           | intermediate |
| 40 | [pixel-basics](./pixel-basics)               | Pixel buffer manipulations                               | pixel                                                             | basic        |
| 41 | [pointfree-svg](./pointfree-svg)             | Generate SVG using pointfree DSL                         | hiccup, hiccup-svg, pointfree-lang                                | intermediate |
| 42 | [poly-spline](./poly-spline)                 | Polygon to cubic curve conversion & visualization        | geom, hiccup-svg, hdom, rstream                                   | intermediate |
| 43 | [porter-duff](./porter-duff)                 | Port-Duff image compositing / alpha blending             | porter-duff, pixel                                                | basic        |
| 44 | [rotating-voronoi](./rotating-voronoi)       | Animated Voronoi diagram, cubic splines & SVG download   | geom, hdom, hdom-canvas, rstream, transducers                     | intermediate |
| 45 | [router-basics](./router-basics)             | Complete mini SPA                                        | atom, hdom, interceptors, router                                  | advanced     |
| 46 | [rstream-dataflow](./rstream-dataflow)       | Dataflow graph                                           | atom, hdom, rstream, rstream-gestures, rstream-graph, transducers | intermediate |
| 47 | [rstream-grid](./rstream-grid)               | Dataflow graph SVG grid                                  | atom, hdom, hiccup-svg, interceptors, rstream-graph, transducers  | advanced     |
| 48 | [rstream-hdom](./rstream-hdom)               | rstream based UI updates & state handling                | hdom, rstream, transducers                                        | intermediate |
| 49 | [scenegraph](./scenegraph)                   | 2D scenegraph & shape picking                            | geom, hdom, hdom-canvas                                           | intermediate |
| 50 | [scenegraph-image](./scenegraph-image)       | 2D scenegraph & image map based geometry manipulation    | geom, hdom, hdom-canvas, pixel                                    | intermediate |
| 51 | [shader-ast-canvas2d](shader-ast-canvas2d)   | 2D canvas shader emulation                               | shader-ast                                                        | basic        |
| 52 | [shader-ast-noise](shader-ast-noise)         | HOF shader function composition                          | shader-ast, webgl                                                 | basic        |
| 53 | [shader-ast-raymarch](shader-ast-raymarch)   | WebGL & Canvas2D raymarch shader                         | shader-ast, webgl                                                 | intermediate |
| 54 | [shader-ast-sdf2d](shader-ast-sdf2d)         | WebGL & Canvas2D SDF                                     | shader-ast, webgl                                                 | basic        |
| 55 | [shader-ast-tunnel](shader-ast-tunnel)       | WebGL & Canvas2D textured tunnel shader                  | shader-ast, webgl                                                 | basic        |
| 56 | [svg-barchart](./svg-barchart)               | hdom SVG barchart component                              | hdom, transducers                                                 | basic        |
| 57 | [svg-particles](./svg-particles)             | hdom SVG generation / animation                          | hdom, transducers                                                 | basic        |
| 58 | [svg-waveform](./svg-waveform)               | hdom SVG generation / undo history                       | atom, hdom, hiccup-svg, interceptors, iterators                   | intermediate |
| 59 | [talk-slides](./talk-slides)                 | Presentation slides from ClojureX 2018                   | hdom, rstream, transducers-hdom                                   | intermediate |
| 60 | [todo-list](./todo-list)                     | Canonical Todo list with undo/redo                       | atom, hdom, transducers                                           | intermediate |
| 61 | [transducers-hdom](./transducers-hdom)       | Transducer & rstream based hdom UI updates               | hdom, rstream, transducers-hdom                                   | basic        |
| 62 | [triple-query](./triple-query)               | Triple store query results & sortable table              | atom, hdom, hdom-components, rstream-query, transducers           | intermediate |
| 63 | [webgl-cubemap](./webgl-cubemap)             | WebGL cubemap, async texture loading                     | hdom, webgl, shader-ast                                           | intermediate |
| 64 | [webgl-gpgpu-basics](./webgl-gpgpu-basics)   | Minimal GPGPU example                                    | webgl, shader-ast                                                 | basic        |
| 65 | [webgl-grid](./webgl-grid)                   | WebGL instancing                                         | webgl, hdom                                                       | intermediate |
| 66 | [webgl-msdf](./webgl-msdf)                   | WebGL MSDF font rendering & particle system              | webgl, webgl-msdf, shader-ast, hdom                               | intermediate |
| 67 | [webgl-ssao](./webgl-ssao)                   | WebGL screenspace ambient occlusion                      | webgl, shader-ast, rstream, hdom                                  | advanced     |
| 68 | [xml-converter](./xml-converter)             | XML/HTML/SVG to hiccup conversion as you type            | rstream, sax, transducers, transducers-hdom                       | advanced     |
