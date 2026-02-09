// SPDX-License-Identifier: Apache-2.0
import { quantity, unit } from "../unit.js";
import { m_s2 } from "../units/accel.js";
import { m } from "../units/length.js";

/**
 * https://en.wikipedia.org/wiki/Earth_radius
 */
export const EARTH_RADIUS = quantity(6371000, m);

/**
 * At equator
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Earth%27s_circumference
 */
export const EARTH_CIRCUMFERENCE = quantity(40075017, m);

/**
 * Using equatorial mean as alternative to {@link G0}.
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Gravity_of_Earth
 */
export const EARTH_GRAVITY = quantity(9.78033, m_s2);

/**
 * Standard gravity
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Standard_gravity
 */
export const G0 = quantity(9.80665, m_s2);

/**
 * https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
 */
export const EARTH_MASS = quantity(5.9722e24, "kg");

/**
 * Gravitational constant (kg-1·m3·s-2)
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Gravitational_constant
 */
export const GRAVITATION = quantity(
	6.6743e-11,
	unit([-1, 3, -2, 0, 0, 0, 0], 1)
);
