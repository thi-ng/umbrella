import type { ReadonlyColor } from "@thi.ng/color";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { srgbIntArgb32 } from "@thi.ng/color/srgb/srgb-int";
import { downloadWithMime } from "@thi.ng/dl-asset/raw";

export const downloadACT = (colors: ReadonlyColor[]) => {
    const num = colors.length;
    const buf = new Uint8Array(772);
    // http://www.selapa.net/swatches/colors/fileformats.php
    // https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577411_pgfId-1070626
    buf[768] = num >> 8;
    buf[769] = num & 0xff;
    // palette index 0 reserved for transparent slot
    for (let i = 0, j = 3; i < num; i++, j += 3) {
        const rgb = srgbIntArgb32(srgb(colors[i]));
        buf[j] = (rgb >> 16) & 0xff;
        buf[j + 1] = (rgb >> 8) & 0xff;
        buf[j + 2] = rgb & 0xff;
    }
    downloadWithMime("palette.act", buf, {
        mime: "application/octet-stream",
    });
};
