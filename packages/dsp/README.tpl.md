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

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

### IGen

- [add](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/add.ts) - adder
- [alt](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/alt.ts) - alternating values
- [constant](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/const.ts) - constant value
- [cosP](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/cosp.ts) - trig-free cosine osc
- [exp](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/mul.ts) - time-based exponential gain/decay (factory for `mul`)
- [impulse](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/impulse.ts) - impulse gen
- [line](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/add.ts) - line gen (factory for `add`)
- [madd](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/madd.ts) - multiply-adder
- [mul](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/mul.ts) - multiplier (exponential gain/decay)
- [reciprocal](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/reciprocal.ts) - fractional sequence (1, 1/2, 1/3, 1/4 etc.)
- [trigger](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/trigger.ts) - cyclic impulse

#### Higher order generators

- [comp](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/comp.ts) - `IGen` composition (1-4 inputs)
- [addG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/addg.ts) - higher-order adder
- [product](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/product.ts) - product of input gens
- [sum](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/sum.ts) - sum of input gens
- [wrapAroundG](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/wrap-around.ts) - folds input gen into given interval

#### Oscillators

- [osc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/osc.ts) - arbitrary function oscillator
- [modOsc](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/src/gen/osc.ts) - FM / FMAM oscillator

##### Stateless & band-unlimited:

- `comb()`
- `mix()` (HOF)
- `rect()`
- `saw()`
- `sin()`
- `tri()`
- `wavetable()` (HOF)

Band-limited:

- `additive()` (HOF)
- `squareAdditive()`
- `sawAdditive()`

#### LFO

Trigonometry free sin/cos oscillator / iterator based on a
state-variable filter. Only useable for freq < ~2Hz.

- [lfo](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/lfo.ts)

### Filters

The following diagrams show various combinations of oscillator signals
and their filtered responses (with different cutoff/center frequencies).
The red waveform is the original generated 1kHz signal.

All diagrams were generated with [this
script](https://github.com/thi-ng/umbrella/blob/develop/packages/dsp/tools/generate-diagrams.ts).

TODO

#### 1-pole low pass

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/sin-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/tri-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/comb-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/saw-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/rect-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/trigger-lpf.png)

#### Frequency modulated osc & 1-pole low pass

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmod-comb-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmod-rect-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmod-saw-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmod-sin-lpf-1pole.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/fmod-tri-lpf-1pole.png)

#### 1-pole all-pass

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/sin-allpass1.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/tri-allpass1.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/comb-allpass1.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/saw-allpass1.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/rect-allpass1.png)

#### 2-pole all-pass

The bandwidth of each filter is set to 1/2 of its center frequency.

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/sin-allpass2.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/tri-allpass2.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/comb-allpass2.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/saw-allpass2.png)

![waveform](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/dsp/rect-allpass2.png)

### DelayLine

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/delay.ts)

Ringbuffer / delay line for arbitrary values and support for tapping at
any relative position.

- `DelayLine` class

### FFT

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/fft.ts)

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

### Window functions

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/window.ts)

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

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
