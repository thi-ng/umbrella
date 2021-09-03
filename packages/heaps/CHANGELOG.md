#  Change Log 

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines. 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.2.43...@thi.ng/heaps@1.3.0) (2021-08-17) 

###  Features 

- **heaps:** add PriorityQueue impl ([c33027b](https://github.com/thi-ng/umbrella/commit/c33027bfe8cc1cb5aa0241767d7bc788ff6b63f6)) 
- **heaps:** add/update find()/has() impls ([5ca6538](https://github.com/thi-ng/umbrella/commit/5ca6538d04fdc66f5174db5a7d6183979b26465c)) 
- **heaps:** update all Heap impls, opts, add factories ([fbfb7bb](https://github.com/thi-ng/umbrella/commit/fbfb7bb2959334544efa2d52bd98d8d3e5638dcc)) 

##  [1.2.38](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.2.37...@thi.ng/heaps@1.2.38) (2021-03-17) 

###  Bug Fixes 

- **heaps:** update return types ([#283](https://github.com/thi-ng/umbrella/issues/283)) ([f7eabec](https://github.com/thi-ng/umbrella/commit/f7eabec276a6a08b58d93512421bae1df1817f2d)) 

##  [1.2.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.2.30...@thi.ng/heaps@1.2.31) (2021-01-21) 

###  Bug Fixes 

- **heaps:** update pushPop() comparison ([f530236](https://github.com/thi-ng/umbrella/commit/f5302368a56435cda92bbdc205b9467acaf9c64b)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.1.6...@thi.ng/heaps@1.2.0) (2020-01-24) 

###  Features 

- **heaps:** add PairingHeap ([748da44](https://github.com/thi-ng/umbrella/commit/748da4405f9b4ab49bbdb3d4b49131df1f0cae88)) 

###  Performance Improvements 

- **heap:** add benchmarks ([2208353](https://github.com/thi-ng/umbrella/commit/220835345b1e842950a7288a8cc618585fda593f)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@1.0.10...@thi.ng/heaps@1.1.0) (2019-07-07) 

###  Features 

- **heaps:** enable TS strict compiler flags (refactor) ([86b9c9e](https://github.com/thi-ng/umbrella/commit/86b9c9e)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.3.1...@thi.ng/heaps@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.2.20...@thi.ng/heaps@0.3.0) (2018-10-21) 

###  Features 

- **heaps:** add pushPopAll() ([1063fea](https://github.com/thi-ng/umbrella/commit/1063fea)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/heaps@0.1.0...@thi.ng/heaps@0.2.0) (2018-04-22) 

###  Bug Fixes 

- **heaps:** add DHeap ICopy/IEmpty impls, fix return types ([5894572](https://github.com/thi-ng/umbrella/commit/5894572)) 

###  Features 

- **heaps:** add min/max(), update heapify() and percolate methods ([c4bbee0](https://github.com/thi-ng/umbrella/commit/c4bbee0)) 
- **heaps:** iterator now returns min() seq ([fccb3af](https://github.com/thi-ng/umbrella/commit/fccb3af)) 

#  0.1.0 (2018-04-22) 

###  Features 

- **heaps:** import [@thi](https://github.com/thi).ng/heaps package ([0ea0847](https://github.com/thi-ng/umbrella/commit/0ea0847)) 
