/**
 * Takes an object of RDF/XML prefixes and returns formatted string for
 * the RDFa `prefix` attribute.
 *
 * @example
 * ```ts
 * import { formatPrefixes } from "@thi.ng/hiccup";
 * import { foaf, xsd } from "@thi.ng/prefixes";
 *
 * formatPrefixes({ foaf, xsd })
 * // "foaf: http://xmlns.com/foaf/0.1/ rdf: http://www.w3.org/2001/XMLSchema#"
 * ```
 *
 * @param prefixes -
 */
export const formatPrefixes = (prefixes: Record<string, string>) =>
	Object.keys(prefixes)
		.reduce(
			(acc, k) => (acc.push(`${k}: ${prefixes[k]}`), acc),
			<string[]>[]
		)
		.join(" ");
