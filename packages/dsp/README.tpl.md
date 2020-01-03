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
[thi.ng/synstack](https://github.com/thi-ng/synstack)). Currently only
features various [stateless & stateful wave generators /
oscillators](https://github.com/thi-ng/umbrella/tree/master/packages/dsp/src/osc.ts),
which have been ported from
[thi.ng/vexed-generation](http://thi.ng/vexed-generation).

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

### Oscillators

[Source](https://github.com/thi-ng/umbrella/blob/master/packages/dsp/src/osc.ts)

Stateless & not band-limited:

- sin()
- tri()
- triConcave()
- rect()
- saw()
- wavetable()
- mix()
- additive() (bandlimited)
- squareAdditive()
- sawAdditive()

Stateful:

- Oscillator
- AMFMOscillator

### LFO

Trigonometry free sin/cos oscillator / iterator based on a state-variable filter. Only useable for freq < ~2Hz.

- lfo()

### DelayLine

Ringbuffer / delay line for arbitrary values and support for tapping at any relative position.

- DelayLine

### FFT

- fft()
- ifft()
- normalizeFFT()
- denormalizeFFT()
- scaleFFT()
- conjugate()
- spectrumMag()
- spectrumPow() (optionally as dBFS)
- spectrumPhase()
- binFreq()
- freqBin()
- fftFreq()

### Window functions

- window()
- windowRect()
- windowSin()
- windowSinPow()
- windowLanczos()
- windowHann()
- windowHamming()
- windowBlackman()
- windowBlackmanHarris()
- windowNuttal()
- windowBlackmanNuttal()
- windowGauss()

## Authors

${authors}

## License

&copy; ${copyright} // ${license}
