<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}.

Themes can be obtained as arrays of CSS hex colors (strings), normalized LCH or sRGB color vectors (e.g. for WebGL/WebGPU purposes). See [thi.ng/color readme](https://github.com/thi-ng/umbrella/tree/develop/packages/color) for details.

Additionally, the themes/palettes can be iterated, filtered or queried via arbitrary predicate functions and the ones provided:

Iterators:

- [`cssThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/cssThemes.html)
- [`lchThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/lchThemes.html)
- [`rgbThemes()`](https://docs.thi.ng/umbrella/color-palettes/functions/rgbThemes.html)

Provided (composable) filters:

- [`chroma()`](https://docs.thi.ng/umbrella/color-palettes/functions/chroma.html)
- [`hue()`](https://docs.thi.ng/umbrella/color-palettes/functions/hue.html)
- [`luma()`](https://docs.thi.ng/umbrella/color-palettes/functions/luma.html)
- [`proximityLCH()`](https://docs.thi.ng/umbrella/color-palettes/functions/promixityLCH.html)
- [`proximityRGB()`](https://docs.thi.ng/umbrella/color-palettes/functions/promixityRGB.html)

Custom filters can be defines via:

- [`defFilter()`](https://docs.thi.ng/umbrella/color-palettes/functions/defFilter.html)
- [`compFilter()`](https://docs.thi.ng/umbrella/color-palettes/functions/compFilter.html)

See [code examples](#usage) further below...

## Recent additions

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0208.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0207.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0206.svg) |
| 208                                                                                           | 207                                                                                           | 206                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0205.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0204.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0203.svg) |
| 205                                                                                           | 204                                                                                           | 203                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0202.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0201.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0200.svg) |
| 202                                                                                           | 201                                                                                           | 200                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0199.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0198.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0197.svg) |
| 199                                                                                           | 198                                                                                           | 197                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0196.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0195.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0194.svg) |
| 196                                                                                           | 195                                                                                           | 194                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0193.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0192.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0191.svg) |
| 193                                                                                           | 192                                                                                           | 191                                                                                           |

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
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0149.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0177.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0160.svg) |
| 149                                                                                           | 177                                                                                           | 160                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0142.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0208.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0024.svg) |
| 142                                                                                           | 208                                                                                           | 24                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0140.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0010.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0147.svg) |
| 140                                                                                           | 10                                                                                            | 147                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0008.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0146.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0164.svg) |
| 8                                                                                             | 146                                                                                           | 164                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0191.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0131.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0100.svg) |
| 191                                                                                           | 131                                                                                           | 100                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0022.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0102.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0053.svg) |
| 22                                                                                            | 102                                                                                           | 53                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0016.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0044.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0025.svg) |
| 16                                                                                            | 44                                                                                            | 25                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0098.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0202.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0104.svg) |
| 98                                                                                            | 202                                                                                           | 104                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0105.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0011.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0153.svg) |
| 105                                                                                           | 11                                                                                            | 153                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0173.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0179.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0026.svg) |
| 173                                                                                           | 179                                                                                           | 26                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0163.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0040.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0042.svg) |
| 163                                                                                           | 40                                                                                            | 42                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0088.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0036.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0110.svg) |
| 88                                                                                            | 36                                                                                            | 110                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0181.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0074.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0038.svg) |
| 181                                                                                           | 74                                                                                            | 38                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0070.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0029.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0076.svg) |
| 70                                                                                            | 29                                                                                            | 76                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0182.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0144.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0130.svg) |
| 182                                                                                           | 144                                                                                           | 130                                                                                           |
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
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0064.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0066.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0174.svg) |
| 64                                                                                            | 66                                                                                            | 174                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0196.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0058.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0114.svg) |
| 196                                                                                           | 58                                                                                            | 114                                                                                           |

### Medium

