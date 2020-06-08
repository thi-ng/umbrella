import { comment } from "./comment";
import { at_import } from "./import";
import { at_keyframes } from "./keyframes";
import { at_media } from "./media";
import { at_namespace } from "./namespace";
import { at_supports } from "./supports";

/** @internal */
export const QUOTED_FNS = {
    "@comment": comment,
    "@import": at_import,
    "@keyframes": at_keyframes,
    "@media": at_media,
    "@namespace": at_namespace,
    "@supports": at_supports,
};
