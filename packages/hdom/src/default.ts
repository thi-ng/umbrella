import { HDOMImplementation } from "./api";
import { diffTree } from "./diff";
import { normalizeTree } from "./normalize";
import {
    createDOM,
    getChild,
    hydrateDOM,
    removeAttribs,
    removeChild,
    replaceChild,
    setAttrib,
    setContent,
} from "./dom";

/**
 * Default target implementation to manipulate browser DOM.
 */
export const DEFAULT_IMPL: HDOMImplementation<any> = {
    createTree: createDOM,
    hydrateTree: hydrateDOM,
    diffTree,
    normalizeTree,
    getChild,
    replaceChild,
    removeChild,
    setContent,
    removeAttribs,
    setAttrib,
};
