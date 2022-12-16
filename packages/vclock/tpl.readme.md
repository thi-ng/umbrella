<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

[Vector clock algorithm](https://en.wikipedia.org/wiki/Vector_clock):

- Initially all clocks are zero.
- Each time a process experiences an internal event, it increments its own
  logical clock in the vector by one (`inc()`).
- Each time a process sends a message, it increments its own logical clock in
  the vector by one and then sends a copy of its own vector.
- Each time a process receives a message, it increments its own logical clock in
  the vector by one and updates each element in its vector by taking the maximum
  of the value in its own vector clock and the value in the vector in the
  received message (`merge()`).

The package provides the following **immutable** vector clock operations, where
vector clocks are plain JS objects:

- `inc(clock, id)` - increment (or create) clock component
- `remove(clock, id)` - remove clock component
- `merge(a, b)` - merge two vector clocks
- `signedSkew(a, b)` - max signed difference between vector clocks
- `absSkew(a, b)` - max unsigned difference between vector clocks
- `compare(a, b)` - comparator for logically ordering vector clocks
- `isBefore(a, b)` - true if a < b
- `isAfter(a, b)` - true if a > b
- `isConcurrent(a, b)` - if both clocks represent concurrent updates
- `equiv(a, b)` - equality predicate
- `orderAsc(a, b)` - alias for `compare()`
- `orderDesc(a, b)` - reverse order to `orderAsc()`

References:

- [Wikipedia](https://en.wikipedia.org/wiki/Vector_clock)
- [Princeton COS 418: Distributed Systems](https://www.cs.princeton.edu/courses/archive/fall18/cos418/schedule.html)
    - [Lecture 4](https://www.cs.princeton.edu/courses/archive/fall17/cos418/docs/L4-vc.pdf)
    - [Lecture 5](https://www.cs.princeton.edu/courses/archive/fall17/cos418/docs/L5-vc.pdf)
- [F. Mattern: Virtual Time and Global States of Distributed Systems](https://www.vs.inf.ethz.ch/publ/papers/VirtTimeGlobStates.pdf)
- [P. Krzyzanowski: Clock synchronization](http://soft.vub.ac.be/~tvcutsem/distsys/clocks.pdf)
- [L. Lamport](http://lamport.azurewebsites.net/pubs/time-clocks.pdf)
- [Akka docs](http://api.getakka.net/docs/stable/html/8D0C3FFF.htm)

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

TODO

<!-- include ../../assets/tpl/footer.md -->
