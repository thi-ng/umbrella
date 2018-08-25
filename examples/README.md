# @thi.ng/umbrella examples

This directory contains a growing number of standalone example projects, including live online versions, build instructions and commented source code.

If you want to [contribute](../CONTRIBUTING.md) an example, please get in touch via PR, issue tracker, email or twitter!

| #  | Name                                         | Description                                              | Packages of interest                                              | Difficulty   |
|----|----------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------------|--------------|
| 1  | [async-effect](./async-effect)               | Async side effect handling (JSON I/O)                    | atom, hdom, interceptors                                          | intermediate |
| 2  | [cellular-automata](./cellular-automata)     | Transducer based, customizable 2D cellular automata      | hdom, hdom-components, transducers                                | basic        |
| 3  | [commit-table-ssr](./commit-table-ssr)       | Server-side & static file rendering of hiccup components | hiccup, transducers                                               | intermediate |
| 4  | [crypto-chart](./crypto-chart)               | Interactive rstream & transducer based SVG chart         | hdom, hiccup-svg, rstream, transducers                            | advanced     |
| 5  | [dashboard](./dashboard)                     | Barebones components w/ local state                      | hdom, transducers                                                 | basic        |
| 6  | [devcards](./devcards)                       | Multiple app instances with/without shared state         | atom, hdom                                                        | intermediate |
| 7  | [hdom-basics](./hdom-basics)                 | Hello world                                              | hdom, hiccup                                                      | basic        |
| 8  | [hdom-benchmark](./hdom-benchmark)           | hdom rendering perf / stress test, FPS counter           | hdom, rstream, transducers                                        | intermediate |
| 9  | [hdom-theme-adr-0003](./hdom-theme-adr-0003) | hdom themed components proposal                          | hdom                                                              | intermediate |
| 10 | [interceptor-basics](./interceptor-basics)   | Event handling w/ interceptors and side effects          | atom, hdom, interceptors                                          | intermediate |
| 11 | [json-components](./json-components)         | JSON->component transformation, live editor              | hdom, transducers                                                 | intermediate |
| 12 | [login-form](./login-form)                   | Basic SPA without router                                 | atom, hdom                                                        | intermediate |
| 13 | [pointfree-svg](./pointfree-svg)             | Generate SVG using pointfree DSL                         | hiccup, hiccup-svg, pointfree-lang                                | intermediate |
| 14 | [router-basics](./router-basics)             | Complete mini SPA                                        | atom, hdom, interceptors, router                                  | advanced     |
| 15 | [rstream-dataflow](./rstream-dataflow)       | Dataflow graph                                           | atom, hdom, rstream, rstream-gestures, rstream-graph, transducers | intermediate |
| 16 | [rstream-grid](./rstream-grid)               | Dataflow graph SVG grid                                  | atom, hdom, hiccup-svg, interceptors, rstream-graph, transducers  | advanced     |
| 17 | [rstream-hdom](./rstream-hdom)               | rstream based UI updates & state handling                | hdom, rstream, transducers                                        | intermediate |
| 18 | [svg-particles](./svg-particles)             | hdom SVG generation / animation                          | hdom, transducers                                                 | basic        |
| 19 | [svg-waveform](./svg-waveform)               | hdom SVG generation / undo history                       | atom, hdom, hiccup-svg, interceptors, iterators                   | intermediate |
| 20 | [todo-list](./todo-list)                     | Canonical Todo list with undo/redo                       | atom, hdom, transducers                                           | intermediate |
| 21 | [transducers-hdom](./transducers-hdom)       | Transducer & rstream based hdom UI updates               | hdom, rstream, transducers-hdom                                   | basic        |
| 22 | [triple-query](./triple-query)               | Triple store query results & sortable table              | atom, hdom, hdom-components, rstream-query, transducers           | intermediate |
| 23 | [webgl](./webgl)                             | Canvas component handling                                | hdom, hdom-components                                             | basic        |