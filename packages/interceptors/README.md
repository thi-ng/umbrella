# @thi.ng/interceptors

[![npm version](https://img.shields.io/npm/v/@thi.ng/interceptors.svg)](https://www.npmjs.com/package/@thi.ng/interceptors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/interceptors.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

## About

Interceptor based event, side effect & immutable state handling.

## Installation

```bash
yarn add @thi.ng/interceptors
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
- [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/master/packages/paths)

## Usage examples

```ts
importas interceptors from "@thi.ng/interceptors";
```

## Event Bus, Interceptors, Side Effects


### [Interceptors](https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/interceptors.ts) (Event and Effect primitives)

The idea of interceptors is quite similar to functional composition and AOP ([aspect oriented programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)). You want to reuse some functionality across components within your app. For example, if you have multiple actions which should be undoable, you can compose your main event handlers with the [`snapShot()`](https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/interceptors.ts#L55) interceptor, which requires a [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)/History-like instance and records a snapshot of the current app state, but else is completely invisible. 

```
[UNDOABLE_EVENT]: [snapshot(), valueSetter("foo")]
```

### Defining Interceptors

Configuration of events and effects (collectively known as interceptors) can be provided upon initialization of the EventBus as objects with named keys (constants) and values that communicate with the bus.

#### Signatures

Interceptor values have the following valid signatures:

```js
{
  I_FACTORY: (_, [__, args]) => ({ FX_KEY: [ ... ], FX_KEY2: (args) => {} }),
  I_FACTORY2: (_, [__, args], bus, ctx) => { ... return { FX_KEY: ... } },
  I_ARRAY: [ interceptor1(), () => ({ ...interceptors }) ],
  I_ARRAY_VERBOSE: [ { pre: () => ({}), post: () => ({}) } ]
}
```

The reason for the `_` and `__` args is just a convention for saying "I don't need these arguments". You will see this often throughout the sourcecode, but here are the arguments that are passed to your interceptor factory [function signature](http://bit.ly/interceptor_signature) by the `EventBus`:

```js
{ INTERCEPTOR: (state, [event_key, event_args], bus, ctx) => ({ ... }) }
```

To sum up, interceptors can be defined as:

- factories
- an array of factories
- an array of explicitly defined interceptor objects (see Interceptor Object Syntax below)
- a nested array of any of the above

#### Commented Source:

- Interceptor [config options](http://bit.ly/evs_config) 
- Example: [I_FACTORY2](http://bit.ly/ev_factory2)
- Example: [I_ARRAY](http://bit.ly/ev_array)

### Expanded Interceptor Syntax

If you'd like to have lower level control over ordering of interceptors, you can use this expanded syntax for such factories:

```js
{
  I_EXPANDED: [ { pre: () => ({}), post: () => ({}) }, { pre: () => ({}), post: () => ({}) } ],
}
```

Each event/effect handler is technically a chain of interceptors even though many are just a single item. I.e., they are automatically converted from their shorthand:

`I: () => ({})`

into:

`I: [{pre: () => ({}), post: undefined}]`

When processing an event/effect, these interceptors are then executed first in ascending order for any `pre` functions and then backwards again for any `post` functions defined. So if you had defined an handler with this chain: 

`[{pre: f1, post: f2}, {pre: f3}, {pre: f4, post: f5}]`

then the functions would be called in this order:

`f1 -> f3 -> f4 -> f5 -> f2`

The post phase is largely intended for state/effect validation & logging post-update. I.e., interceptors commonly need `pre` only and so provide the unwrapped factory sugar. Event handlers should be pure functions (returning referentially transparent data immediately) and only side effects (see Effects below) execute any "real" work, which are triggered by events automatically when returned from their factories

Like with [`trace()`](https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/interceptors.ts#L21) some interceptors DO have side effects, but they're really the exception to the rule. For example, `snapshot()` is idempotent since it only records a new snapshot if it's different from the last and `trace()`, but is typically used during development only - its side effect is outside the scope of your app (i.e. the console).


### Event Handlers

The idea of *event* handlers is being responsible to assign parameters to side *effect* handlers, rather than executing effects themselves, is again mainly to do with the DRY-principle, instrumentation potential and performance. Most composed event handler chains are setup so that your "actual" main handler is last in line in the `pre` processing phase. If e.g. your event handlers would directly update the state atom, then any attached watches [(derived views, cursors, other subscriptions)](https://github.com/thi-ng/umbrella/tree/master/packages/atom#about) would be re-run each time. By assigning the updated state to, e.g., an `FX_STATE` event, we can avoid these interim updates and only apply the new state once all events in the current frame have been processed. Furthermore, a `post` interceptor might cancel the event due to validation errors etc.

Events are always triggered and run before any side-effects are triggered.

#### Built-in Event Handlers

Built-ins for default (stateful) `EventBus`:

```js
[EV_SET_VALUE]: (state, [_, [path, val]]) => ({ [FX_STATE]: setIn(state, path, val) }),
[EV_UPDATE_VALUE]: (state, [_, [path, fn, ...args]]) => ({ [FX_STATE]: updateIn(state, path, fn, ...args) }),
[EV_TOGGLE_VALUE]: (state, [_, path]) => ({ [FX_STATE]: updateIn(state, path, (x) => !x) }),
[EV_UNDO]: undoHandler("undo"),
[EV_REDO]: undoHandler("redo")
```

### Effect Handlers

Effects are where the 'real work' happens. This is where you do your I/O, UI updates, etc.. 

#### Built-in Effect Handlers

```js
// Execute next frame:
[FX_DISPATCH]: [([ev_key, ev_val]) => bus.dispatch([ev_key, ev_val]), -999]
// Execute this frame (if triggered w/in bus context):
[FX_DISPATCH_NOW]: [([ev_key, ev_val]) => bus.dispatchNow([ev_key, ev_val])]
// Execute on frame following success:
[FX_DISPATCH_ASYNC]: [([ev_key, arg, success, err], bus, ctx) => {
   const fx = bus.effects[ ev_key ] // calls effect handler for constant
   if (fx) {
     const p = fx(arg, bus, ctx);
     if (isPromise(p)) {
       p.then((res) => bus.dispatch([success, res])).catch((e) => bus.dispatch([err, e]));
     } else {
       LOGGER.warn("async effect did not return Promise");
     }
   } else {
     LOGGER.warn(`skipping invalid async effect: ${ev_key}`);
   }
 },
 -999
]
// Synchronous effects:
[FX_CANCEL] // -> toggles a boolean internal to the bus to cancel all queued interceptors
[FX_STATE] // -> takes an atom/history function (e.g., updateIn) and applies it to the state
// BUILT-IN PROMISES WHICH CAN BE USED AS FIRST ARGUMENT TO FX_DISPATCH_ASYNC:
[FX_DELAY]: [([x, body]) => new Promise((res) => setTimeout(() => res(body), x)), 1000]
[FX_FETCH]: [(req) => fetch(req).then((resp) => { if (!resp.ok) { throw new Error(resp.statusText) } return resp }), 1000]
```

![but why](http://www.reactiongifs.com/r/but-why.gif)

### Great, but why?

In most apps there're far more event types/handlers than possible actions any component can take. So assigning them to registered side effects enables better code reuse. Another use-case is debugging. With a break point set at the beginning of `processEffects()` (in [`event-bus.ts`](https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/event-bus.ts#L36)) you can see exactly which side effects have occured at each frame. This can be very helpful for debugging and avoid having to "keep everything in your head" or - as Rich Hickey would say - make your app "Easier to reason about".

More comprehensive description forthcoming. Please check the detailed commented source code
and examples for now:

- [/src/event-bus.ts](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors/src/event-bus.ts)

Introductory:

- [/examples/interceptor-basics](https://github.com/thi-ng/umbrella/tree/master/examples/interceptor-basics) | [live demo](https://demo.thi.ng/umbrella/interceptor-basics)
- [/examples/interceptor-basics2](https://github.com/thi-ng/umbrella/tree/master/examples/interceptor-basics2) | [live demo](https://demo.thi.ng/umbrella/interceptor-basics2)
- [/examples/async-effect](https://github.com/thi-ng/umbrella/tree/master/examples/async-effect) | [live demo](https://demo.thi.ng/umbrella/async-effect)

Advanced:

- [/examples/rstream-dataflow](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-dataflow) | [live demo](https://demo.thi.ng/umbrella/rstream-dataflow)
- [/examples/rstream-grid](https://github.com/thi-ng/umbrella/tree/master/examples/rstream-grid) | [live demo](https://demo.thi.ng/umbrella/rstream-grid)
- [/examples/router-basics](https://github.com/thi-ng/umbrella/tree/master/examples/router-basics) | [live demo](https://demo.thi.ng/umbrella/router-basics)
- [/examples/svg-waveform](https://github.com/thi-ng/umbrella/tree/master/examples/svg-waveform) | [live demo](https://demo.thi.ng/umbrella/svg-waveform)

- [create-hdom-app](https://github.com/thi-ng/create-hdom-app) Yarn project generator. Uses: @thi.ng/atom + hdom + interceptors + router

## Authors

- Karsten Schmidt

## License



&copy; 2018 Karsten Schmidt // Apache Software License 2.0
