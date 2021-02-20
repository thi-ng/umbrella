# ramp-synth

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/ramp-synth.png)

[Live demo](http://demo.thi.ng/umbrella/ramp-synth/)

## Usage

Click and drag in the
[ramp](https://github.com/thi-ng/umbrella/tree/develop/packages/ramp)
visualization to add & move new markers. Drag markers below the
visualization to move their position. Markers cannot be moved past their
neighbors.

Audio must be explicitly enabled by pressing `a`. Sonification uses the
current ramp as wave table for a 6-voice unison stereo oscillator w/ 60
Hz base frequency (configurable via `BASE_FREQ` in `api.ts`).

### Hotkeys

- `1` - `5`: load preset ramp (#5 only available after creating new
  preset via `s`)
- `a` - toggle audio on/off
- `l` - toggle linear/hermite interpolation
- `r` - randomize ramp
- `s` - store current ramp as preset #5
- `t` - auto-toggle interpolation mode (fixed @ 0.5 Hz)
- `u` - uniform spacing
- `x` - remove marker/stop under mouse cursor

## Building

Please refer to the [example build instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions) on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2019 Karsten Schmidt // Apache Software License 2.0
