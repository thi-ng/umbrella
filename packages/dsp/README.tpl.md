# ${pkg.name}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Partially ported from other thi.ng projects (e.g.
[thi.ng/synstack](https://github.com/thi-ng/synstack),
[thi.ng/vexed-generation](http://thi.ng/vexed-generation),
[toxiclibs](http://toxiclibs.org)).

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

```bash
yarn add ${pkg.name}
```

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

### IGen

The following unit generators are infinite data sources based on the
[`IGen`
interface](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/api.ts)
with most being resettable too. The interface is similar to ES6
iterators in that the next value can be obtained by calling `.next()`,
however since `IGen`s are always infinite, there's no need to [wrap the
result
value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)
as is done with ES6 iterables. Furthermore, all gens defined in this
package do implement `Symbol.iterator` and so can actually be used as
standard iterables as well.

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

- [add](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/add.ts) - adder
- [adsr](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/add.ts) - timebased ADSR / AD envelope generator
- [alt](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/alt.ts) - alternating values
- [constant](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/const.ts) - constant value
- [cosine](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/cosp.ts) - trig-free cosine osc
- [curve](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/madd.ts) - timebased exponential gain/decay (factory for `madd`)
- [impulse](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/impulse.ts) - impulse gen
- [impulseTrain](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/impulse-train.ts) - timebased cyclic impulse
- [line](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/add.ts) - timebased line gen (factory for `add`)
- [madd](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/madd.ts) - multiply-adder
- [mul](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/mul.ts) - multiplier (exponential gain/decay)
- [pinkNoise](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/pink-noise.ts) - configurable pink noise (1/f power spectrum)
- [reciprocal](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/reciprocal.ts) - fractional sequence (1, 1/2, 1/3, 1/4 etc.)
- [sincos](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/cosp.ts) - trig-free sin/cos LFO
- [sweep](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/sweep.ts) - freq sweep gen w/ phase accumulation for oscillators
- [whiteNoise](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/pink-noise.ts) - white noise

#### Higher order generators

- [mapG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/mapg.ts) - `IGen` composition / transformation (1-4 inputs)
- [addG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/addg.ts) - higher-order adder
- [product](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/product.ts) - product of input gens
- [sum](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/sum.ts) - sum of input gens

#### Oscillators

##### IGen wrappers

- [osc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/osc.ts) - arbitrary function oscillator w/ modulation support
- [modOsc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/osc.ts) - FM / FMAM oscillator builder

##### Stateless

- [additive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/additive.ts)
- [dsf](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/dsf.ts)
- [mix](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/mix.ts)
- [parabolic](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/parabolic.ts)
- [rect](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/rect.ts)
- [saw](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/saw.ts)
- [sawAdditive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/additive.ts)
- [squareAdditive](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/additive.ts)
- [sin](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/sin.ts)
- [tri](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/tri.ts)
- [wavetable](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/osc/wavetable.ts)

### IProc

The second fundamental interface in this package, similar to `IGen` and
used to implement processors & transformers of input values (e.g those
generated by the various `IGen`s availabe). `IProc` implementations have a
`.next(x)` method, where `x` is the next input to be processed.

The package also provides several approaches to compose multi-step
processing pipelines (see section further below). Furthermore, all
implementations in this package implement the [@thi.ng/transducers
`IXform`
interface](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers/README.md#IXform-interface)
and so can be directly used in transducer pipelines too.

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

The raw audio file can then be converted to WAV via `ffmpeg`:

```bash
ffmpeg -f f32le -ar 48k -ac 1 -i sig.raw sig.wav -y
```

#### Filters

The following diagrams show various combinations of oscillator signals
and their filtered responses (with different cutoff/center frequencies).

All diagrams were generated with [this
script](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/tools/generate-diagrams.ts).

The following filter types / functions are available:

##### 1-pole

- [`onepoleLP`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/onepole.ts) - low pass, 6dB/oct falloff
- [`dcBlock`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/dcblock.ts) - high pass, 6dB/oct falloff
- [`allpass`](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/allpass.ts) - allpass (-90° phase shift @ center freq)

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-1pole-lpf.png)

![DC block response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-dcblock.png)

![Allpass response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-allpass1.png)

##### Biquad

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/biquad.ts)

- `biquadLP` - low pass, 12dB/oct falloff, resonance
- `biquadHP` - high pass, 12dB/oct falloff, resonance
- `biquadBP` - band pass, 12dB/oct falloff, resonance
- `biquadNotch` - notch / band-stop, resonance/bandwidth
- `biquadPeak` - peak EQ, customizable +/- gain, bandwidth
- `biquadLoShelf` - low shelf, customizable +/- gain
- `biquadHiShelf` - low shelf, customizable +/- gain

(Q = 0.707 for all versions)

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-lpf.png)

![HPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-hpf.png)

![BPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-bpf.png)

![Notch response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-notch.png)

![Peak response (gain = 6dB)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-peak.png)

![Lo-shelf response (gain = -6dB)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-lsh.png)

![Hi-shelf response (gain = -6dB)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-bq-hsh.png)

##### State variable filter

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/biquad.ts)

- `svfLP` - low pass, resonance
- `svfHP` - high pass, resonance
- `svfBP` - band pass, resonance
- `svfNotch` - notch / band-stop, resonance/bandwidth
- `svfPeak` - peak EQ, customizable +/- gain, bandwidth
- `svfAllpass` - allpass, bandwidth

(Q = 0.5 for all versions)

![LPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-lpf.png)

![HPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-hpf.png)

![BPF response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-bpf.png)

![Notch response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-notch.png)

![Peak response (gain = -6dB)](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-peak.png)

![Allpass response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-svf-all.png)

#### Delay

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/delay.ts)

Ringbuffer / delay line for arbitrary values and support for single &
multi-taps at any relative positions. Useful fundamental building block
for various other effects, filters etc.

#### Feedback delay

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/feedback-delay.ts)

Variation of `delay()` which adds a portion of the delayed value to each
new input and stores result in delay line.

#### Wave shaping

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/waveshaper.ts)

This operator remaps inputs via a user provided function. The following shaping functions are provided:

- `waveshapeTan` - arctan based (soft-clip/distortion)
- `waveshapeSigmoid` - sigmoid based, similar to above
- `waveshapeSin` - depending on coefficient, can produce entirely new waveforms

Use the [interactive calculator @
Desmos](https://www.desmos.com/calculator/hg4i7o836i) to experiment.

![Tan response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-tan.png)

![Sigmoid response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-sigmoid.png)

![Sine response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-wshape-sin.png)

#### Foldback distortion

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/proc/waveshaper.ts)

Recursively folds input into `[-thresh .. +thresh]` interval and amplifies it with `amp` (default: 1/thresh).

Use the [interactive calculator @
Desmos](https://www.desmos.com/calculator/lkyf2ag3ta) to experiment.

![Foldback response](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/dsf-foldback.png)

### FFT

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/fft/fft.ts)

- `fft()`
- `ifft()`
- `normalizeFFT()`
- `denormalizeFFT()`
- `scaleFFT()`
- `complexArray()`
- `conjugate()`
- `spectrumMag()`
- `spectrumPow()` (optionally as dBFS)
- `spectrumPhase()`
- `binFreq()`
- `freqBin()`
- `fftFreq()`

#### Window functions

[Source](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/fft/window.ts)

- `window()`
- `windowRect()`
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

- [Unit conversions](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/util/convert.ts)
- [Filter response](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/util/filter-response.ts)

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
