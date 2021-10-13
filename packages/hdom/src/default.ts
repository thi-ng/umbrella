import type { HDOMImplementation } from "./api.js";
import { diffTree } from "./diff.js";
import {
    createElement,
    createTextElement,
    createTree,
    getChild,
    hydrateTree,
    removeAttribs,
    removeChild,
    replaceChild,
    setAttrib,
    setContent,
} from "./dom.js";
import { normalizeTree } from "./normalize.js";

/**
 * Default target implementation to manipulate browser DOM.
 */
export const DEFAULT_IMPL: HDOMImplementation<any> = {
    createTree(opts, parent, tree, child?, init?) {
        return createTree(opts, this, parent, tree, child, init);
    },

    hydrateTree(opts, parent, tree, child?) {
        return hydrateTree(opts, this, parent, tree, child);
    },

    diffTree(opts, parent, prev, curr, child?) {
        diffTree(opts, this, parent, prev, curr, child);
    },

    normalizeTree,

    getElementById(id: string): any | null {
        return document.getElementById(id);
    },

    getChild,

    createElement,

    createTextElement,

    replaceChild(opts, parent, child, tree, init?) {
        replaceChild(opts, this, parent, child, tree, init);
    },

    removeChild,

    setContent,

    removeAttribs,

    setAttrib,
};
