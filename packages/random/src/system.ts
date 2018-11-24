import { ARandom } from "./api";

const random = Math.random;

export class SystemRandom extends ARandom {

    int() {
        return (random() * 0xffffffff) >>> 0;
    }

    float(norm = 1) {
        return random() * norm;
    }
}

export const SYSTEM = new SystemRandom();
