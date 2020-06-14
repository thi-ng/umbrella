import { GLType } from "@thi.ng/api";
import { add, map, mapcat, range, transduce } from "@thi.ng/transducers";
import { AttribPool } from "@thi.ng/vector-pools";
import { add2, div2, madd2, mul2, ONE4 } from "@thi.ng/vectors";
import type { GLVec4, ModelSpec } from "@thi.ng/webgl";
import type { MSDFFont, TextAlign, TextOpts } from "./api";

export const text = (
    glyphs: MSDFFont,
    txt: string,
    opts?: Partial<TextOpts>
) => {
    opts = {
        align: alignLeft,
        spacing: 1,
        leading: 1,
        dirX: 1,
        dirY: 1,
        color: <GLVec4>ONE4,
        ...opts,
    };
    const dir: number[] = [opts.dirX!, opts.dirY!];
    const lineHeight = glyphs.lineHeight * opts.leading! * opts.dirY!;
    const len = txt.replace("\n", "").length;
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
                          byteOffset: 20,
                      },
                  }
                : null),
        },
        num: len * 4,
        mem: {
            size: len * 4 * (opts.useColor ? 36 : 20) + 8 + /* FIXME */ 40,
        },
    });
    const lines = txt.split("\n");
    for (let i = 0, yy = 0, id = 0; i < lines.length; i++) {
        const line = lines[i];
        let xx = opts.align!(glyphs, <TextOpts>opts, line);
        for (let j = 0; j < line.length; j++, id++) {
            const g = glyphs.chars[line[j]];
            const [sx, sy] = mul2([], g.size, dir);
            const [x, y] = madd2([], g.offset, dir, [xx, yy]);
            attribs.setAttribValues(
                "position",
                [
                    [x, y, 0],
                    [x + sx, y, 0],
                    [x + sx, y + sy, 0],
                    [x, y + sy, 0],
                ],
                id * 4
            );
            attribs.setAttribValues(
                "uv",
                [
                    div2([], g.pos, glyphs.size),
                    div2([], [g.pos[0] + g.size[0], g.pos[1]], glyphs.size),
                    div2([], add2([], g.pos, g.size), glyphs.size),
                    div2([], [g.pos[0], g.pos[1] + g.size[1]], glyphs.size),
                ],
                id * 4
            );
            xx += g.step * opts.dirX! * opts.spacing!;
        }
        yy += lineHeight;
    }
    return <ModelSpec>{
        attribPool: attribs,
        indices: {
            data: new Uint16Array([
                ...mapcat(
                    (i) => [i, i + 1, i + 2, i, i + 2, i + 3],
                    range(0, len * 4, 4)
                ),
            ]),
        },
        uniforms: {},
        num: len * 6,
        mode: 4, // TRIANGLES
    };
};

export const textWidth = (
    font: MSDFFont,
    opts: Partial<TextOpts>,
    txt: string
) => {
    const s = opts.spacing !== undefined ? opts.spacing : 1;
    return transduce(
        map((x) => font.chars[x].step * s),
        add(),
        txt
    );
};

export const alignLeft: TextAlign = () => 0;

export const alignRight: TextAlign = (font, opts, line) =>
    -(opts.dirX || 1) * textWidth(font, opts, line);

export const alignCenter: TextAlign = (font, opts, line) =>
    (-(opts.dirX || 1) * textWidth(font, opts, line)) / 2;
