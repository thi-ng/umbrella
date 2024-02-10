<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
> [!IMPORTANT]
> ‼️ Announcing the thi.ng user survey 2024 📋
>
> [Please participate in the survey here!](https://forms.gle/XacbSDEmQMPZg8197)\
> (open until end of February)
>
> **To achieve a better sample size, I'd highly appreciate if you could
> circulate the link to this survey in your own networks.**
>
> [Discussion](https://github.com/thi-ng/umbrella/discussions/447)

# ![@thi.ng/dsp](https://media.thi.ng/umbrella/banners-20230807/thing-dsp.svg?5dc8dc3b)

[![npm version](https://img.shields.io/npm/v/@thi.ng/dsp.svg)](https://www.npmjs.com/package/@thi.ng/dsp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dsp.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 189 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [IGen](#igen)
    - [Higher order generators](#higher-order-generators)
    - [Oscillators](#oscillators)
  - [IProc](#iproc)
    - [Filters](#filters)
    - [Filter responses](#filter-responses)
    - [Delay](#delay)
    - [Feedback delay](#feedback-delay)
    - [Filtered feedback delay](#filtered-feedback-delay)
    - [Wave shaping](#wave-shaping)
    - [Foldback distortion](#foldback-distortion)
  - [FFT](#fft)
    - [Window functions](#window-functions)
  - [Utilities](#utilities)
- [Authors](#authors)
- [License](#license)

## About

Composable signal generators, oscillators, filters, FFT, spectrum, windowing & related DSP utils.

Partially ported from other thi.ng projects (e.g.
[thi.ng/synstack](https://github.com/thi-ng/synstack),
[thi.ng/vexed-generation](http://thi.ng/vexed-generation),
[toxiclibs](http://toxiclibs.org)).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdsp%5D+in%3Atitle)

Even though this library is now at v2.0.0 and still retains most of the features
from earlier versions, all recently added features (IGen's, IProc's, composition
ops etc.) should be considered "beta" and are likely to undergo further
(hopefully not too drastic) changes in the near future. Also, pending outcomes
of ongoing experiments, some aspects might be ported to WASM.

## Support packages

- [@thi.ng/dsp-io-wav](https://github.com/thi-ng/umbrella/tree/develop/packages/dsp-io-wav) - WAV file format generation

## Related packages

- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math) - Assorted common math functions & utilities

## Installation

```bash
yarn add @thi.ng/dsp
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/dsp"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const dsp = await import("@thi.ng/dsp");
```

Package sizes (brotli'd, pre-treeshake): ESM: 7.57 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                | Description                                                 | Live demo                                                | Source                                                                                |
|:--------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png" width="240"/>          | Interactive inverse FFT toy synth                           | [Demo](https://demo.thi.ng/umbrella/fft-synth/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fft-synth)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fiber-basics.png" width="240"/>       | Fiber-based cooperative multitasking basics                 | [Demo](https://demo.thi.ng/umbrella/fiber-basics/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/fiber-basics)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>        | Polygon to cubic curve conversion & visualization           | [Demo](https://demo.thi.ng/umbrella/poly-spline/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rasterize-blend.jpg" width="240"/>    | Steering behavior drawing with alpha-blended shapes         | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rasterize-blend)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/> | Minimal rdom-canvas animation                               | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-canvas-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/render-audio.png" width="240"/>       | Generative audio synth offline renderer and WAV file export | [Demo](https://demo.thi.ng/umbrella/render-audio/)       | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/render-audio)       |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-cubemap.jpg" width="240"/>      | WebGL cube maps with async texture loading                  | [Demo](https://demo.thi.ng/umbrella/webgl-cubemap/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-cubemap)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/webgl-ssao.jpg" width="240"/>         | WebGL screenspace ambient occlusion                         | [Demo](https://demo.thi.ng/umbrella/webgl-ssao/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/webgl-ssao)         |

## API

[Generated API docs](https://docs.thi.ng/umbrella/dsp/)

### IGen

The following unit generators are infinite data sources based on the [`IGen`
interface](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/api.ts)
with most being resettable too. The interface is similar to ES6 iterators in
that the next value can be obtained by calling `.next()`, however since `IGen`s
are always infinite, there's no need to [wrap the result
value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)
as is done with ES6 iterables. Furthermore, all gens defined in this package do
implement `Symbol.iterator` and so can actually be used as standard iterables as
well.

`IGen` also implements the
[`IDeref`](https://github.com/thi-ng/umbrella/blob/develop/packages/api/src/api/deref.ts)
interface to obtain the gen's current (last generated) value.

```ts
// create exponential curve from 0 - 10 over 5 steps
const c = curve(0, 10, 5);

// get next value
c.next()
// 0
c.next()
// 6.087111442696312
c.next()
// 8.505616378877338
c.next()
// 9.46652635750935
c.next()
// 9.848310977098592
c.next()
// 9.999999999999998

// get current value
c.deref()
// 9.999999999999998

// reset gen
c.reset()

// produce an array (can also write into existing buffer)
c.take(6)
// [
//   0,
//   6.087111442696312,
//   8.505616378877338,
//   9.46652635750935,
//   9.848310977098592,
//   9.999999999999998
// ]

// use as ES6 iterable, here w/ transducers
import { take } from "@thi.ng/transducers";

[...take(6, c.reset())]
// [
//   0,
//   6.087111442696312,
//   8.505616378877338,
//   9.46652635750935,
//   9.848310977098592,
//   9.999999999999998
// ]
```

- [add](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/add.ts) - adder
- [adsr](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/adsr.ts) - timebased ADSR / AD envelope generator
- [alt](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/alt.ts) - alternating values
- [constant](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/const.ts) - constant value
- [cosine](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/cosine.ts) - trig-free cosine osc
- [curve](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/curve.ts) - timebased exponential gain/decay (factory for `madd`)
- [impulse](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/impulse.ts) - impulse gen
- [impulseTrain](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/impulse-train.ts) - timebased cyclic impulse
- [line](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/line.ts) - timebased line gen (factory for `add`)
- [madd](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/madd.ts) - multiply-adder
- [mul](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/mul.ts) - multiplier (exponential gain/decay)
- [pinkNoise](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/pink-noise.ts) - configurable pink noise (1/f power spectrum)
- [reciprocal](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/reciprocal.ts) - fractional sequence (1, 1/2, 1/3, 1/4 etc.)
- [sincos](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/sincos.ts) - trig-free sin/cos LFO
- [sweep](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/sweep.ts) - freq sweep gen w/ phase accumulation for oscillators
- [whiteNoise](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/white-noise.ts) - white noise

#### Higher order generators

- [mapG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/mapg.ts) - `IGen` composition / transformation (1-4 inputs)
- [addG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/addg.ts) - higher-order adder
- [product](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/product.ts) - product of input gens
- [sum](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/sum.ts) - sum of input gens

#### Oscillators

##### IGen wrappers

- [osc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc.ts) - arbitrary function oscillator w/ modulation support
- [modOsc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc.ts) - FM / FMAM oscillator builder

```ts
const FS = 44100;

// simple 100Hz sine oscillator
const o = osc(sin, 100 / FS, 0.5);

// get next sample
o.next();
...

// frequency & amplitude modulated saw osc
const fmam = modOsc(
    // carrier waveform
    saw,
    // carrier freq
    1000 / FS,
    // fmod
    osc(saw, 5000 / FS, 0.3),
    // amod
    osc(saw, 500 / FS)
);

// compute 1sec of signal
fmam.take(FS)
```

Diagram of the FM/AM osc with some low pass filters applied:

![FM/AM waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmam-osc.png)

##### Stateless oscillator functions

- [additive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-additive.ts)
- [dsf](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-dsf.ts)
- [mix](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-mix.ts)
- [parabolic](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-parabolic.ts)
- [rect](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-rect.ts)
- [saw](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-saw.ts)
- [sawAdditive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-additive.ts)
- [squareAdditive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-additive.ts)
- [squareSin](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-square-sin.ts)
- [sin](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-sin.ts)
- [tri](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-tri.ts)
- [wavetable](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc-wavetable.ts)

### IProc

The second fundamental interface in this package, similar to `IGen` and used to
implement processors & transformers of input values (e.g those generated by the
various `IGen`s available). `IProc` implementations have a `.next(x)` method,
where `x` is the next input to be processed.

The package also provides several approaches to compose multi-step processing
pipelines (see section further below). Furthermore, all implementations in this
package implement the [@thi.ng/transducers `IXform`
interface](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/README.md#IXform-interface)
and so can be directly used in transducer pipelines too.

Additional higher order `IProc` implementations:

- [bounce](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/bounce.ts) - sum multiple inputs
- [mix](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/mix.ts) - linear interpolation of 2 inputs
- [multiplex](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/multiplex.ts) - process 1 input into multiple outs
- [pipe](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/pipe.ts) - `IGen` & multiple `IProc` pipeline setup
- [serial](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/serial.ts) - serial processing of multiple `IProc`

```ts
import { comp, push, take, transduce } from "@thi.ng/transducers";

const FS = 48000;      // sample rate
const F1 = 1 / FS;     // start freq
const F2 = 10000 / FS; // end freq

// generate oscillator sweep with some effects applied
const sig = new Float32Array(
    transduce(
        comp(
            // consume 8 secs worth of samples
            take(8 * FS),
            // lowpass filter (state variable filter)
            svfLP(F2),
            // soft clip
            waveShaper(4),
            // 0.5sec delay w/ 60% feedback
            feedbackDelay(0.5 * FS, 0.6)
        ),
        // reducer: collect as array
        push(),
        // oscillator (consumed as ES6 iterable)
        osc(
            // osc function (use only 3 harmonics)
            sawAdditive(3),
            // freq sweep F1 -> F2 over 6 sec
            sweep(F1, F2, 6 * FS),
            // envelope (using attack & decay phase only)
            adsr({ a: 0.05 * FS, d: 5.95 * FS, s: 0 })
        )
    )
);

fs.writeFileSync("sig.raw", Buffer.from(sig.buffer));
```

Use the [@thi.ng/dsp-io-wav
package](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp-io-wav/)
to export as WAV, or alternatively use `ffmpeg` for conversion:

```bash
ffmpeg -f f32le -ar 48k -ac 1 -i sig.raw sig.wav -y
```

#### Filters

The following diagrams show various combinations of oscillator signals and their
filtered responses (with different cutoff/center frequencies).

All diagrams were generated with [this
script](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/tools/generate-diagrams.ts).

The following filter types / functions are available:

##### 1-pole

- [`onepoleLP`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/onepole.ts) - low pass, 6dB/oct falloff
- [`dcBlock`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/dcblock.ts) - high pass, 6dB/oct falloff
- [`allpass`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/allpass.ts) - allpass (-90° phase shift @ center freq)

Low pass:

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-1pole-lpf.png)

DC blocker:

![DC block response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-dcblock.png)

Allpass:

![Allpass response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-allpass1.png)

##### Biquad

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/biquad.ts)

- `biquadLP` - low pass, 12dB/oct falloff, resonance
- `biquadHP` - high pass, 12dB/oct falloff, resonance
- `biquadBP` - band pass, 12dB/oct falloff, resonance
- `biquadNotch` - notch / band-stop, resonance/bandwidth
- `biquadPeak` - peak EQ, customizable +/- gain, bandwidth
- `biquadLoShelf` - low shelf, customizable +/- gain
- `biquadHiShelf` - low shelf, customizable +/- gain

(Q = 0.707 for all versions)

Low pass:

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-lpf.png)

High pass:

![HPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-hpf.png)

Band pass:

![BPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-bpf.png)

Notch:

![Notch response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-notch.png)

Peak (gain = 6dB):

![Peak response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-peak.png)

Low shelf (gain = -6dB):

![Lo-shelf response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-lsh.png)

High shelf (gain = -6dB):

![Hi-shelf response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-hsh.png)

##### State variable filter

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/svf.ts)

- `svfLP` - low pass, resonance
- `svfHP` - high pass, resonance
- `svfBP` - band pass, resonance
- `svfNotch` - notch / band-stop, resonance/bandwidth
- `svfPeak` - peak EQ, customizable +/- gain, bandwidth
- `svfAllpass` - allpass, bandwidth

(Q = 0.5 for all versions)

Low pass:

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-lpf.png)

High pass:

![HPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-hpf.png)

Band pass:

![BPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-bpf.png)

Notch:

![Notch response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-notch.png)

Peak (gain = 6dB):

![Peak response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-peak.png)

Allpass:

![Allpass response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-all.png)

#### Filter responses

Using the [Filter response
utils](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/filter-response.ts),
the following filter types can be evaluated for analyzing their impact on
specific frequencies (or frequency bands). Any type implementing
[`IFilter`](https://docs.thi.ng/umbrella/dsp/interfaces/FilterConfig.html) can
be used, currently:

- 1-pole
- DC-block
- Biquad

```ts
// peak biquad @ 5kHz w/ -60dB gain
const coeffs = biquadPeak(5000 / FS, 10, -60).filterCoeffs();
// {
//   zeroes: [ 0.030659922512760035, -0.04493872132576855, 0.028719301737009807 ],
//   poles: [ 1, -0.04493872132576855, -0.94062077575023 ]
// }

// compute 256 filter responses between 0 - nyquist
// (magnitude in dBFS by default, phase shift in radians)
const resp = freqRange(0, 0.5, 256).map((f) => filterResponse(coeffs, f));
// [
//   { freq: 0, phase: 0, mag: -9.836140158843584e-14 },
//   {
//     freq: 0.00196078431372549,
//     phase: -1.025916720326544,
//     mag: -5.731888923801755
//   },
//   {
//     freq: 0.00392156862745098,
//     phase: -1.27451127560192,
//     mag: -10.788101434823263
//   },
//   ...
// ]
```

Basic filter response plot:

![Filter response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/bq-notch-resp.png)

#### Delay

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/delay.ts)

Ringbuffer / delay line for arbitrary values and support for single & multi-taps
at any relative positions. Useful fundamental building block for various other
effects, filters etc.

#### Feedback delay

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/feedback-delay.ts)

Variation of `delay()` which adds a portion of the delayed value to each new
input and stores result in delay line.

#### Filtered feedback delay

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/filter-delay.ts)

Variation of `feedbackDelay()` which processes feedback via given filter /
`IProc`, e.g. to create dub style filter delays.

#### Wave shaping

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/waveshaper.ts)

This operator remaps inputs via a user provided function. The following shaping
functions are provided:

- `waveshapeTan` - arctan based (soft-clip/distortion)
- `waveshapeSigmoid` - sigmoid based, similar to above
- `waveshapeSin` - depending on coefficient, can produce entirely new waveforms

Use the [interactive calculator @
Desmos](https://www.desmos.com/calculator/hg4i7o836i) to experiment.

Acrtan:

![Tan response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-tan.png)

Sigmoid:

![Sigmoid response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-sigmoid.png)

Sine:

![Sine response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-sin.png)

#### Foldback distortion

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/foldback.ts)

Recursively folds input into `[-thresh .. +thresh]` interval and amplifies it
with `amp` (default: 1/thresh).

Use the [interactive calculator @
Desmos](https://www.desmos.com/calculator/lkyf2ag3ta) to experiment.

![Foldback response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-foldback.png)

### FFT

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/fft.ts)

- `fft()`
- `ifft()`
- `normalizeFFT()`
- `denormalizeFFT()`
- `scaleFFT()`
- `complexArray()`
- `conjugate()`
- `powerSumSquared()`
- `powerMeanSquared()`
- `powerTimeIntegral()`
- `spectrumMag()`
- `spectrumPow()` (optionally as dBFS)
- `spectrumPhase()`
- `binFreq()`
- `freqBin()`
- `fftFreq()`
- `integralT()` / `integralTSquared()`
- `integralF()` / `integralFSquared()`

#### Window functions

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/window.ts)

- `window()`
- `applyWindow()`
- `windowRect()`
- `windowBartlett()`
- `windowWelch()`
- `windowSin()`
- `windowSinPow()`
- `windowLanczos()`
- `windowHann()`
- `windowHamming()`
- `windowBlackman()`
- `windowBlackmanHarris()`
- `windowNuttal()`
- `windowBlackmanNuttal()`
- `windowGauss()`

### Utilities

- [Unit conversions](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/convert.ts)
- [Filter response](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/filter-response.ts)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-dsp,
  title = "@thi.ng/dsp",
  author = "Karsten Schmidt",
  note = "https://thi.ng/dsp",
  year = 2015
}
```

## License

&copy; 2015 - 2024 Karsten Schmidt // Apache License 2.0
