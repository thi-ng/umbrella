import type { Stringer } from "./api";

const src = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
const dest = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
const re = new RegExp(src.split("").join("|"), "g");

/**
 * Based on:
 * {@link https://medium.com/@matthagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1}
 *
 * @example
 * ```ts
 * slugify("Me, myself (& ëye)!")
 * // "me-myself-and-eye"
 * ```
 *
 * @param str -
 */
export const slugify: Stringer<string> = (str: string) => {
    return str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(re, (c) => dest[src.indexOf(c)])
        .replace(/&+/g, "-and-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-{2,}/g, "-")
        .replace(/(^-+)|(-+$)/g, "");
};

/**
 * Similar to {@link slugify}, however uses GitHub's anchor naming rules
 * for headings in markdown files (AFAICT).
 *
 * @example
 * ```ts
 * slugifyGH("Me, myself (& ëye)!")
 * // "me--myself--eye"
 * ```
 *
 * @param str
 */
export const slugifyGH = (str: string) => {
    return str
        .toLowerCase()
        .replace(/\s/g, "-")
        .replace(re, (c) => dest[src.indexOf(c)])
        .replace(/[^\w\-]+/g, "")
        .replace(/(^-+)|(-+$)/g, "");
};
