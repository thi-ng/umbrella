<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/color-palettes](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-color-palettes.svg?0f451941)

[![npm version](https://img.shields.io/npm/v/@thi.ng/color-palettes.svg)](https://www.npmjs.com/package/@thi.ng/color-palettes)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/color-palettes.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 211 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
- [Recent additions](#recent-additions)
- [All themes](#all-themes)
  - [Strong](#strong)
  - [Medium](#medium)
  - [Soft](#soft)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
  - [Usage](#usage)
- [Authors](#authors)
- [License](#license)

## About

Collection of 200+ image based color themes & composable theme query filters. This is a support package for [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)..

Themes can be obtained as arrays of CSS hex colors (strings), packed ARGB ints,
or normalized LCH/sRGB color vectors (e.g. for WebGL/WebGPU purposes). See
[thi.ng/color
readme](https://github.com/thi-ng/umbrella/tree/develop/packages/color) for
details.

Additionally, the themes/palettes can be iterated, filtered or queried via
arbitrary predicate functions and the ones provided:

Single theme accessors:

- [`asCSS()`](https://docs.thi.ng/umbrella/color-palettes/functions/asCSS.html)
- [`asInt()`](https://docs.thi.ng/umbrella/color-palettes/functions/asInt.html)
- [`asLCH()`](https://docs.thi.ng/umbrella/color-palettes/functions/asLCH.html)
- [`asRGB()`](https://docs.thi.ng/umbrella/color-palettes/functions/asRGB.html)

Iterators:

- [`cssThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/cssThemes.html)
- [`intThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/intThemes.html)
- [`lchThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/lchThemes.html)
- [`rgbThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/rgbThemes.html)

Provided (composable) filters:

- [`chroma()`](https://docs.thi.ng/umbrella/color-palettes/functions/chroma.html)
- [`hue()`](https://docs.thi.ng/umbrella/color-palettes/functions/hue.html)
- [`luma()`](https://docs.thi.ng/umbrella/color-palettes/functions/luma.html)
- [`proximityLCH()`](https://docs.thi.ng/umbrella/color-palettes/functions/proximityLCH.html)
- [`proximityRGB()`](https://docs.thi.ng/umbrella/color-palettes/functions/proximityRGB.html)

Custom filters can be defines via:

- [`defFilter()`](https://docs.thi.ng/umbrella/color-palettes/functions/defFilter.html)
- [`compFilter()`](https://docs.thi.ng/umbrella/color-palettes/functions/compFilter.html)

See [code examples](#usage) further below...

## Recent additions

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0254.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0253.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0252.svg) |
| 254                                                                                           | 253                                                                                           | 252                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0251.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0250.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0249.svg) |
| 251                                                                                           | 250                                                                                           | 249                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0248.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0247.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0246.svg) |
| 248                                                                                           | 247                                                                                           | 246                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0245.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0244.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0243.svg) |
| 245                                                                                           | 244                                                                                           | 243                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0242.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0241.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0240.svg) |
| 242                                                                                           | 241                                                                                           | 240                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0239.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0238.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0237.svg) |
| 239                                                                                           | 238                                                                                           | 237                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0236.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0235.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0234.svg) |
| 236                                                                                           | 235                                                                                           | 234                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0233.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0232.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0231.svg) |
| 233                                                                                           | 232                                                                                           | 231                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0230.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0229.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0228.svg) |
| 230                                                                                           | 229                                                                                           | 228                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0227.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0226.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0225.svg) |
| 227                                                                                           | 226                                                                                           | 225                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0224.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0223.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0222.svg) |
| 224                                                                                           | 223                                                                                           | 222                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0221.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0220.svg) |                                                                                               |
| 221                                                                                           | 220                                                                                           |                                                                                               |

## All themes

Below all color palettes are shown **sorted by median LCH chromacity**:

(Please note that for some reason (color profile related) Google Chrome shows
the more saturated colors much more muted than they actually are/should be.

### Strong

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0148.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0170.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0154.svg) |
| 148                                                                                           | 170                                                                                           | 154                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0007.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0161.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0034.svg) |
| 7                                                                                             | 161                                                                                           | 34                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0149.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0220.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0177.svg) |
| 149                                                                                           | 220                                                                                           | 177                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0160.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0251.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0247.svg) |
| 160                                                                                           | 251                                                                                           | 247                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0142.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0249.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0208.svg) |
| 142                                                                                           | 249                                                                                           | 208                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0240.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0230.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0024.svg) |
| 240                                                                                           | 230                                                                                           | 24                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0140.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0010.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0147.svg) |
| 140                                                                                           | 10                                                                                            | 147                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0008.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0221.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0246.svg) |
| 8                                                                                             | 221                                                                                           | 246                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0239.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0146.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0164.svg) |
| 239                                                                                           | 146                                                                                           | 164                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0210.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0191.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0234.svg) |
| 210                                                                                           | 191                                                                                           | 234                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0131.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0100.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0222.svg) |
| 131                                                                                           | 100                                                                                           | 222                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0022.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0102.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0245.svg) |
| 22                                                                                            | 102                                                                                           | 245                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0053.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0016.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0235.svg) |
| 53                                                                                            | 16                                                                                            | 235                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0044.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0025.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0098.svg) |
| 44                                                                                            | 25                                                                                            | 98                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0202.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0104.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0105.svg) |
| 202                                                                                           | 104                                                                                           | 105                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0011.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0153.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0224.svg) |
| 11                                                                                            | 153                                                                                           | 224                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0173.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0179.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0026.svg) |
| 173                                                                                           | 179                                                                                           | 26                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0163.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0040.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0216.svg) |
| 163                                                                                           | 40                                                                                            | 216                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0042.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0088.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0036.svg) |
| 42                                                                                            | 88                                                                                            | 36                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0110.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0181.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0074.svg) |
| 110                                                                                           | 181                                                                                           | 74                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0038.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0218.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0231.svg) |
| 38                                                                                            | 218                                                                                           | 231                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0070.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0029.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0076.svg) |
| 70                                                                                            | 29                                                                                            | 76                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0241.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0182.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0144.svg) |
| 241                                                                                           | 182                                                                                           | 144                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0229.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0225.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0130.svg) |
| 229                                                                                           | 225                                                                                           | 130                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0184.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0045.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0198.svg) |
| 184                                                                                           | 45                                                                                            | 198                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0103.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0150.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0015.svg) |
| 103                                                                                           | 150                                                                                           | 15                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0012.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0190.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0106.svg) |
| 12                                                                                            | 190                                                                                           | 106                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0101.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0006.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0133.svg) |
| 101                                                                                           | 6                                                                                             | 133                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0071.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0059.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0083.svg) |
| 71                                                                                            | 59                                                                                            | 83                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0192.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0109.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0051.svg) |
| 192                                                                                           | 109                                                                                           | 51                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0021.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0050.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0002.svg) |
| 21                                                                                            | 50                                                                                            | 2                                                                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0200.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0194.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0005.svg) |
| 200                                                                                           | 194                                                                                           | 5                                                                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0049.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0145.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0096.svg) |
| 49                                                                                            | 145                                                                                           | 96                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0064.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0248.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0066.svg) |
| 64                                                                                            | 248                                                                                           | 66                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0174.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0209.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0196.svg) |
| 174                                                                                           | 209                                                                                           | 196                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0211.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0228.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0058.svg) |
| 211                                                                                           | 228                                                                                           | 58                                                                                            |

