import { defglsl } from "./assemble";

export const indexToUV = defglsl(
    `vec2 indexToUV(int i, ivec2 size) {
    return vec2(float(i % size.x), float(i / size.x)) / vec2(size);
}`
);

export const readIndex1 = defglsl(
    `float readIndex1(sampler2D tex, int i, ivec2 size) {
    return texture(tex, indexToUV(i, size)).r;
}`,
    [indexToUV]
);

export const readIndex2 = defglsl(
    `vec2 readIndex2(sampler2D tex, int i, ivec2 size) {
    return texture(tex, indexToUV(i, size)).xy;
}`,
    [indexToUV]
);

export const readIndex3 = defglsl(
    `vec3 readIndex3(sampler2D tex, int i, ivec2 size) {
    return texture(tex, indexToUV(i, size)).xyz;
}`,
    [indexToUV]
);

export const readIndex4 = defglsl(
    `vec4 readIndex4(sampler2D tex, int i, ivec2 size) {
    return texture(tex, indexToUV(i, size));
}`,
    [indexToUV]
);
