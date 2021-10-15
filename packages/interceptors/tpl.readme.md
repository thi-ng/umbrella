# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

## Event bus, interceptors, side effects

### Interceptors: Event and Effect primitives

[Reference](https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/interceptors.ts)

The idea of interceptors is quite similar to functional composition and
AOP ([aspect oriented
programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)).
You want to reuse some functionality across components within your app.
For example, if you have multiple actions which should be undoable, you
can compose your main event handlers with the
[`snapShot()`](https://docs.thi.ng/umbrella/interceptors/modules.html#snapshot)
interceptor, which requires a
[@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/develop/packages/atom)/History-like
instance and records a snapshot of the current app state, but else is
completely invisible.

```
[UNDOABLE_EVENT]: [snapshot(), valueSetter("foo")]
```

### Event Handlers

The idea of **event** handlers is being responsible to assign parameters
to side effects, rather than executing effects *themselves*, is again
mainly to do with the DRY-principle, instrumentation potential and
performance. Most composed event handler chains are setup so that your
"actual" main handler is last in line in the pre processing phase. If
e.g. your event handlers would directly update the state atom, then any
attached watches [(derived views, cursors, other
subscriptions)](https://github.com/thi-ng/umbrella/tree/develop/packages/atom#about)
would be re-run each time. By assigning the updated state to, e.g., an
`FX_STATE` event, we can avoid these interim updates and only apply the
new state once all events in the current frame have been processed.
Furthermore, a post interceptor might cancel the event due to validation
errors etc.

#### Events vs Effects:

To briefly summarize the differences between event handlers & effects:

Event handlers are triggered by events, but each event handler is
technically a chain of interceptors (even though many are just a single
item). Even if you just specify a single function, it's internally
translated into an array of interceptor objects like:

```
valueSetter("route") -> [{ pre: (...) => {[FX_STATE]: ...}, post: undefined }]
```

When processing an event, these interceptors are then executed first in
ascending order for any `pre` functions and then backwards again for any
`post` functions (only if there are any in the chain). So if you had
defined an handler with this chain: `[{pre: f1, post: f2}, {pre: f3},
{pre: f4, post: f5}]`, then the functions would be called in this order:
f1, f3, f4, f5, f2. The post phase is largely intended for state/effect
validation & logging post-update. I.e., interceptors commonly need `pre`
only.

Like with
[`trace()`](https://docs.thi.ng/umbrella/interceptors/modules.html#trace) some
interceptors DO have side effects, but they're really the exception to the rule.
For example, `snapshot()` is idempotent since it only records a new snapshot if
it's different from the last and `trace()`, but is typically used during
development only - its side effect is outside the scope of your app (i.e. the
console).

### Great, but why?

In most apps there're far more event types/handlers than possible
actions any component can take. So assigning them to registered side
effects enables better code reuse. Another use-case is debugging. With a
break point set at the beginning of `processEffects()` (in
[`event-bus.ts`](https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/event-bus.ts#L487))
you can see exactly which side effects have occurred at each frame. This
can be very helpful for debugging and avoid having to "keep everything
in your head" or - as Rich Hickey would say - make your app "Easier to
reason about".

More comprehensive description forthcoming. Please check the detailed
commented source code and examples for now:

- [/src/event-bus.ts](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors/src/event-bus.ts)

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