| Palettes                                                                                      |                                                                                               |                                                                                               |
|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0043.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0124.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0017.svg) |
| 43                                                                                            | 124                                                                                           | 17                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0204.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0122.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0143.svg) |
| 204                                                                                           | 122                                                                                           | 143                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0203.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0135.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0205.svg) |
| 203                                                                                           | 135                                                                                           | 205                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0207.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0178.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0081.svg) |
| 207                                                                                           | 178                                                                                           | 81                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0162.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0206.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0128.svg) |
| 162                                                                                           | 206                                                                                           | 128                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0171.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0141.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0099.svg) |
| 171                                                                                           | 141                                                                                           | 99                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0127.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0068.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0120.svg) |
| 127                                                                                           | 68                                                                                            | 120                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0195.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0023.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0085.svg) |
| 195                                                                                           | 23                                                                                            | 85                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0067.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0157.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0035.svg) |
| 67                                                                                            | 157                                                                                           | 35                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0138.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0186.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0047.svg) |
| 138                                                                                           | 186                                                                                           | 47                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0158.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0134.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0069.svg) |
| 158                                                                                           | 134                                                                                           | 69                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0121.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0193.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0048.svg) |
| 121                                                                                           | 193                                                                                           | 48                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0156.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0090.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0125.svg) |
| 156                                                                                           | 90                                                                                            | 125                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0199.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0084.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0169.svg) |
| 199                                                                                           | 84                                                                                            | 169                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0001.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0132.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0097.svg) |
| 1                                                                                             | 132                                                                                           | 97                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0072.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0060.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0061.svg) |
| 72                                                                                            | 60                                                                                            | 61                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0000.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0080.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0003.svg) |
| 0                                                                                             | 80                                                                                            | 3                                                                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0057.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0075.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0078.svg) |
| 57                                                                                            | 75                                                                                            | 78                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0087.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0077.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0063.svg) |
| 87                                                                                            | 77                                                                                            | 63                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0055.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0028.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0039.svg) |
| 55                                                                                            | 28                                                                                            | 39                                                                                            |

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
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0136.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0189.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0089.svg) |
| 136                                                                                           | 189                                                                                           | 89                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0123.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0168.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0108.svg) |
| 123                                                                                           | 168                                                                                           | 108                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0082.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0111.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0119.svg) |
| 82                                                                                            | 111                                                                                           | 119                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0129.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0115.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0172.svg) |
| 129                                                                                           | 115                                                                                           | 172                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0175.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0020.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0013.svg) |
| 175                                                                                           | 20                                                                                            | 13                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0117.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0065.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0027.svg) |
| 117                                                                                           | 65                                                                                            | 27                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0137.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0046.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0107.svg) |
| 137                                                                                           | 46                                                                                            | 107                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0183.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0197.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0188.svg) |
| 183                                                                                           | 197                                                                                           | 188                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0031.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0185.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0062.svg) |
| 31                                                                                            | 185                                                                                           | 62                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0092.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0018.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0126.svg) |
| 92                                                                                            | 18                                                                                            | 126                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0095.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0073.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0004.svg) |
| 95                                                                                            | 73                                                                                            | 4                                                                                             |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0180.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0056.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0155.svg) |
| 180                                                                                           | 56                                                                                            | 155                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0093.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0094.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0187.svg) |
| 93                                                                                            | 94                                                                                            | 187                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0113.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0201.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0032.svg) |
| 113                                                                                           | 201                                                                                           | 32                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0054.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0079.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0091.svg) |
| 54                                                                                            | 79                                                                                            | 91                                                                                            |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0037.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0052.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0166.svg) |
| 37                                                                                            | 52                                                                                            | 166                                                                                           |
| ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0167.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0112.svg) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/color-palettes/0014.svg) |
| 167                                                                                           | 112                                                                                           | 14                                                                                            |

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## Available palettes

### Usage

```ts
import { asCSS, asRGB } from "@thi.ng/color-palettes";

// get theme for ID
asCSS(7);
// ["#2f1864", "#e40302", "#f25c22", "#d987bd", "#44b6e7", "#e3dadd"]

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
[
  [ '#411c20', '#b71022', '#f63a3a', '#c1c3d1', '#8a858e', '#5c555d' ],
  [ '#f0181f', '#b51c1c', '#b4a8a2', '#dcd4db', '#75787a', '#3c373b' ],
  [ '#252426', '#ad0401', '#e90408', '#fc9518', '#62c3d9', '#b6e7f2' ],
  [ '#4e0101', '#850503', '#bb2609', '#e54908', '#f87c23', '#fdc170' ]
]
```

Also see the [swatch
generator](https://github.com/thi-ng/umbrella/blob/develop/packages/color-palettes/tools/swatches.ts)
as another usage example...

<!-- include ../../assets/tpl/footer.md -->
