import { Dummy } from "./api/dummy.js";

/**
 * Dummy shape container for arbitrary Hiccup content, e.g. useful for embedding
 * additional SVG elements (in thi.ng/hiccup syntax) into a shape hierarchy.
 *
 * @param body
 */
export const dummy = (body: any) => new Dummy(body);
