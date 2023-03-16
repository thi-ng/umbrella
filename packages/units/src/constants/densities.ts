import { quantity } from "../unit.js";
import { kg_m3 } from "../units/density.js";

// https://en.wikipedia.org/wiki/Density#Various_materials

export const AIR = quantity(1.2, kg_m3);

export const ALUMINIUM = quantity(2700, kg_m3);
// for americans...
export const ALUMINUM = ALUMINIUM;

export const CONCRETE = quantity(2400, kg_m3);

export const COPPER = quantity(8940, kg_m3);

export const DIAMOND = quantity(3500, kg_m3);

export const GLASS = quantity(2500, kg_m3);

export const GOLD = quantity(19320, kg_m3);

export const ICE = quantity(916.7, kg_m3);

export const IRON = quantity(7870, kg_m3);

export const NYLON = quantity(1150, kg_m3);

export const PLASTIC = quantity(1175, kg_m3);

export const PLATINUM = quantity(21450, kg_m3);

export const SAND = quantity(1600, kg_m3);

export const SALT_WATER = quantity(1030, kg_m3);

export const SILICON = quantity(2330, kg_m3);

export const SILVER = quantity(10500, kg_m3);

export const STEEL = quantity(7850, kg_m3);

export const TITANIUM = quantity(4540, kg_m3);
/**
 * Fresh water @ 4 degree celsius (max. density)
 */
export const WATER = quantity(1000, kg_m3);

export const WOOD = quantity(700, kg_m3);
