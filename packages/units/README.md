<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/units](https://media.thi.ng/umbrella/banners-20230807/thing-units.svg?576826a0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/units.svg)](https://www.npmjs.com/package/@thi.ng/units)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/units.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Unit definitions](#unit-definitions)
  - [Predefined units](#predefined-units)
    - [Acceleration](#acceleration)
    - [Angle](#angle)
    - [Area](#area)
    - [Data](#data)
    - [Density](#density)
    - [Electric current](#electric-current)
    - [Energy](#energy)
    - [Force](#force)
    - [Frequency](#frequency)
    - [Length](#length)
    - [Luminous intensity](#luminous-intensity)
    - [Mass](#mass)
    - [Parts per notation](#parts-per-notation)
    - [Power](#power)
    - [Pressure](#pressure)
    - [Speed](#speed)
    - [Substance](#substance)
    - [Temperature](#temperature)
    - [Time](#time)
    - [Volume](#volume)
  - [Creating & deriving units](#creating--deriving-units)
    - [Using standard metric prefixes](#using-standard-metric-prefixes)
    - [Unit combinators](#unit-combinators)
  - [Unit conversions](#unit-conversions)
  - [Quantities](#quantities)
    - [Constants](#constants)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible SI unit creation, conversions, quantities & calculations (incl. ~170 predefined units & constants).

All unit definitions, quantities & conversions are based on the SI unit system &
concepts described here:

- https://en.wikipedia.org/wiki/International_System_of_Units
- https://en.wikipedia.org/wiki/SI_base_unit
- https://en.wikipedia.org/wiki/SI_derived_unit
- https://en.wikipedia.org/wiki/Coherence_(units_of_measurement)
- https://en.wikipedia.org/wiki/Metric_prefix

The overall conversion approach is inspired & partially based on:

- [Frink](https://frinklang.org/)
- [@g7s/unit](https://github.com/g7s/unit)

### Unit definitions

Each unit is defined via a 7-dimensional vector representing individual
exponents for each of the [SI base unit
dimensions](https://en.wikipedia.org/wiki/SI_base_unit), in order:

| id | SI dimension        | Base unit | Base unit symbol |
|----|---------------------|-----------|------------------|
| 0  | mass                | kilogram  | kg               |
| 1  | length              | meter     | m                |
| 2  | time                | second    | s                |
| 3  | current             | ampere    | A                |
| 4  | temperature         | kelvin    | K                |
| 5  | amount of substance | mole      | mol              |
| 6  | luminous intensity  | candela   | cd               |

Dimensionless units (e.g. radian, byte) are supported too and represented by a
vector with all dimensions set to zero.

Additionally, we also define a scale factor and zero offset for each unit, with
most dimensions' base units usually using a factor of 1 and no offset.

For example, here's how we can define kilograms and meters:

```ts
// kilogram, SI dimension 0
const KG = coherent(0);
// { dim: [ 1, 0, 0, 0, 0, 0, 0 ], scale: 1, offset: 0, coherent: true }

// meters, SI dimension 1
const M = coherent(1);
// { dim: [ 0, 1, 0, 0, 0, 0, 0 ], scale: 1, offset: 0, coherent: true }

// kelvin, SI dimension 4 (here without syntax sugar)
const K = unit(4, 1, 0, true);
// { dim: [ 0, 0, 0, 0, 1, 0, 0 ], scale: 1, offset: 0, coherent: true }

// fahrenheit, SI dim 4 with custom scale factor and zero offset
const F = unit(4, 1 / 1.8, 459.67 / 1.8);
// { dim: [ 0, 0, 0, 0, 1, 0, 0 ],  scale: 0.5555, offset: 255.3722, coherent: false }
```

More complex units like electrical resistance (e.g. ohm) are based on more than
a single dimension:

```ts
// ohm = volt / ampere
div(V, A)
// { dim: [ 1, 2, -3, -2, 0, 0,  0 ], scale: 1, offset: 0, coherent: true }
```

This dimension vector represents the unit definition for (see [SI derived
units](https://en.wikipedia.org/wiki/SI_derived_unit)):

> Ω = kg⋅m<sup>2</sup>⋅s<sup>−3</sup>⋅A<sup>−2</sup>

Btw. The
[`formatSI()`](https://docs.thi.ng/umbrella/units/functions/formatSI.html)
function can be used to format a unit's dimension vector:

```ts
formatSI(div(V, A));
// "kg·m2·s-3·A-2"
```

### Predefined units

The following units are provided as "builtins", here grouped by dimension:

#### Acceleration

| Unit name | Variable name | Description               |
|-----------|---------------|---------------------------|
| `m/s2`    | `m_s2`        | meter per second squared  |
| `ft/s2`   | `ft_s2`       | foot per second squared   |
| `rad/s2`  | `rad_s2`      | radian per second squared |
| `g0`      | `g0`          | standard gravity          |

#### Angle

| Unit name | Variable name | Description |
|-----------|---------------|-------------|
| `arcmin`  | `arcmin`      | arc minute  |
| `arcsec`  | `arcsec`      | arc second  |
| `deg`     | `deg`         | degree      |
| `gon`     | `gon`         | gradian     |
| `rad`     | `rad`         | radian      |
| `sr`      | `sr`          | steradian   |
| `turn`    | `turn`        | turn        |

#### Area

| Unit name | Variable name | Description       |
|-----------|---------------|-------------------|
| `m2`      | `m2`          | square meter      |
| `cm2`     | `cm2`         | square centimeter |
| `mm2`     | `mm2`         | square millimeter |
| `km2`     | `km2`         | square kilometer  |
| `ha`      | `ha`          | hectar            |
| `ac`      | `ac`          | acre              |
| `sqin`    | `sqin`        | square inch       |
| `sqft`    | `sqft`        | square foot       |
| `sqmi`    | `sqmi`        | square mile       |

#### Data

| Unit name | Variable name | Description       |
|-----------|---------------|-------------------|
| `bit`     | `bit`         | bit               |
| `kbit`    | `kbit`        | kilobit           |
| `Mbit`    | `Mbit`        | megabit           |
| `Gbit`    | `Gbit`        | gigabit           |
| `Tbit`    | `Tbit`        | terabit           |
| `kibit`   | `kibit`       | kibibit (1024)    |
| `Mibit`   | `Mibit`       | mebibit (1024)    |
| `Gibit`   | `Gibit`       | gibibit (1024)    |
| `Tibit`   | `Tibit`       | tebibit (1024)    |
| `B`       | `B`           | byte (8 bit)      |
| `kB`      | `kB`          | kilobyte (metric) |
| `MB`      | `MB`          | megabyte (metric) |
| `GB`      | `GB`          | gigabyte (metric) |
| `TB`      | `TB`          | terabyte (metric) |
| `PB`      | `PB`          | petabyte (metric) |
| `EB`      | `EB`          | exabyte (metric)  |
| `KiB`     | `KiB`         | kibibyte (1024)   |
| `MiB`     | `MiB`         | mebibyte (1024)   |
| `GiB`     | `GiB`         | gibibyte (1024)   |
| `TiB`     | `TiB`         | tebibyte (1024)   |
| `PiB`     | `PiB`         | pebibyte (1024)   |
| `EiB`     | `EiB`         | exbibyte (1024)   |

#### Density

| Unit     | Variable name | Description   |
|----------|---------------|---------------|
| `kg/m3`  | `kg_m3`       | density       |
| `1/inch` | `dpi`         | dots per inch |

#### Electric current

| Unit  | Variable name | Description       |
|-------|---------------|-------------------|
| `A`   | `A`           | ampere            |
| `mA`  | `mA`          | milliampere       |
| `mAh` | `mAh`         | milliampere-hours |
| `C`   | `C`           | coulomb           |
| `V`   | `V`           | volt              |
| `mV`  | `mV`          | millivolt         |
| `kV`  | `kV`          | kilovolt          |
| `MV`  | `MV`          | megavolt          |
| `F`   | `F`           | farad             |
| `pF`  | `pF`          | picofarad         |
| `µF`  | `µF`          | microfarad        |
| `Ω`   | `Ω` / `ohm`   | ohm               |
| `kΩ`  | `kΩ` / `kohm` | kiloohm           |
| `MΩ`  | `MΩ` / `Mohm` | megaohm           |
| `GΩ`  | `GΩ` / `Gohm` | gigaohm           |
| `S`   | `S`           | siemens           |
| `Wb`  | `Wb`          | weber             |
| `T`   | `T`           | tesla             |
| `H`   | `H`           | henry             |

#### Energy

| Unit   | Variable name | Description |
|--------|---------------|-------------|
| `J`    | `J`           | joule       |
| `kJ`   | `kJ`          | kilojoule   |
| `MJ`   | `MJ`          | megajoule   |
| `GJ`   | `GJ`          | gigajoule   |
| `cal`  | `cal`         | calorie     |
| `kcal` | `kcal`        | kilocalorie |

#### Force

| Unit | Variable name | Description |
|------|---------------|-------------|
| `N`  | `N`           | newton      |

#### Frequency

| Unit  | Variable name | Description         |
|-------|---------------|---------------------|
| `Hz`  | `Hz`          | hertz               |
| `kHz` | `KHz`         | kilohertz           |
| `MHz` | `MHz`         | megahertz           |
| `GHz` | `GHz`         | gigahertz           |
| `THz` | `THz`         | terahertz           |
| `rpm` | `rpm`         | rotation per minute |
| `ω`   | `ω` / `omega` | radian per second   |

#### Length

| Unit name | Variable name  | Description       |
|-----------|----------------|-------------------|
| `m`       | `m`            | meter             |
| `Å`       | `angstrom`     | angstrom          |
| `nm`      | `nm`           | nanometer         |
| `µm`      | `µm`           | micrometer        |
| `mm`      | `mm`           | millimeter        |
| `cm`      | `cm`           | centimeter        |
| `km`      | `km`           | kilometer         |
| `au`      | `au`           | astronomical unit |
| `pc`      | `pc`           | parsec            |
| `ly`      | `ly`           | light year        |
| `in`      | `in`           | inch              |
| `mil`     | `mil` / `thou` | 1/1000th inch     |
| `ft`      | `ft`           | foot              |
| `yd`      | `yd`           | yard              |
| `mi`      | `mi`           | mile              |
| `nmi`     | `nmi`          | nautical mile     |
| `pica`    | `pica`         | pica              |
| `point`   | `point`        | point             |

#### Luminous intensity

| Unit | Variable name | Description |
|------|---------------|-------------|
| `cd` | `cd`          | candela     |
| `lm` | `lm`          | lumen       |
| `lx` | `lx`          | lux         |

#### Mass

| Unit name | Variable name | Description    |
|-----------|---------------|----------------|
| `µg`      | `µg`          | microgram      |
| `mg`      | `mg`          | milligram      |
| `g`       | `g`           | gram           |
| `kg`      | `kg`          | kilogram       |
| `t`       | `t`           | tonne          |
| `kt`      | `kt`          | kilotonne      |
| `Mt`      | `Mt`          | megatonne      |
| `Gt`      | `Gt`          | gigatonne      |
| `lb`      | `lb`          | imperial pound |
| `st`      | `st`          | stone          |

#### Parts per notation

https://en.wikipedia.org/wiki/Parts-per_notation

| Unit name | Variable name | Description               |
|-----------|---------------|---------------------------|
| `%`       | `percent`     | part per hundred          |
| `‰`       | `permille`    | part per thousand         |
| `‱`       | `permyriad`   | part per ten thousand     |
| `pcm`     | `pcm`         | part per hundred thousand |
| `ppm`     | `ppm`         | part per million          |
| `ppb`     | `ppb`         | part per billion          |
| `ppt`     | `ppt`         | part per trillion         |

#### Power

| Unit name | Variable name | Description   |
|-----------|---------------|---------------|
| `W`       | `W`           | watt          |
| `mW`      | `mW`          | milliwatt     |
| `kW`      | `kW`          | kilowatt      |
| `MW`      | `MW`          | megawatt      |
| `GW`      | `GW`          | gigawatt      |
| `TW`      | `TW`          | terawatt      |
| `Wh`      | `Wh`          | watt-hour     |
| `kWh`     | `kWh`         | kilowatt-hour |

#### Pressure

| Unit name | Variable name | Description           |
|-----------|---------------|-----------------------|
| `Pa`      | `Pa`          | pascal                |
| `kPa`     | `KPa`         | kilopascal            |
| `MPa`     | `MPa`         | megapascal            |
| `GPa`     | `GPa`         | gigapascal            |
| `at`      | `at`          | technical atmosphere  |
| `atm`     | `atm`         | atmosphere            |
| `bar`     | `bar`         | bar                   |
| `psi`     | `psi`         | pound per square inch |

#### Speed

| Unit   | Variable name | Description        |
|--------|---------------|--------------------|
| `m/s`  | `m_s`         | meter per second   |
| `km/h` | `km_h`        | kilometer per hour |
| `mph`  | `mph`         | mile per hour      |
| `kn`   | `kn`          | knot               |

#### Substance

| Unit  | Variable name | Description |
|-------|---------------|-------------|
| `mol` | `mol`         | mole        |

#### Temperature

| Unit | Variable name | Description       |
|------|---------------|-------------------|
| `K`  | `K`           | kelvin            |
| `℃`  | `celsius`     | degree celsius    |
| `℉`  | `fahrenheit`  | degree fahrenheit |

#### Time

| Unit    | Variable name | Description        |
|---------|---------------|--------------------|
| `s`     | `s`           | second             |
| `ms`    | `ms`          | millisecond        |
| `µs`    | `µs`          | microsecond        |
| `ns`    | `ns`          | nanosecond         |
| `min`   | `min`         | minute             |
| `h`     | `h`           | hour               |
| `d`     | `d`           | day                |
| `week`  | `week`        | week               |
| `month` | `month`       | month (30 days)    |
| `year`  | `year`        | year (365.25 days) |

#### Volume

| Unit       | Variable name | Description          |
|------------|---------------|----------------------|
| `m3`       | `m3`          | cubic meter          |
| `mm3`      | `mm3`         | cubic millimeter     |
| `cm3`      | `cm3`         | cubic centimeter     |
| `km3`      | `km3`         | cubic kilometer      |
| `l`        | `l`           | liter                |
| `cl`       | `cl`          | centiliter           |
| `ml`       | `ml`          | milliliter           |
| `gal`      | `gal`         | imperial gallon      |
| `pt`       | `pt`          | imperial pint        |
| `fl oz`    | `floz`        | imperial fluid ounce |
| `us gal`   | `us_gal`      | US gallon            |
| `us pt`    | `us_pt`       | US pint              |
| `us cup`   | `us_cup`      | US cup               |
| `us fl oz` | `us_floz`     | US fluid ounce       |

### Creating & deriving units

#### Using standard metric prefixes

Existing coherent units can be
[prefixed](https://docs.thi.ng/umbrella/units/functions/prefix-1.html) to
produce derived versions:

```ts
// define micrometer (also available as preset)
prefix("µ", "m")
// { dim: [ 0, 1, 0, 0, 0, 0, 0 ], scale: 0.000001, offset: 0, coherent: false }

// define kKhz
prefix("k", Hz);
// { dim: [ 0, 0, -1, 0, 0, 0, 0 ], scale: 1000, offset: 0, coherent: false }
```

#### Unit combinators

The following combinators can be used to derive scaled and/or more complex units
(or [quantities](#quantities)) in multiple SI dimensions:

- [`div(a, b)`](https://docs.thi.ng/umbrella/units/functions/div.html): derives
  a new unit via the division of the given units
- [`mul(a, b)`](https://docs.thi.ng/umbrella/units/functions/mul.html): derives
  a new unit as the product of the given units
- [`pow(u, k)`](https://docs.thi.ng/umbrella/units/functions/pow.html): raises
  given unit to power `k` (e.g. meter ⇒ square meter)
- [`reciprocal(u)`](https://docs.thi.ng/umbrella/units/functions/reciprocal.html):
  Creates reciprocal of given unit (e.g. Hz ⇒ 1/second)

```ts
// acceleration (meter per second squared)
const m_s2 = div(m, pow(s, 2));
// { dim: [ 0, 1, -2, 0, 0, 0,  0 ], scale: 1, offset: 0, coherent: false }

// define kilowatt-hour (also available as preset)
const kWh = mul(prefix("k","W"), "h");
// { dim: [ 1, 2, -2, 0, 0, 0, 0 ], scale: 3600000, offset: 0, coherent: false }

// define `word` as 16 bits
const word = mul(bit, 16);
// { dim: [ 0, 0, 0, 0, 0, 0, 0 ], scale: 16, offset: 0, coherent: false }

// Hz = 1/s
const Hz = reciprocal(s);
// { dim: [ 0, 0, -1, 0, 0, 0, 0 ], scale: 1, offset: 0, coherent: false }
```

### Unit conversions

Units (and [quantities](#quantities)) can be converted using
[`convert()`](https://docs.thi.ng/umbrella/units/functions/convert.html). Only
units with compatible (incl. reciprocal) dimensions can be converted, otherwise
an error will be thrown. On the other hand, all _dimensionless_ units can be
converted to other _dimensionless_ units (even if it would be semantic
nonsense).

Units can be specified in various ways:

```ts
// convert from km/h to mph using unit names
convert(100, "km/h", "mph");
// 62.13711922373341

// or using predefined unit constants directly
convert(60, mph, km_h);
// 96.56063999999998

// or using anonymous units (meter/second ⇒ yard/hour)
convert(1, "m/s", div(yd, h));
// 3937.007874015749

// convert into opposite direction (meter/second  ⇒ second/meter)
convert(10, "m/s", reciprocal("m/s"));
// 0.1
```

Another example using dimensionless units (here angles, arc second ⇒ radian) to
compute the distance of 10 arcsec on the earth surface (in meters):

```ts
// earth radius in meters
// (also available as quantity EARTH_RADIUS, see section below)
const R = 6371000;

convert(10, "arcsec", "rad") * R;
// 308.87479623488537
```

### Quantities

The library also supports defining quantities, i.e. certain finite amounts of a
given unit. These can be a number or vector-based and can be used for
calculations & conversions using the above mentioned polymorphic functions:
`div()`, `mul()`, `reciprocal()` and `convert()`.

Quantities are created via
 [`quantity()`](https://docs.thi.ng/umbrella/units/functions/quantity-1.html)
 which acts as factory function for a thin `Quantity` class wrapper. The latter
 also implements the standard
 [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html) interface
 to obtain the unwrapped amount (though it only should be used for dimensionless
 quantities). Use [`convert()`](#unit-conversions) otherwise!

 ```ts
// (also available as preset)
const speedOfLight = quantity(299792458, "m/s");

// compute wavelength of a WiFi signal in millimeters
convert(div(speedOfLight, quantity(2.4,"GHz")), "mm");
// 124.9135
```

Some examples using vector quantities:

```ts
// DIN A4 paper size (also available as preset)
const A4 = quantity([210, 297], "mm");

// convert paper size to inches
convert(A4, "in");
// [ 8.2677, 11.6929 ]

// or calculate pixel dimensions @ 300 dpi
// the result of this product is dimensionless,
// so we use the NONE preset as target unit...
convert(mul(A4, quantity(300, "dpi")), NONE)
// [ 2480.314960629921, 3507.8740157480315 ]

// alternatively, dimensionless units can be deref'd directly
mul(A4, quantity(300, "dpi")).deref()
// [ 2480.314960629921, 3507.8740157480315 ]
```

When combining different quantities, their units do not need to be the same:

```ts
// compute 10 mm x 2 inch and convert to square centimeter
convert(mul(quantity(10, "mm"), quantity(2, "in")), "cm2")
// 5.08
```

#### Constants

The following constants are provided (more to come):

| Var name                       | Unit                | Comment                   |
|--------------------------------|---------------------|---------------------------|
| `DIN_A0` ... `DIN_A8`          | 2d vector of `mm`   | Paper sizes<sup>(1)</sup> |
| `EARTH_GRAVITY`                | `m/s`               |                           |
| `EARTH_CIRCUMFERENCE`          | `m`                 |                           |
| `EARTH_MASS`                   | `kg`                |                           |
| `EARTH_RADIUS`                 | `m`                 |                           |
| `GRAVITATION`                  | `kg-1·m3·s-2`       | Gravitational constant    |
| `SPEED_OF_LIGHT`               | `m/s`               |                           |
| `SPEED_OF_SOUND_IN_AIR`        | `m/s`               | at 20 ℃                   |
| `SPEED_OF_SOUND_IN_WATER`      | `m/s`               | at 20 ℃                   |
| `US_ANSI_A` ... `US_ANSI_E`    | 2d vector of `inch` | Paper sizes<sup>(1)</sup> |
| `US_ARCH_A` ... `US_ARCH_E`    | 2d vector of `inch` | Paper sizes<sup>(1)</sup> |
| `US_LETTER` / `US_HALF_LETTER` | 2d vector of `inch` | Paper sizes<sup>(1)</sup> |
| `US_LEGAL` / `US_JUNIOR_LEGAL` | 2d vector of `inch` | Paper sizes<sup>(1)</sup> |

- <sup>(1)</sup> - all paper sizes are also available as landscape presets
  (using `_LANDSCAPE` as suffix).

Densities of selected materials:

| Var name     | Unit    |
|--------------|---------|
| `AIR`        | `kg/m3` |
| `ALUMINIUM`  | `kg/m3` |
| `CONCRETE`   | `kg/m3` |
| `COPPER`     | `kg/m3` |
| `DIAMOND`    | `kg/m3` |
| `GLASS`      | `kg/m3` |
| `GOLD`       | `kg/m3` |
| `ICE`        | `kg/m3` |
| `IRON`       | `kg/m3` |
| `NYLON`      | `kg/m3` |
| `PLASTIC`    | `kg/m3` |
| `PLATINUM`   | `kg/m3` |
| `SAND`       | `kg/m3` |
| `SALT_WATER` | `kg/m3` |
| `SILICON`    | `kg/m3` |
| `SILVER`     | `kg/m3` |
| `STEEL`      | `kg/m3` |
| `TITANIUM`   | `kg/m3` |
| `WATER`      | `kg/m3` |
| `WOOD`       | `kg/m3` |

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bunits%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/units
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/units"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const units = await import("@thi.ng/units");
```

Package sizes (brotli'd, pre-treeshake): ESM: 4.77 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/units/)

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-units,
  title = "@thi.ng/units",
  author = "Karsten Schmidt",
  note = "https://thi.ng/units",
  year = 2021
}
```

## License

&copy; 2021 - 2024 Karsten Schmidt // Apache License 2.0
