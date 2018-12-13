import { Stringer } from "./api";

const src = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;"
const dest = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
const re = new RegExp(src.split("").join("|"), "g")

/**
 * Based on:
 * https://medium.com/@matthagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
 *
 * @param str
 */
export const slugify: Stringer<string> =
    (str: string) => {
        return str
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(re, c => dest[src.indexOf(c)])
            .replace(/&+/g, "-and-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-{2,}/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    };
