export interface WavSpec {
    sampleRate: number;
    channels: number;
    length: number;
    bits: 8 | 16 | 24 | 32;
}
