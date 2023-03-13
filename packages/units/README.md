<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/units](https://media.thi.ng/umbrella/banners-20220914/thing-units.svg?576826a0)

[![npm version](https://img.shields.io/npm/v/@thi.ng/units.svg)](https://www.npmjs.com/package/@thi.ng/units)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/units.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Unit definitions](#unit-definitions)
  - [Predefined units](#predefined-units)
    - [Acceleration](#acceleration)
    - [Angle](#angle)
    - [Area](#area)
    - [Data](#data)
    - [Electric current](#electric-current)
    - [Energy](#energy)
    - [Force](#force)
    - [Frequency](#frequency)
    - [Length](#length)
    - [Luminous intensity](#luminous-intensity)
    - [Mass](#mass)
    - [Power](#power)
    - [Pressure](#pressure)
    - [Speed](#speed)
    - [Substance](#substance)
    - [Temperature](#temperature)
    - [Time](#time)
    - [Volume](#volume)
  - [Creating & deriving units](#creating--deriving-units)
    - [Using standard metric prefixes](#using-standard-metric-prefixes)
  - [Unit conversions](#unit-conversions)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Extensible SI unit creation & conversions (130+ units predefined).

All unit definitions & conversions are based on the SI units described here:

- https://en.wikipedia.org/wiki/International_System_of_Units

### Unit definitions

Each unit is defined via a 7-dimensional vector representing individual exponents
for each of the base SI dimensions, in order:

| SI dimension        | Base unit | Base unit symbol |
|---------------------|-----------|------------------|
| mass                | kilogram  | kg               |
| length              | meter     | m                |
| time                | second    | s                |
| current             | ampere    | A                |
| temperature         | kelvin    | K                |
| amount of substance | mole      | mol              |
| luminous intensity  | candela   | cd               |

Dimensionless units are supported too, and for those all dimensions are set to
zero.

Additionally, we also define a scale factor and zero offset for each unit, with
most dimensions' base units usually using a factor of 1 and no offset.

For example, here's how we can define kilograms and meters:

```ts
const KG = unit(1, 1); // SI dimension 0
// { dim: [ 1, 0, 0, 0, 0, 0, 0 ], scale: 1, offset: 0, prefix: false }

const M = unit(1, 1);  // SI dimension 1
// { dim: [ 0, 1, 0, 0, 0, 0, 0 ], scale: 1, offset: 0, prefix: false }
```

More complex units like electrical resistance (e.g. kΩ) are based on more than a
single dimension:

```ts
// { dim: [ 1, 2, -3, -2, 0, 0,  0 ], scale: 1000, offset: 0, prefix: true }
```

This dimension vector represents the unit definition for (see [SI derived
units](https://en.wikipedia.org/wiki/SI_derived_unit)):

> 1 Ohm = kg⋅m<sup>2</sup>⋅s<sup>−3</sup>⋅A<sup>−2</sup>

### Predefined units

The following units are provided as "builtins", here grouped by dimension:

#### Acceleration

| Unit name | JS name  | Description               |
|-----------|----------|---------------------------|
| `m/s2`    | `M_S2`   | meter per second squared  |
| `ft/s2`   | `FT_S2`  | foot per second squared   |
| `rad/s2`  | `RAD_S2` | radian per second squared |
| `g0`      | `G0`     | standard gravity          |

#### Angle

| Unit name | JS name  | Description |
|-----------|----------|-------------|
| `arcmin`  | `ARCMIN` | arc minute  |
| `arcsec`  | `ARCSEC` | arc second  |
| `deg`     | `DEG`    | degree      |
| `gon`     | `GON`    | gradian     |
| `rad`     | `RAD`    | radian      |
| `sr`      | `SR`     | steradian   |
| `turn`    | `TURN`   | turn        |

#### Area

| Unit name | JS name | Description       |
|-----------|---------|-------------------|
| `m2`      | `M2`    | square meter      |
| `cm2`     | `CM2`   | square centimeter |
| `mm2`     | `MM2`   | square millimeter |
| `km2`     | `KM2`   | square kilometer  |
| `ha`      | `HA`    | hectar            |
| `ac`      | `AC`    | acre              |
| `sqin`    | `SQIN`  | square inch       |
| `sqft`    | `SQFT`  | square foot       |
| `sqmi`    | `SQMI`  | square mile       |

#### Data

| Unit name | JS name | Description     |
|-----------|---------|-----------------|
| `bit`     | `BIT`   | bit             |
| `kbit`    | `KBIT`  | kilobit         |
| `Mbit`    | `MBIT`  | megabit         |
| `Gbit`    | `GBIT`  | gigabit         |
| `Tbit`    | `TBIT`  | terabit         |
| `B`       | `BYTE`  | byte (8 bit)    |
| `KB`      | `KBYTE` | kilobyte (1024) |
| `MB`      | `MBYTE` | megabyte (1024) |
| `GB`      | `GBYTE` | gigabyte (1024) |
| `TB`      | `TBYTE` | terabyte (1024) |
| `PB`      | `PBYTE` | petabyte (1024) |
| `EB`      | `EBYTE` | exabyte (1024)  |

#### Electric current

| Unit | JS name   | Description       |
|------|-----------|-------------------|
| A    | `A`       | ampere            |
| mA   | `MA`      | milliampere       |
| mAh  | `MA_H`    | milliampere-hours |
| C    | `C`       | coulomb           |
| V    | `V`       | volt              |
| mV   | `MV`      | millivolt         |
| kV   | `KV`      | kilovolt          |
| F    | `F`       | farad             |
| pF   | `PF`      | picofarad         |
| µF   | `µF`      | microfarad        |
| Ω    | `OHM`     | ohm               |
| kΩ   | `KOHM`    | kiloohm           |
| MΩ   | `MOHM`    | megaohm           |
| GΩ   | `GOHM`    | gigaohm           |
| S    | `SIEMENS` | siemens           |
| Wb   | `WB`      | weber             |
| T    | `TESLA`   | tesla             |
| H    | `HENRY`   | henry             |

#### Energy

| Unit | JS name | Description |
|------|---------|-------------|
| J    | `J`     | joule       |
| kJ   | `KJ`    | kilojoule   |
| MJ   | `MJ`    | megajoule   |
| GJ   | `GJ`    | gigajoule   |
| cal  | `CAL`   | calorie     |
| kcal | `KCAL`  | kilocalorie |

#### Force

| Unit | JS name | Description |
|------|---------|-------------|
| `N`  | `N`     | newton      |

#### Frequency

| Unit  | JS name | Description         |
|-------|---------|---------------------|
| `Hz`  | `HZ`    | hertz               |
| `kHz` | `KHZ`   | kilohertz           |
| `MHz` | `MHZ`   | megahertz           |
| `GHz` | `GHZ`   | gigahertz           |
| `THz` | `THZ`   | terahertz           |
| `rpm` | `RPM`   | rotation per minute |
| `ω`   | `OMEGA` | radian per second   |

#### Length

| Unit name | JS name | Description       |
|-----------|---------|-------------------|
| `m`       | `M`     | meter             |
| `cm`      | `CM`    | centimeter        |
| `mm`      | `MM`    | millimeter        |
| `µm`      | `µM`    | micrometer        |
| `nm`      | `NM`    | nanometer         |
| `km`      | `KM`    | kilometer         |
| `au`      | `AU`    | astronomical unit |
| `in`      | `IN`    | inch              |
| `ft`      | `FT`    | foot              |
| `yd`      | `YD`    | yard              |
| `mi`      | `MI`    | mile              |
| `nmi`     | `NMI`   | nautical mile     |
| `pica`    | `PICA`  | pica              |
| `point`   | `POINT` | point             |

#### Luminous intensity

| Unit | JS name | Description |
|------|---------|-------------|
| `cd` | `CD`    | candela     |
| `lm` | `LM`    | lumen       |
| `lx` | `LX`    | lux         |

#### Mass

| Unit name | JS name | Description    |
|-----------|---------|----------------|
| `µg`      | `µG`    | microgram      |
| `mg`      | `mG`    | milligram      |
| `g`       | `G`     | gram           |
| `kg`      | `KG`    | kilogram       |
| `t`       | `T`     | tonne          |
| `kt`      | `KT`    | kilotonne      |
| `Mt`      | `MT`    | megatonne      |
| `Gt`      | `GT`    | gigatonne      |
| `lb`      | `LB`    | imperial pound |
| `st`      | `ST`    | stone          |

#### Power

| Unit name | JS name | Description   |
|-----------|---------|---------------|
| `W`       | `W`     | watt          |
| `mW`      | `MW`    | milliwatt     |
| `kW`      | `KW`    | kilowatt      |
| `MW`      | `MW`    | megawatt      |
| `GW`      | `GW`    | gigawatt      |
| `TW`      | `TW`    | terawatt      |
| `Wh`      | `WH`    | watt-hour     |
| `kWh`     | `KWH`   | kilowatt-hour |

#### Pressure

| Unit name | JS name | Description           |
|-----------|---------|-----------------------|
| `Pa`      | `PA`    | pascal                |
| `kPa`     | `KPA`   | kilopascal            |
| `MPa`     | `MPA`   | megapascal            |
| `GPa`     | `GPA`   | gigapascal            |
| `at`      | `AT`    | technical atmosphere  |
| `atm`     | `ATM`   | atmosphere            |
| `bar`     | `BAR`   | bar                   |
| `psi`     | `PSI`   | pound per square inch |

#### Speed

| Unit   | JS name | Description        |
|--------|---------|--------------------|
| `m/s`  | `M_S`   | meter per second   |
| `km/h` | `KM_H`  | kilometer per hour |
| `mph`  | `MPH`   | mile per hour      |
| `kn`   | `KN`    | knot               |

#### Substance

| Unit  | JS name | Description |
|-------|---------|-------------|
| `mol` | `MOL`   | mole        |

#### Temperature

| Unit | JS name | Description       |
|------|---------|-------------------|
| `K`  | `K`     | kelvin            |
| `℃`  | `DEG_C` | degree celsius    |
| `℉`  | `DEG_F` | degree fahrenheit |

#### Time

| Unit  | JS name | Description        |
|-------|---------|--------------------|
| s     | `S`     | second             |
| ms    | `MS`    | millisecond        |
| µs    | `µS`    | microsecond        |
| ns    | `NS`    | nanosecond         |
| min   | `MIN`   | minute             |
| h     | `H`     | hour               |
| day   | `DAY`   | day                |
| week  | `WEEK`  | week               |
| month | `MONTH` | month (30 days)    |
| year  | `YEAR`  | year (365.25 days) |

#### Volume

| Unit        | JS name   | Description          |
|-------------|-----------|----------------------|
| `m3`        | `M3`      | cubic meter          |
| `mm3`       | `MM3`     | cubic millimeter     |
| `cm3`       | `CM3`     | cubic centimeter     |
| `km3`       | `KM3`     | cubic kilometer      |
| `l`         | `L`       | liter                |
| `cl`        | `CL`      | centiliter           |
| `ml`        | `ML`      | milliliter           |
| `imp gal`   | `GAL`     | imperial gallon      |
| `imp pt`    | `PT`      | imperial pint        |
| `imp fl oz` | `FLOZ`    | imperial fluid ounce |
| `us gal`    | `US_GAL`  | US gallon            |
| `us pt`     | `US_PT`   | US pint              |
| `us cup`    | `US_CUP`  | US cup               |
| `us fl oz`  | `US_FLOZ` | US fluid ounce       |

### Creating & deriving units

#### Using standard metric prefixes

Existing coherent

### Unit conversions

Only units with compatible (incl. reciprocal) dimensions can be converted,
otherwise an error will be thrown. Units can be given as

```ts
// convert from km/h to mph using unit names
convert(100, "km/h", "mph");
// 62.13711922373341

// using predefined unit constants directly
convert(60, MPH, KM_H);
// 96.56063999999998

// or using anonymous units (meter/second ⇒ yard/hour)
convert(1, "m/s", div(YD, H))
// 3937.007874015749
```

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

Package sizes (brotli'd, pre-treeshake): ESM: 3.17 KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/develop/packages/equiv)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/units/)

TODO

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

&copy; 2021 - 2023 Karsten Schmidt // Apache License 2.0
