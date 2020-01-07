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

${authors}

## License

&copy; ${copyright} // ${license}
