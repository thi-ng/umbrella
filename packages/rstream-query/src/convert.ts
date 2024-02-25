import { isArray } from "@thi.ng/checks/is-array";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { concat } from "@thi.ng/transducers/concat";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { pairs } from "@thi.ng/transducers/pairs";

let NEXT_ID = 0;

const mapBNode = (s: any, p: any, o: any): IterableIterator<any[]> => {
	const id = `__b${NEXT_ID++}__`;
	return concat([[s, p, id]], asTriples(o, id));
};

const mapSubject =
	(subject: any) =>
	([p, o]: [any, any]) => {
		if (isArray(o)) {
			return mapcat(
				(o) =>
					isPlainObject(o)
						? mapBNode(subject, p, o)
						: [[subject, p, o]],
				o
			);
		} else if (isPlainObject(o)) {
			return mapBNode(subject, p, o);
		}
		return [[subject, p, o]];
	};

/**
 * Converts given object into an iterable of triples, with the following
 * conversion rules:
 *
 * - Toplevel object keys are used as subjects and MUST each have a
 *   plain object as value, where its keys are used as predicates and
 *   values as objects (in the SPO sense).
 * - Plain objects in SPO object position are translated into unique IDs
 *   in order to allow the nested map to become a subject itself. In RDF
 *   terms, this is equivalent to BNodes.
 * - Arrays in SPO object position cause multiple triples with same
 *   subject & predicate to be emitted. If any of the items in the array
 *   is a plain object, it will be treated as BNode and transformed as
 *   described in the previous rule
 *
 * @example
 * ```ts
 * import { asTriples } from "@thi.ng/rstream-query";
 *
 * src = {
 *   "@thi.ng/rstream-query": {
 *     type: "project",
 *     author: "toxi",
 *     tag: ["ES6", "TypeScript", "graph"]
 *   },
 *   toxi: {
 *     type: "person",
 *     hasAccount: [
 *       {type: "twitter", id: "toxi"},
 *       {type: "github", id: "postspectacular"}
 *     ]
 *   }
 * };
 *
 * [...asTriples(src)]
 * // [ [ '@thi.ng/rstream-query', 'type', 'project' ],
 * //   [ '@thi.ng/rstream-query', 'author', 'toxi' ],
 * //   [ '@thi.ng/rstream-query', 'tag', 'ES6' ],
 * //   [ '@thi.ng/rstream-query', 'tag', 'TypeScript' ],
 * //   [ '@thi.ng/rstream-query', 'tag', 'graph' ],
 * //   [ 'toxi', 'type', 'person' ],
 * //   [ 'toxi', 'hasAccount', '__b0__' ],
 * //   [ '__b0__', 'type', 'twitter' ],
 * //   [ '__b0__', 'id', 'toxi' ],
 * //   [ 'toxi', 'hasAccount', '__b1__' ],
 * //   [ '__b1__', 'type', 'github' ],
 * //   [ '__b1__', 'id', 'postspectacular' ] ]
 * ```
 *
 * @param obj -
 * @param subject - internal use only, do not specify!
 */
export const asTriples = (obj: any, subject?: any) =>
	mapcat(
		subject === undefined
			? ([s, v]: any) => mapcat(mapSubject(s), <any>pairs(v))
			: mapSubject(subject),
		pairs(obj)
	);
