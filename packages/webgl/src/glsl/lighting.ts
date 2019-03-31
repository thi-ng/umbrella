import { defglsl } from "./assemble";

/**
 * Computes lambert coefficient.
 *
 * @param surfNormal
 * @param lightDir
 * @param bidir
 */
export const lambert = defglsl(
    `float lambert(vec3 surfNormal, vec3 lightDir, bool bidir) {
    float d = dot(surfNormal, lightDir);
    return clamp(bidir ? abs(d) : d, 0.0, 1.0);
}`
);

export const phong = defglsl(
    `float phong(vec3 lightDir, vec3 eyeDir, vec3 surfaceNormal) {
    return dot(reflect(-lightDir, surfaceNormal), eyeDir);
}`
);

export const blinnPhong = defglsl(
    `float blinnPhong(vec3 lightDir, vec3 eyeDir, vec3 surfaceNormal) {
    return dot(normalize(lightDir + eyeDir), surfaceNormal);
}`
);

export const beckmannDistribution = defglsl(
    `float beckmannDistribution(float x, float roughness) {
    float NdotH = max(x, 1e-4);
    float cos2Alpha = NdotH * NdotH;
    float tan2Alpha = (cos2Alpha - 1.0) / cos2Alpha;
    float roughness2 = roughness * roughness;
    float denom = PI * roughness2 * cos2Alpha * cos2Alpha;
    return exp(tan2Alpha / roughness2) / denom;
}`
);

export const beckmannSpecular = defglsl(
    `float beckmannSpecular(vec3 lightDir,
                        vec3 viewDir,
                        vec3 surfNormal,
                        float roughness) {
    return beckmannDistribution(dot(surfNormal, normalize(lightDir + viewDir)), roughness);
}`,
    [beckmannDistribution]
);
