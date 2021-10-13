import { CONFIG } from "../config.js";

export const asset = (file: string, alt = "", prefix = CONFIG.assetURL) =>
    `![${alt}](${prefix}/${file})`;

export const thumb = (src: string, prefix = CONFIG.assetURL) =>
    `<img src="${prefix}/${src}" width="240"/>`;
