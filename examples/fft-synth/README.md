# fft-synth

![screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/fft-synth.png)

[Live demo](http://demo.thi.ng/umbrella/fft-synth/)

Basic inverse FFT synth with randomized auto sequencer to trigger
frequency bins and delay line with pitch shift.

The "sequencer" (click the "Auto mode" button to enable) uses a weighted
random function to prioritize lower frequency bins. You can change the
weighting function in
[automode.ts](https://github.com/thi-ng/umbrella/blob/develop/examples/fft-synth/src/automode.ts).The
delay line doesn't store samples, but entire spectrums. Delay period is
currently hard coded to 80 frames (see
[audio.ts](https://github.com/thi-ng/umbrella/blob/develop/examples/fft-synth/src/audio.ts)).

Some explanations for various parameters / controls:

- **Decay** - bin gain decay factor. Lower values result in shorter sounds.
- **Attenuation** - exponential gain decay for higher frequency bins.
  Higher values will make higher frequency bins decay faster.
- **Feedback** - feedback amount of previous spectrums (read from delay
  buffer) mixed with current spectrum. Each time a spectrum is read from
  the delay line it's shifted upwards by one bin, resulting in a subtle
  pitch shift effect.

Videos (with audio):

- https://twitter.com/thing_umbrella/status/1212822862970654720
- https://twitter.com/thing_umbrella/status/1212595113324625920
- https://twitter.com/thing_umbrella/status/1212529111077412865

If you come up with interesting combinations, please send a screenshot
and I might add some presets.

Please refer to the [example build
instructions](https://github.com/thi-ng/umbrella/wiki/Example-build-instructions)
on the wiki.

## Authors

- Karsten Schmidt

## License

&copy; 2020 Karsten Schmidt // Apache Software License 2.0
