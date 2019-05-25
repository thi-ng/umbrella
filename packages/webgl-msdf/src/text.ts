import {
    add,
    map,
    mapcat,
    range,
    transduce
} from "@thi.ng/transducers";
import { AttribPool, GLType } from "@thi.ng/vector-pools";
import { add2, div2, ONE4 } from "@thi.ng/vectors";
import { GLVec4, ModelSpec } from "@thi.ng/webgl";
import { MSDFFont, TextOpts } from "./api";

export const text = (
    glyphs: MSDFFont,
    txt: string,
    opts?: Partial<TextOpts>
) => {
    opts = { align: alignLeft, leading: 1, color: <GLVec4>ONE4, ...opts };
    let len = txt.replace("\n", "").length;
    const attribs = new AttribPool({
        attribs: {
            position: { type: GLType.F32, size: 3, byteOffset: 0 },
            uv: { type: GLType.F32, size: 2, byteOffset: 12 },
            ...(opts.useColor
                ? {
                      color: {
                          type: GLType.F32,
                          default: opts.color,
                          size: 4,
                          byteOffset: 20
                      }
                  }
                : null)
        },
        num: len * 4,
        mem: {
            size: len * 4 * (opts.useColor ? 36 : 20) + 8
        }
    });
    const lines = txt.split("\n");
    for (let i = 0, yy = 0, id = 0; i < lines.length; i++) {
        const line = lines[i];
        let xx = opts.align(glyphs, line);
        for (let j = 0; j < line.length; j++, id++) {
            const g = glyphs.chars[line[j]];
            let [x, y] = g.offset;
            let [sx, sy] = g.size;
            x += xx;
            y += yy;
            attribs.setAttribValues(
                "position",
                [
                    [x, y, 0],
                    [x + sx, y, 0],
                    [x + sx, y + sy, 0],
                    [x, y + sy, 0]
                ],
                id * 4
            );
            attribs.setAttribValues(
                "uv",
                [
                    div2([], g.pos, glyphs.size),
                    div2([], [g.pos[0] + sx, g.pos[1]], glyphs.size),
                    div2([], add2([], g.pos, g.size), glyphs.size),
                    div2([], [g.pos[0], g.pos[1] + sy], glyphs.size)
                ],
                id * 4
            );
            xx += g.step;
        }
        yy += glyphs.lineHeight * opts.leading;
    }
    return <ModelSpec>{
        attribPool: attribs,
        indices: {
            data: new Uint16Array([
                ...mapcat(
                    (i) => [i, i + 1, i + 2, i, i + 2, i + 3],
                    range(0, len * 4, 4)
                )
            ])
        },
        uniforms: {},
        num: len * 6,
        mode: 4 // TRIANGLES
    };
};

export const textWidth = (font: MSDFFont, txt: string) =>
    transduce(map((x) => font.chars[x].step), add(), txt);

export const alignLeft = () => 0;

export const alignRight = (font: MSDFFont, line: string) =>
    -textWidth(font, line);

export const alignCenter = (font: MSDFFont, line: string) =>
    -textWidth(font, line) / 2;
