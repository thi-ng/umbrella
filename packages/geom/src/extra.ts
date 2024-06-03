import { Extra } from "./api/extra.js";

/**
 * Dummy shape container for arbitrary Hiccup content, e.g. useful for embedding
 * additional SVG elements (in thi.ng/hiccup syntax) into a shape hierarchy.
 *
 * @remarks
 * Several geom operators have direct support for this shape type, but all of
 * these implementations are logically/semantically a no-op and only present to
 * ensure no breakage if an {@link Extra} instance is part of a {@link Group}.
 *
 * @param body
 */
export const extra = (body: any) => new Extra(body);