### Medium

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0242.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0043.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0124.svg) |
| 242                                                                                           | 43                                                                                            | 124                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0017.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0252.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0204.svg) |
| 17                                                                                            | 252                                                                                           | 204                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0122.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0143.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0203.svg) |
| 122                                                                                           | 143                                                                                           | 203                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0135.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0205.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0227.svg) |
| 135                                                                                           | 205                                                                                           | 227                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0207.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0217.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0178.svg) |
| 207                                                                                           | 217                                                                                           | 178                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0081.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0244.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0226.svg) |
| 81                                                                                            | 244                                                                                           | 226                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0162.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0206.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0238.svg) |
| 162                                                                                           | 206                                                                                           | 238                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0128.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0171.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0219.svg) |
| 128                                                                                           | 171                                                                                           | 219                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0254.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0141.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0099.svg) |
| 254                                                                                           | 141                                                                                           | 99                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0127.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0068.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0120.svg) |
| 127                                                                                           | 68                                                                                            | 120                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0195.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0023.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0085.svg) |
| 195                                                                                           | 23                                                                                            | 85                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0215.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0067.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0157.svg) |
| 215                                                                                           | 67                                                                                            | 157                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0035.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0138.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0186.svg) |
| 35                                                                                            | 138                                                                                           | 186                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0233.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0047.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0158.svg) |
| 233                                                                                           | 47                                                                                            | 158                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0134.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0069.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0121.svg) |
| 134                                                                                           | 69                                                                                            | 121                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0193.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0048.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0156.svg) |
| 193                                                                                           | 48                                                                                            | 156                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0090.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0125.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0199.svg) |
| 90                                                                                            | 125                                                                                           | 199                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0084.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0169.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0236.svg) |
| 84                                                                                            | 169                                                                                           | 236                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0001.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0253.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0132.svg) |
| 1                                                                                             | 253                                                                                           | 132                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0212.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0097.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0237.svg) |
| 212                                                                                           | 97                                                                                            | 237                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0072.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0060.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0250.svg) |
| 72                                                                                            | 60                                                                                            | 250                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0061.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0000.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0080.svg) |
| 61                                                                                            | 0                                                                                             | 80                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0003.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0057.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0075.svg) |
| 3                                                                                             | 57                                                                                            | 75                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0078.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0087.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0077.svg) |
| 78                                                                                            | 87                                                                                            | 77                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0063.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0055.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0028.svg) |
| 63                                                                                            | 55                                                                                            | 28                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0039.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0030.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0118.svg) |
| 39                                                                                            | 30                                                                                            | 118                                                                                           |

