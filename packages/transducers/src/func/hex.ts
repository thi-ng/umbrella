const ZEROES = "00000000";

export function hex(digits = 2, prefix = "") {
    return (x: number) => {
        const s = x.toString(16);
        return prefix + (s.length >= digits ? s : ZEROES.substring(0, digits - s.length) + s);
    }
}
