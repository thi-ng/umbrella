import type { Fn3, IDeref, ILogger, IObjectOf } from "@thi.ng/api";
import { isNode } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";

export interface Node {
    $id: string;
    [id: string]: any;
}

export interface NodeRef extends IDeref<Node | undefined> {
    $ref: string;
}

export type Nodes = Record<string, Node>;

export type Prefixes = Record<string, string>;

export interface ParseOpts {
    /**
     * If true, parser will include referenced source files and read tagged
     * `#file` values.
     *
     * @defaultValue true
     */
    includes: boolean;
    /**
     * If true, `#ref`-tagged values will be resolved and used as value instead
     * of their referred node ID. Circular dependencies ARE supported.
     *
     * If false, `#ref` values will be stored as {@link NodeRef} values in the
     * result object to allow them to be identified as references.
     *
     * In both cases, if the `prefixes` option is enabled, the referenced IDs
     * will/might first be expanded (iff they match the `prefix:name` pattern).
     *
     * @defaultValue false
     */
    resolve: boolean;
    /**
     * If true, IDs of the `prefix:name` form, will be expanded using
     * pre-declared `@prefix`es. If enabled and a prefix cannot be resolved, the
     * parser will throw an error.
     *
     * Prefixes can be overridden on a per-file basis. If an included file
     * defines its own prefixes, they will only be in scope for triples defined
     * in that file.
     *
     * @defaultValue false
     */
    prefixes: boolean;
    /**
     * If true, tagged `#gpg` values will be decrypted. NodeJS only and requires
     * GPG with all keys used to encrypt the values installed on host.
     *
     * @defaultValue false
     */
    decrypt: boolean;
    [id: string]: any;
}

/**
 * Function signature for tagged value parsers.
 */
export type TagParser = Fn3<string, string, ParseContext, any>;

export interface ParseContext {
    cwd: string;
    file: string;
    prefixes: Prefixes;
    nodes: Nodes;
    tags: IObjectOf<TagParser>;
    defaultTag?: TagParser;
    opts: Partial<ParseOpts>;
    logger: ILogger;
}

export const IS_NODE = isNode();

export const NODE_ONLY = () => unsupported("only available in NodeJS");
