import { clamp01 } from "@thi.ng/math/interval";

/**
 * Based on:
 * https://github.com/neilbartlett/color-temperature/blob/master/index.js
 * http://www.zombieprototypes.com/?p=210
 *
 * @param kelvin color temperature
 * @param alpha
 */
export const kelvinRgba =
    (kelvin: number, alpha = 1) => {
        kelvin *= 0.01;
        let t: number;
        return kelvin < 66 ?
            [1,
                clamp01(-0.6088425710866344 - 0.001748900018414868 * (t = kelvin - 2) + 0.4097731842899564 * Math.log(t)),
                kelvin < 20 ?
                    0 :
                    clamp01(-0.9990954974165059 + 0.0032447435545127036 * (t = kelvin - 10) + 0.453646839257496 * Math.log(t)),
                alpha
            ] :
            [
                clamp01(1.3803015908551253 + 0.0004478684462124118 * (t = kelvin - 55) - 0.15785750232675008 * Math.log(t)),
                clamp01(1.2762722061615583 + 0.0003115080994769546 * (t = kelvin - 50) - 0.11013841706194392 * Math.log(t)),
                1,
                alpha
            ];
    };
