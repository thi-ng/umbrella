import { add } from "@thi.ng/transducers/add";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { range } from "@thi.ng/transducers/range";
import { transduce } from "@thi.ng/transducers/transduce";
import { AttribPool } from "@thi.ng/vector-pools/attrib-pool";
import { addm2 } from "@thi.ng/vectors/addm";
import { ONE4 } from "@thi.ng/vectors/api";
import { invert2 } from "@thi.ng/vectors/invert";
import { madd2 } from "@thi.ng/vectors/madd";
import { mul2 } from "@thi.ng/vectors/mul";
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
            position: { type: "f32", size: 3, byteOffset: 0 },
            uv: { type: "f32", size: 2, byteOffset: 12 },
            ...(opts.useColor
                ? {
                      color: {
                          type: "f32",
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
    const invSize = invert2([], glyphs.size);
    for (let i = 0, yy = 0, id = 0; i < lines.length; i++) {
        const line = lines[i];
        let xx = opts.align!(glyphs, <TextOpts>opts, line);
        for (let j = 0; j < line.length; j++, id++) {
            const { pos, size, offset, step } = glyphs.chars[line[j]];
            const [sx, sy] = mul2([], size, dir);
            const [x, y] = madd2([], offset, dir, [xx, yy]);
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
                    mul2([], pos, invSize),
                    mul2([], [pos[0] + size[0], pos[1]], invSize),
                    addm2([], pos, size, invSize),
                    mul2([], [pos[0], pos[1] + size[1]], invSize),
                ],
                id * 4
            );
            xx += step * opts.dirX! * opts.spacing!;
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
