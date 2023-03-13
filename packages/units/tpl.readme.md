<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

#### Electric current

| Unit | Variable name | Description       |
|------|---------------|-------------------|
| A    | `A`           | ampere            |
| mA   | `mA`          | milliampere       |
| mAh  | `mAh`         | milliampere-hours |
| C    | `C`           | coulomb           |
| V    | `V`           | volt              |
| mV   | `mV`          | millivolt         |
| kV   | `kV`          | kilovolt          |
| MV   | `MV`          | megavolt          |
| F    | `F`           | farad             |
| pF   | `pF`          | picofarad         |
| µF   | `µF`          | microfarad        |
| Ω    | `Ω`           | ohm               |
| kΩ   | `kΩ`          | kiloohm           |
| MΩ   | `MΩ`          | megaohm           |
| GΩ   | `GΩ`          | gigaohm           |
| S    | `S`           | siemens           |
| Wb   | `Wb`          | weber             |
| T    | `T`           | tesla             |
| H    | `H`           | henry             |

#### Energy

| Unit | Variable name | Description |
|------|---------------|-------------|
| J    | `J`           | joule       |
| kJ   | `kJ`          | kilojoule   |
| MJ   | `MJ`          | megajoule   |
| GJ   | `GJ`          | gigajoule   |
| cal  | `cal`         | calorie     |
| kcal | `kcal`        | kilocalorie |

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
| `ω`   | `ω`           | radian per second   |

#### Length

| Unit name | Variable name | Description       |
|-----------|---------------|-------------------|
| `m`       | `m`           | meter             |
| `cm`      | `cm`          | centimeter        |
| `mm`      | `mm`          | millimeter        |
| `µm`      | `µm`          | micrometer        |
| `nm`      | `nm`          | nanometer         |
| `km`      | `km`          | kilometer         |
| `au`      | `au`          | astronomical unit |
| `in`      | `in`          | inch              |
| `ft`      | `ft`          | foot              |
| `yd`      | `yd`          | yard              |
| `mi`      | `mi`          | mile              |
| `nmi`     | `nmi`         | nautical mile     |
| `pica`    | `pica`        | pica              |
| `point`   | `point`       | point             |

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

| Unit  | Variable name | Description        |
|-------|---------------|--------------------|
| s     | `s`           | second             |
| ms    | `ms`          | millisecond        |
| µs    | `µs`          | microsecond        |
| ns    | `ns`          | nanosecond         |
| min   | `min`         | minute             |
| h     | `h`           | hour               |
| day   | `d`           | day                |
| week  | `week`        | week               |
| month | `month`       | month (30 days)    |
| year  | `year`        | year (365.25 days) |

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

## API

{{pkg.docs}}

TODO

<!-- include ../../assets/tpl/footer.md -->