### Soft

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0033.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0151.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0116.svg) |
| 33                                                                                            | 151                                                                                           | 116                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0165.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0041.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0009.svg) |
| 165                                                                                           | 41                                                                                            | 9                                                                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0019.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0159.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0139.svg) |
| 19                                                                                            | 159                                                                                           | 139                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0152.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0176.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0086.svg) |
| 152                                                                                           | 176                                                                                           | 86                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0223.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0136.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0189.svg) |
| 223                                                                                           | 136                                                                                           | 189                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0089.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0123.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0168.svg) |
| 89                                                                                            | 123                                                                                           | 168                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0108.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0082.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0111.svg) |
| 108                                                                                           | 82                                                                                            | 111                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0119.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0129.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0115.svg) |
| 119                                                                                           | 129                                                                                           | 115                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0243.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0172.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0175.svg) |
| 243                                                                                           | 172                                                                                           | 175                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0020.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0213.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0013.svg) |
| 20                                                                                            | 213                                                                                           | 13                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0117.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0065.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0027.svg) |
| 117                                                                                           | 65                                                                                            | 27                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0137.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0046.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0107.svg) |
| 137                                                                                           | 46                                                                                            | 107                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0183.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0197.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0188.svg) |
| 183                                                                                           | 197                                                                                           | 188                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0031.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0185.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0062.svg) |
| 31                                                                                            | 185                                                                                           | 62                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0232.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0092.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0018.svg) |
| 232                                                                                           | 92                                                                                            | 18                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0126.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0095.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0214.svg) |
| 126                                                                                           | 95                                                                                            | 214                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0073.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0004.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0180.svg) |
| 73                                                                                            | 4                                                                                             | 180                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0056.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0155.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0093.svg) |
| 56                                                                                            | 155                                                                                           | 93                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0094.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0187.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0113.svg) |
| 94                                                                                            | 187                                                                                           | 113                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0201.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0032.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0054.svg) |
| 201                                                                                           | 32                                                                                            | 54                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0079.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0091.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0037.svg) |
| 79                                                                                            | 91                                                                                            | 37                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0052.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0166.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0167.svg) |
| 52                                                                                            | 166                                                                                           | 167                                                                                           |

## Installation

```bash
yarn add @thi.ng/color-palettes
```

ESM import:

```ts
import * as cp from "@thi.ng/color-palettes";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/color-palettes"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const cp = await import("@thi.ng/color-palettes");
```

