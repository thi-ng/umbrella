import { ARandom } from "./arandom";

const random = Math.random;

export class SystemRandom extends ARandom {
    int() {
        return (random() * 4294967296) /* 2**32 */ >>> 0;
    }

    float(norm = 1) {
        return random() * norm;
    }

    norm(norm = 1) {
        return (random() - 0.5) * 2 * norm;
    }
}

export const SYSTEM = new SystemRandom();
