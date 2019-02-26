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
| 9  | [geom-knn](./geom-knn)                       | @thi.ng/geom-accel k-D tree                              | geom, geom-accel, hdom-canvas, vectors                            | intermediate |
| 10 | [geom-tessel](./geom-tessel)                 | @thi.ng/geom shape tesselations & hdom-canvas drawing    | geom, hdom-canvas, vectors                                        | intermediate |
| 11 | [gesture-analysis](./gesture-analysis)       | Mouse/touch gesture processing, analysis & visualization | rstream, rstream-gestures, transducers, hiccup-svg                | intermediate |
| 12 | [hdom-basics](./hdom-basics)                 | Hello world                                              | hdom, hiccup                                                      | basic        |
| 13 | [hdom-benchmark](./hdom-benchmark)           | hdom rendering perf / stress test, FPS counter           | hdom, rstream, transducers                                        | intermediate |
| 14 | [hdom-benchmark2](./hdom-benchmark2)         | hdom rendering perf / stress test, FPS counter           | hdom, hdom-components, hiccup-css, transducers, stats             | intermediate |
| 15 | [hdom-canvas-clock](./hdom-canvas-clock)     | hdom-canvas rendered clock                               | hdom, hdom-canvas, transducers                                    | basic        |
| 16 | [hdom-canvas-draw](./hdom-canvas-draw)       | hdom-canvas mouse / touch gesture drawing                | hdom, hdom-canvas, transducers                                    | intermediate |
| 17 | [hdom-canvas-shapes](./hdom-canvas-shapes)   | various hdom-canvas shape tests                          | hdom, hdom-canvas, rstream, transducers                           | basic        |
| 18 | [hdom-dyn-context](./hdom-dyn-context)       | dynamic hdom user context / theming                      | atom, hdom                                                        | basic        |
| 19 | [hdom-skip](./hdom-skip)                     | selective component updates                              | hdom                                                              | basic        |
| 20 | [hdom-theme-adr-0003](./hdom-theme-adr-0003) | hdom themed components proposal                          | hdom                                                              | intermediate |
| 21 | [hmr-basics](./hmr-basics)                   | hdom & hot module replacement                            | hdom, memoize                                                     | basic        |
| 22 | [hydrate-basics](./hydrate-basics)           | hiccup / hdom DOM hydration                              | hiccup, hdom                                                      | intermediate |
| 23 | [interceptor-basics](./interceptor-basics)   | Event handling w/ interceptors and side effects          | atom, hdom, interceptors                                          | basic        |
| 24 | [interceptor-basics2](./interceptor-basics2) | Event handling w/ interceptors and side effects          | atom, hdom, interceptors                                          | intermediate |
| 25 | [json-components](./json-components)         | JSON->component transformation, live editor              | hdom, transducers                                                 | intermediate |
| 26 | [login-form](./login-form)                   | Basic SPA without router                                 | atom, hdom                                                        | intermediate |
| 27 | [mandelbrot](./mandelbrot)                   | Worker-based mandelbrot fractal renderer                 | rstream, rstream-gestures, transducers-hdom                       | advanced     |
| 28 | [markdown](./markdown)                       | Markdown parser & editor w/ live preview                 | fsm, rstream, transducers-hdom                                    | advanced     |
| 29 | [pointfree-svg](./pointfree-svg)             | Generate SVG using pointfree DSL                         | hiccup, hiccup-svg, pointfree-lang                                | intermediate |
| 30 | [router-basics](./router-basics)             | Complete mini SPA                                        | atom, hdom, interceptors, router                                  | advanced     |
| 31 | [rstream-dataflow](./rstream-dataflow)       | Dataflow graph                                           | atom, hdom, rstream, rstream-gestures, rstream-graph, transducers | intermediate |
| 32 | [rstream-grid](./rstream-grid)               | Dataflow graph SVG grid                                  | atom, hdom, hiccup-svg, interceptors, rstream-graph, transducers  | advanced     |
| 33 | [rstream-hdom](./rstream-hdom)               | rstream based UI updates & state handling                | hdom, rstream, transducers                                        | intermediate |
| 34 | [svg-barchart](./svg-barchart)               | hdom SVG barchart component                              | hdom, transducers                                                 | basic        |
| 35 | [svg-particles](./svg-particles)             | hdom SVG generation / animation                          | hdom, transducers                                                 | basic        |
| 36 | [svg-waveform](./svg-waveform)               | hdom SVG generation / undo history                       | atom, hdom, hiccup-svg, interceptors, iterators                   | intermediate |
| 37 | [todo-list](./todo-list)                     | Canonical Todo list with undo/redo                       | atom, hdom, transducers                                           | intermediate |
| 38 | [transducers-hdom](./transducers-hdom)       | Transducer & rstream based hdom UI updates               | hdom, rstream, transducers-hdom                                   | basic        |
| 39 | [triple-query](./triple-query)               | Triple store query results & sortable table              | atom, hdom, hdom-components, rstream-query, transducers           | intermediate |
| 40 | [webgl](./webgl)                             | Canvas component handling                                | hdom, hdom-components                                             | basic        |
| 41 | [xml-converter](./xml-converter)             | XML/HTML/SVG to hiccup conversion as you type            | rstream, sax, transducers, transducers-hdom                       | advanced     |
