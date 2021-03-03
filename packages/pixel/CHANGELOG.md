# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.7.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.7.2...@thi.ng/pixel@0.7.3) (2021-03-03)

**Note:** Version bump only for package @thi.ng/pixel





## [0.7.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.7.1...@thi.ng/pixel@0.7.2) (2021-03-03)

**Note:** Version bump only for package @thi.ng/pixel





## [0.7.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.7.0...@thi.ng/pixel@0.7.1) (2021-03-03)

**Note:** Version bump only for package @thi.ng/pixel





# [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.6.1...@thi.ng/pixel@0.7.0) (2021-03-03)


### Bug Fixes

* **pixel:** add clamping for float->ABGR conversion ([41540e0](https://github.com/thi-ng/umbrella/commit/41540e085b2261208e44e6f25b327e3371eae2df))
* **pixel:** fix POOL_NEAREST index ([b98d05d](https://github.com/thi-ng/umbrella/commit/b98d05d7827d98d3971bdbcd562735b96fa9b7ec))


### Features

* **pixel:** add 5x5 kernel presets ([56f96f4](https://github.com/thi-ng/umbrella/commit/56f96f4842e6a57087a565a8e5ce82e590da7d66))
* **pixel:** add convolve() & preset kernels ([6a31dc3](https://github.com/thi-ng/umbrella/commit/6a31dc38f3f0ae48853d899420d0fbebcc6b8678))
* **pixel:** add defKernel() kernel fn codegen ([25b97a3](https://github.com/thi-ng/umbrella/commit/25b97a341fa54ee8a82e3083fcb85a8061db8b1f))
* **pixel:** add defLargeKernel(), conv presets ([9c71165](https://github.com/thi-ng/umbrella/commit/9c71165adb71103fa88a5486987f270fecd2f439))
* **pixel:** add gradientImage() & FLOAT_NORMAL format ([78683b7](https://github.com/thi-ng/umbrella/commit/78683b701418bf184b2a1327cfd5e50397d687e0))
* **pixel:** add IEmpty impls for Float/PackedBuffer ([46ac1a1](https://github.com/thi-ng/umbrella/commit/46ac1a1906b256eefab0934efea300c67db7ea28))
* **pixel:** add normalMap(), add more kernels ([f32686d](https://github.com/thi-ng/umbrella/commit/f32686d463ffcb49b37e9b1b811ff5de06b58fed))
* **pixel:** add POOL_THRESHOLD preset ([5f1c1de](https://github.com/thi-ng/umbrella/commit/5f1c1dea87251f8a584cbe94d83784e7e4cc31a5))
* **pixel:** add step size support for normalMap() ([ab72a79](https://github.com/thi-ng/umbrella/commit/ab72a79532baab3f07f53419cb5970e90e97e0dd))
* **pixel:** add/update buffer factory fns ([ba38e13](https://github.com/thi-ng/umbrella/commit/ba38e137c6913d048bb4d678137241ee179d160c))
* **pixel:** update PackedBuffer.fromCanvas() ([3bdb086](https://github.com/thi-ng/umbrella/commit/3bdb0860bcd35a0475e83ebe948847f1ecd42db6))
* **pixel:** update/extend/refactor convolveChannel/Image() ([6692865](https://github.com/thi-ng/umbrella/commit/6692865d5facb75bf667056afa9cfee93ade2da6))





## [0.6.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.6.0...@thi.ng/pixel@0.6.1) (2021-02-20)

**Note:** Version bump only for package @thi.ng/pixel





# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.5.1...@thi.ng/pixel@0.6.0) (2021-01-13)


### Features

* **pixel:** add downsample() for both buffer types ([0b9b0fa](https://github.com/thi-ng/umbrella/commit/0b9b0fad5ce7edcfaf50be767a73f8cc3fe7ebfe))





# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.4.10...@thi.ng/pixel@0.5.0) (2021-01-02)


### Features

* **pixel:** add FLOAT_HSVA format, update FloatFormatSpec ([118c4ed](https://github.com/thi-ng/umbrella/commit/118c4edbacd75249262f26962153f614148cedec))
* **pixel:** add FloatBuffer.fromPacked() ([abd1ca8](https://github.com/thi-ng/umbrella/commit/abd1ca80d455999dd8c3af87d24b4f1905d7806d))





# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.3.6...@thi.ng/pixel@0.4.0) (2020-07-22)


### Features

* **pixel:** add flipY() ([a5593c0](https://github.com/thi-ng/umbrella/commit/a5593c06a6ae61eccb9ecbaa4b3828ce0b29fbc0))





# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.2.0...@thi.ng/pixel@0.3.0) (2020-05-29)


### Features

* **pixel:** add dither support for int buffers/formats ([4475fc1](https://github.com/thi-ng/umbrella/commit/4475fc14c65029e88a7216519350527fa3d2c3dc))
* **pixel:** add FloatBuffer and float format support ([d6c490f](https://github.com/thi-ng/umbrella/commit/d6c490fb22b3d43f188f85662bb431f59daa7f32))
* **pixel:** add/update float formats, tests ([6eb1f67](https://github.com/thi-ng/umbrella/commit/6eb1f671858c234e53f231ad8af0f07f2a423d96))





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.1.20...@thi.ng/pixel@0.2.0) (2020-05-19)


### Features

* **pixel:** add .copy(), update .blitCanvas() ([f4b2c3e](https://github.com/thi-ng/umbrella/commit/f4b2c3e374b45bd26396e436f3e71e9d3afbc131))
* **pixel:** update canvas2d(), imageCanvas() ([65929a2](https://github.com/thi-ng/umbrella/commit/65929a2ee6be9915e14bf69389520739073af5ee))





## [0.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/pixel@0.1.3...@thi.ng/pixel@0.1.4) (2019-09-21)

### Bug Fixes

* **pixel:** clamp values in PackedChannel.setFloat() ([ce78467](https://github.com/thi-ng/umbrella/commit/ce78467))

# 0.1.0 (2019-07-31)

### Bug Fixes

* **pixel:** byte order fixes, extract luminance fns ([b3c79e3](https://github.com/thi-ng/umbrella/commit/b3c79e3))
* **pixel:** fast-route check in setChannel() ([b59069a](https://github.com/thi-ng/umbrella/commit/b59069a))
* **pixel:** update 16bit formats & handling in getChannel ([aa15179](https://github.com/thi-ng/umbrella/commit/aa15179))
* **pixel:** update clampRegion(), adjust src pos if dest is outside ([bb6ba47](https://github.com/thi-ng/umbrella/commit/bb6ba47))
* **pixel:** update prepRegions() ([ad8d2d7](https://github.com/thi-ng/umbrella/commit/ad8d2d7))

### Features

* **pixel:** ([#106](https://github.com/thi-ng/umbrella/issues/106)) add IBlend interface/impls, refactor IBlit ([e068f46](https://github.com/thi-ng/umbrella/commit/e068f46))
* **pixel:** ([#106](https://github.com/thi-ng/umbrella/issues/106)) add Uint16Buffer, update IColorChannel, add Channel.GRAY ([3088646](https://github.com/thi-ng/umbrella/commit/3088646))
* **pixel:** add 16bit formats, add docs, update readme ([5d72c37](https://github.com/thi-ng/umbrella/commit/5d72c37))
* **pixel:** add buffer() syntax sugar, PackedBuffer.forEach ([bc17ac9](https://github.com/thi-ng/umbrella/commit/bc17ac9))
* **pixel:** add channel float accessors, update PackedChannel ([b4168f8](https://github.com/thi-ng/umbrella/commit/b4168f8))
* **pixel:** add invert, add/split interfaces, refactor blit fns ([22a456a](https://github.com/thi-ng/umbrella/commit/22a456a))
* **pixel:** add PackedBuffer.fromCanvas(), update readme ([ac283ee](https://github.com/thi-ng/umbrella/commit/ac283ee))
* **pixel:** add pre/postmultiply & isPremultiplied checks ([969d6b8](https://github.com/thi-ng/umbrella/commit/969d6b8))
* **pixel:** complete rewrite/simplify/extend using format descriptors ([cde7bf9](https://github.com/thi-ng/umbrella/commit/cde7bf9))
* **pixel:** initial import pixel buffer pkg ([1836ea7](https://github.com/thi-ng/umbrella/commit/1836ea7))
* **pixel:** updat setChannel, add ALPHA8, update readme ([899f1a3](https://github.com/thi-ng/umbrella/commit/899f1a3))
* **pixel:** update canvasPixels() ([5ea200d](https://github.com/thi-ng/umbrella/commit/5ea200d))
