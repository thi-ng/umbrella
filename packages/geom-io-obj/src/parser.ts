import { assert, Fn } from "@thi.ng/api";
import type { OBJFace, OBJGroup, OBJModel } from "./api";
import { Vec } from "@thi.ng/vectors";

export interface ParseOpts {
    normals: boolean;
    uvs: boolean;
    objects: boolean;
    groups: boolean;
    swizzle?: Fn<Vec, Vec>;
}

export const parseOBJ = (src: string, opts?: Partial<ParseOpts>) => {
    opts = {
        normals: true,
        uvs: true,
        objects: true,
        groups: true,
        ...opts,
    };
    const result = <OBJModel>{
        vertices: [],
        normals: [],
        uvs: [],
        objects: [],
        mtlLibs: [],
    };
    let currGroup!: OBJGroup;
    let nextID = 0;

    const newGroup = (id: string, force = false) => {
        id = id || `group-${nextID++}`;
        (force || opts!.groups) &&
            result.objects[result.objects.length - 1].groups.push(
                (currGroup = {
                    id,
                    smooth: false,
                    faces: [],
                    lines: [],
                })
            );
    };

    const newObject = (id: string, force = false) => {
        (force || opts!.objects) &&
            result.objects.push({ id: id || `object-${nextID++}`, groups: [] });
        newGroup(id || "default", force);
    };

    const readVec2 = (items: string[]) => [
        parseFloat(items[1]),
        parseFloat(items[2]),
    ];

    const readVec3 = (items: string[]) => [
        parseFloat(items[1]),
        parseFloat(items[2]),
        parseFloat(items[3]),
    ];

    const addID = (acc: number[], x: string, num: number) => {
        const v = parseInt(x);
        acc.push(v < 0 ? v + num : v - 1);
    };

    const readFace = (line: string[]) => {
        const face = <OBJFace>{ v: [] };
        const n = line.length;
        const nv = result.vertices.length;
        const nuv = result.uvs.length;
        const nn = result.normals.length;
        const items = line[1].split("/");
        switch (items.length) {
            case 1:
                for (let i = 1; i < n; i++) {
                    addID(face.v, line[i], nv);
                }
                break;
            case 2:
                opts!.uvs && (face.uv = []);
                for (let i = 1; i < n; i++) {
                    const f = <any[]>line[i].split("/");
                    addID(face.v, f[0], nv);
                    face.uv && addID(face.uv!, f[1], nuv);
                }
                break;
            case 3:
                opts!.uvs && items[1].length && (face.uv = []);
                opts!.normals && items[2].length && (face.n = []);
                for (let i = 1; i < n; i++) {
                    const f = <any[]>line[i].split("/");
                    addID(face.v, f[0], nv);
                    face.uv && addID(face.uv!, f[1], nuv);
                    face.n && addID(face.n!, f[2], nn);
                }
                break;
            default:
        }
        return face;
    };

    const readPolyLine = (items: string[]) => {
        const num = result.vertices.length;
        const verts: number[] = [];
        for (let i = 1, n = items.length; i < n; i++) {
            addID(verts, items[i], num);
        }
        return verts;
    };

    newObject("default", true);

    const lines = src.split(/[\n\r]+/g);
    const swizzle = opts.swizzle;

    for (let i = 0, n = lines.length; i < n; i++) {
        const l = lines[i];
        if (!l.length || l[0] === "#") continue;
        const items = l.trim().split(/\s+/g);
        const len = items.length;
        switch (items[0]) {
            case "v": {
                assert(len > 3, `invalid vertex @ line ${i}`);
                const v = readVec3(items);
                result.vertices.push(swizzle ? swizzle(v) : v);
                break;
            }
            case "vn": {
                assert(len > 3, `invalid normal @ line ${i}`);
                const v = readVec3(items);
                result.normals.push(swizzle ? swizzle(v) : v);
                break;
            }
            case "vt":
                assert(len > 2, `invalid uv @ line ${i}`);
                result.uvs.push(readVec2(items));
                break;
            case "f":
                assert(len > 3, `invalid face @ line ${i}`);
                currGroup.faces.push(readFace(items));
                break;
            case "l":
                assert(len > 2, `invalid polyline @ line ${i}`);
                currGroup.lines.push(readPolyLine(items));
                break;
            case "o":
                opts.objects && newObject(items[1]);
                break;
            case "g":
                opts.groups && newGroup(items[1]);
                break;
            case "s":
                currGroup.smooth = items[1] !== "0" && items[1] !== "off";
                break;
            case "mtllib":
                result.mtlLibs.push(items[1]);
                break;
            case "usemtl":
                currGroup.mtl = items[1];
                break;
            default:
                console.log(`ignoring token: ${items[0]} @ line ${i}`);
        }
    }
    return result;
};
