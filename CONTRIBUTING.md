# Contribution guidelines

Firstly, thanks for taking an interest in these projects!

There're many ways you can contribute and help to improve these projects
and help spread the word. This doc describes some guidelines for some of
them.

## Usage questions & issues

Please feel free to use the GH issue tracker for submitting any
questions related to any package in this repo. When doing so, please
also follow the instructions in the "new issue" template and use issue
labels to tag your issue.

When running into code troubles, please try to include a minimal
reproducible example. If the example is too large for including in the
issue, please create a gist or repo and add a link to it.

## Documentation, examples & advocacy

Documentation is still sparse in some areas, so any contributions in the
form listed below are very welcome. I primarily can only work on this
project in my spare time, so have to balance between adding new features
(always my priority) & documentation whenever I can.

### Wiki additions, blog posts, examples

The wiki of this repo is still pretty barebones, however adding some
gallery, FAQs, tutorials, best practice tips, feature ideas/roadmaps and
a collection of links to blog posts, 3rd party examples etc. is planned.
If you have anything to contribute (or have already done so elsewhere),
please do get in touch.

### Small, standalone examples in the repo

"Learning by example" has been my life's motto. The ~60 examples
included in the repo are each focused on a specific feature and kept
quite lowkey for reasons of simplicity. Since many of the projects are
meant to be integrated with other 3rd party projects, I'm always on the
lookout for similar small demos showcasing these integrations (e.g. w/
React, WebGL, SVG etc.)

The repo contains a generator bash script to create a new example
project skeleton in the repo's `/examples` dir. Use it like below (and
make sure the name isn't already taken :)

```
cd umbrella
scripts/make-example my-example

cd examples/my-example
```

(Note 1: the package versions used by this generator MIGHT be
occasionally out-of-date)

(Note 2: **If you've cloned the repo and built all packages, DO NOT run
`yarn install` in the example dir. `yarn start` will work without and
re-use the built packages (irrespective of their version) in the project
root**)

FWIW I usually launch examples from the repo root like this:

```bash
(cd examples/webgl-msdf && yarn start)
```

If you choose to add a new example this way (and not elsewhere on the
interweb), please also read the next section...

## Contributing code

**IMPORTANT:** To avoid misunderstandings or disappointment, please
always first submit an issue discussing any new feature or large
refactoring before starting to code and submitting PRs. For small bug
fixes or new examples it's usually fine without, though. I'm not trying
to complicate things, but it's always good to first talk about larger
contributions and there're also various feature branches, incl. some
existing WIP relevant to your issue / proposal.

### Fork it

```
git clone https://github.com/thi-ng/umbrella.git
cd umbrella

# Installs all dev deps & builds all packages
yarn build
```

### Create a feature branch

**Always use `develop` as base branch!**

```
git checkout -b feature/my-feature develop
```

This repo is using the `git-flow` branching model and all new
development should be done on feature branches based off the current
`develop` branch. PR's submitted directly against the `master` branch
MIGHT be refused.

### Commit your changes

```
git commit -am 'feat(module): description'
```

**Please do use the [Convential Commits convention](https://conventionalcommits.org/) for
your commit messages.** This format is used to generate changelogs and ensures consistency
and better filtering. Since this is a mono repository the convention ensures commit messages
can be easily mapped to their sub-project. Also see existing commits for reference
([example](https://github.com/thi-ng/umbrella/commit/ebbc4910f64c90df7bb93010a75307df51c80b6e)).

The Conventional Commits classifiers/prefixes used in this project are:

- `feat` - new feature
- `fix` - bug fixes
- `refactor` - refactoring
- `perf` - any type of optimization (not just performance)
- `build` - build/dependency related updates
- `doc` - documentation related only (e.g. readme, doc strings...)
- `chore` - unclassified chores
- `minor` - usually fixed typos (unless it qualifies as bug fix)

### Run & add tests

I'm heavily using the node REPL during development and do much of my
testing as part of that workflow. Still, I'm aware that this is no full
replacement for a large suite of tests, therefore most packages do have
a varying (and growing) number of unit tests. If you're adding a new
feature (or think you've fixed a bug), please add some related tests (if
possible) too for extra brownie points. Either add a new file under a
project's `/test` dir or add / edit one of the existing test cases in
there.

### Push to the branch

```
git push origin feature/my-feature
```

### Create new Pull Request

Go to your fork on GH and create a PR.

## Code style guide

### Project layout

Most packages in this repo share this pattern:

- `/src/index.ts` - only used for re-exports
- `/src/api.ts` - interface, enum, type alias and module global consts definitions
- `/test` - Mocha unit tests

In larger packages (e.g.
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers))
topically related files are grouped in sub-folders under `/src`.

### Imports

To encourage small(er) file sizes of production artefacts most source
files are organized to only contain a small number of related functions
/ classes. Package internal imports MUST always refer to the actual
source file, whereas imports from other packages MUST only use the
package name. This is because of the way each package is built and
output in 3 different module formats (ES6, CJS, UMD).

### No default exports

Nuff said. They're potentially problematic in terms of refactoring and
too cause inconsistencies compared to the above named import pattern.

### No 3rd party dependencies

**This does NOT apply to examples, only code in source packages**

Unless absolutely warranted. Yes, this is somewhat a case of
_Not-Invented-Here_, but here done for reasons of sanity & clarity, not
to prove a point. If you plan to submit code with 3rd party deps, please
get in touch first and explain why it's necessary IYHO.

### 4 spaces

Sorry tab folk :)

### Misc

Personally I use VSCode with TSLint's recommended rules

## Donations

I've been developing this project (as well as several large other open
source projects since the late '90s) in my spare time since early 2016
(some packages even older). If you would like to support the continued
development of this project, your donations to the following addresses
would be greatly appreciated:

- BTC: 132aMfzNypBPgEy4Lz2tPQsKGimixdFrsb
- LTC: LMyfhJoXTq62W9zvUBvk9o6pCDZJx12dPV
- ETH: 0x8530bD57cCfCD5e95939E5bA3d81D8c9C9581941
