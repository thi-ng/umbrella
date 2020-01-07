<!-- This file is generated - DO NOT EDIT! -->

# @thi.ng/dsp

[![npm version](https://img.shields.io/npm/v/@thi.ng/dsp.svg)](https://www.npmjs.com/package/@thi.ng/dsp)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/dsp.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Oscillators](#oscillators)
  - [LFO](#lfo)
  - [DelayLine](#delayline)
  - [FFT](#fft)
  - [Window functions](#window-functions)
- [Authors](#authors)
- [License](#license)

## About

Assorted oscillators / wave gens, FFT, windowing functions & DSP utils.

Partially ported from other thi.ng projects (e.g.
[thi.ng/synstack](https://github.com/thi-ng/synstack),
[thi.ng/vexed-generation](http://thi.ng/vexed-generation),
[toxiclibs](http://toxiclibs.org)).

### Status

**STABLE** - used in production

## Installation

```bash
yarn add @thi.ng/dsp
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/master/examples)
directory are using this package.

A selection:

### fft-synth <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/fft-synth.png)

Interactive inverse FFT toy synth

[Live demo](https://demo.thi.ng/umbrella/fft-synth/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/fft-synth)

### poly-spline <!-- NOTOC -->

[Live demo](https://demo.thi.ng/umbrella/poly-spline/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/poly-spline)

### webgl-ssao <!-- NOTOC -->

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/master/assets/examples/webgl-ssao.jpg)

[Live demo](https://demo.thi.ng/umbrella/webgl-ssao/) | [Source](https://github.com/thi-ng/umbrella/tree/master/examples/webgl-ssao)

## API

[Generated API docs](https://docs.thi.ng/umbrella/dsp/)

See comments in source and examples (especially FFT synth one) for usage details.

### Oscillators

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/osc.ts)

Stateless & band-unlimited:

- `sin()`
- `tri()`
- `triConcave()`
- `rect()`
- `saw()`
- `wavetable()` (HOF)
- `mix()` (HOF)

Band-limited:

- `additive()` (HOF)
- `squareAdditive()`
- `sawAdditive()`

Stateful (classes):

- `Oscillator`
- `AMFMOscillator`

### LFO

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/lfo.ts)

Trigonometry free sin/cos oscillator / iterator based on a
state-variable filter. Only useable for freq < ~2Hz.

- `lfo()`

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

Karsten Schmidt

## License

&copy; 2015 - 2020 Karsten Schmidt // Apache Software License 2.0
