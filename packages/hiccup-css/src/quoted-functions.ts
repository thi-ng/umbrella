import { comment } from "./comment.js";
import { at_import } from "./import.js";
import { at_keyframes } from "./keyframes.js";
import { at_media } from "./media.js";
import { at_namespace } from "./namespace.js";
import { at_supports } from "./supports.js";

/** @internal */
export const QUOTED_FNS = {
    "@comment": comment,
    "@import": at_import,
    "@keyframes": at_keyframes,
    "@media": at_media,
    "@namespace": at_namespace,
    "@supports": at_supports,
};
