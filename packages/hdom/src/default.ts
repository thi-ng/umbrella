import { HDOMImplementation } from "./api";
import { diffTree } from "./diff";
import {
    createTree,
    createElement,
    createTextElement,
    getChild,
    hydrateTree,
    removeAttribs,
    removeChild,
    replaceChild,
    setAttrib,
    setContent
} from "./dom";
import { normalizeTree } from "./normalize";

/**
 * Default target implementation to manipulate browser DOM.
 */
export const DEFAULT_IMPL: HDOMImplementation<any> = {

    createTree(opts, parent, tree, child?) {
        return createTree(opts, this, parent, tree, child);
    },

    hydrateTree(opts, parent, tree, child?) {
        return hydrateTree(opts, this, parent, tree, child);
    },

    diffTree(opts, parent, prev, curr, child?) {
        diffTree(opts, this, parent, prev, curr, child);
    },

    normalizeTree,

    getElementById(id: string) {
        return document.getElementById(id);
    },

    getChild,

    createElement,

    createTextElement,

    replaceChild(opts, parent, child, tree) {
        replaceChild(opts, this, parent, child, tree);
    },

    removeChild,

    setContent,

    removeAttribs,

    setAttrib,
};
