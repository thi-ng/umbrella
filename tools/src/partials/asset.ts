import { CONFIG } from "../config";

export const asset = (file: string, alt = "") =>
    `![${alt}](${CONFIG.assetURL}/${file})`;

export const thumb = (src: string) =>
    `<img src="${CONFIG.assetURL}/${src}" width="240"/>`;
