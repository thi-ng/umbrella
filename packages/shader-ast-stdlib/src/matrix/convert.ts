import {
    defn,
    indexMat,
    mat3,
    mat4,
    ret,
    vec3,
    vec4,
} from "@thi.ng/shader-ast";

export const m22ToM33 = defn("mat3", "m22ToM33", ["mat2"], (m) => {
    return [
        ret(mat3(vec3(indexMat(m, 0), 0), vec3(indexMat(m, 1), 0), vec3())),
    ];
});

export const m33ToM44 = defn("mat4", "m33ToM44", ["mat3"], (m) => {
    return [
        ret(
            mat4(
                vec4(indexMat(m, 0), 0),
                vec4(indexMat(m, 1), 0),
                vec4(indexMat(m, 2), 0),
                vec4()
            )
        ),
    ];
});