Package sizes (brotli'd, pre-treeshake): ESM: 5.54 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/develop/packages/color)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/hex](https://github.com/thi-ng/umbrella/tree/develop/packages/hex)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

Four projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                                  | Description                                                       | Live demo                                                  | Source                                                                                  |
|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:-----------------------------------------------------------|:----------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-logo.jpg" width="240"/>        | (Re)Constructing the thi.ng logo using a 2D signed-distance field | [Demo](https://demo.thi.ng/umbrella/geom-sdf-logo/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-logo)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hiccup-canvas-basics.png" width="240"/> | Basic hiccup-based canvas drawing                                 | [Demo](https://demo.thi.ng/umbrella/hiccup-canvas-basics/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hiccup-canvas-basics) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-gradients.jpg" width="240"/>      | Randomized 4-point 2D color gradient image generator              | [Demo](https://demo.thi.ng/umbrella/pixel-gradients/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-gradients)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/>        | Image dithering and remapping using indexed palettes              | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed)        |

### Usage

```ts
import { asCSS, asRGB } from "@thi.ng/color-palettes";

// get theme for ID
asCSS(7);
// ["#2f1864", "#e40302", "#f25c22", "#d987bd", "#44b6e7", "#e3dadd"]

// get in reverse order
asCSS(7, true);
// ["#e3dadd", "#44b6e7", "#d987bd", "#f25c22", "#e40302", "#2f1864"]

asInt(7).map(x => x.toString(16));
// [ 'ff2f1864', 'ffe40302', 'fff25c22', 'ffd987bd', 'ff44b6e7', 'ffe3dadd']

// ...or as normalized sRGB colors (e.g. for WebGL)
asRGB(7)
// [
//   $Color [srgb] { buf: [ 0.1843137254901961, 0.09411764705882353, 0.39215686274509803, 1 ] },
//   $Color [srgb] { buf: [ 0.8941176470588236, 0.01176470588235294, 0.00784313725490196, 1 ] },
//   $Color [srgb] { buf: [ 0.9490196078431372, 0.3607843137254902, 0.13333333333333333, 1 ] },
//   $Color [srgb] { buf: [ 0.8509803921568627, 0.5294117647058824, 0.7411764705882353, 1 ] },
//   $Color [srgb] { buf: [ 0.26666666666666666, 0.7137254901960784, 0.9058823529411765, 1 ] },
//   $Color [srgb] { buf: [ 0.8901960784313725, 0.8549019607843137, 0.8666666666666667, 1 ] }
// ]

asLCH(7)
// [
//   $Color [lch] { buf: [ 0.15797892652137088, 0.49615468001539725, 0.842100407558194, 1 ] },
//   $Color [lch] { buf: [ 0.4867485453448416, 0.9761480104088418, 0.11297366790826968, 1 ] },
//   $Color [lch] { buf: [ 0.5945798809377795, 0.8338400414305036, 0.1303121912233266, 1 ] },
//   $Color [lch] { buf: [ 0.6643751725923083, 0.4049427929839432, 0.9415908177143242, 1 ] },
//   $Color [lch] { buf: [ 0.6922992189834556, 0.4061292095121689, 0.662063627151946, 1 ] },
//   $Color [lch] { buf: [ 0.8784094632887679, 0.035905272403327554, 0.9856917205639929, 1 ] }
// ]

// obtaining multiple themes (by ID)

[...cssThemes(100, 115, 125)]
// [
    //   [ '#72564a', '#a29aa2', '#129dab', '#f78915', '#e0a657', '#f3d1a9' ],
//   [ '#2f1a0f', '#d9662e', '#a87958', '#c0b5a9', '#e5e1e1', '#879293' ],
//   [ '#081d4f', '#0a3e83', '#5385a6', '#485966', '#aeab9e', '#ebe1c7' ]
// ]

[...rgbThemes(100, 115, 125)]
// [
//   [
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] },
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] },
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] },
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] },
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] },
//     $Color [srgb] { offset: 0, stride: 1, buf: [Array] }
//   ],
//   ...
// ]

// query themes with predicates

// pre-compose a combined query filter
const pastels = compFilter(
  // require all theme colors to have max 25% chroma
  chroma(0, 0.25),
  // require at least 3 theme colors to have min 50% luma
  luma(0.5, 1, 3)
);

[...cssThemes(pastels)]
// [
//   [ '#453f38', '#746b5d', '#b39777', '#c1c2b2', '#e3dccf', '#f1ede7' ],
//   [ '#857b84', '#b1a7b0', '#d0c7d0', '#e7e0e8', '#faeceb', '#e4e9fa' ]
// ]

// ..or directly provide one or more predicates directly

[...cssThemes(chroma(0, 0.25), luma(0.5, 1, 3))]
// [
//   [ '#453f38', '#746b5d', '#b39777', '#c1c2b2', '#e3dccf', '#f1ede7' ],
//   [ '#857b84', '#b1a7b0', '#d0c7d0', '#e7e0e8', '#faeceb', '#e4e9fa' ]
// ]

// select themes with at least 2 colors near given color (tolerance/distance = 0.33)
[...cssThemes(proximityRGB("#f00", 0.33, 2))]
// [
//   [ '#411c20', '#b71022', '#f63a3a', '#c1c3d1', '#8a858e', '#5c555d' ],
//   [ '#f0181f', '#b51c1c', '#b4a8a2', '#dcd4db', '#75787a', '#3c373b' ],
//   [ '#252426', '#ad0401', '#e90408', '#fc9518', '#62c3d9', '#b6e7f2' ],
//   [ '#4e0101', '#850503', '#bb2609', '#e54908', '#f87c23', '#fdc170' ]
// ]
```

Also see the [swatch
generator](https://github.com/thi-ng/umbrella/blob/develop/packages/color-palettes/tools/swatches.ts)
as another usage example...

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-color-palettes,
  title = "@thi.ng/color-palettes",
  author = "Karsten Schmidt",
  note = "https://thi.ng/color-palettes",
  year = 2021
}
```

## License

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
