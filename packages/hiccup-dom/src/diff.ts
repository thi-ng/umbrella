import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import * as diff from "@thi.ng/diff";

// import { DEBUG } from "./api";
import { createDOM, removeAttribs, setAttrib, removeChild } from "./dom";

const diffArray = diff.diffArray;
const diffObject = diff.diffObject;

export function diffElement(parent: Element, prev: any, curr: any) {
    _diffElement(parent, prev, curr, 0);
}

function _diffElement(parent: Element, prev: any, curr: any, child: number) {
    const delta = diffArray(prev, curr);
    if (delta.distance === 0) {
        return;
    }
    const edits = delta.linear;
    const el = parent.children[child];
    if (edits[0][0] !== 0 || prev[1].key !== curr[1].key || hasChangedEvents(prev[1], curr[1])) {
        // DEBUG && console.log("replace:", prev, curr);
        releaseDeep(prev);
        removeChild(parent, child);
        createDOM(parent, curr, undefined, child);
        return;
    }
    if (prev.__release && prev.__release !== curr.__release) {
        releaseDeep(prev);
    }
    if (curr.__init && prev.__init !== curr.__init) {
        // DEBUG && console.log("call __init", curr);
        curr.__init.apply(curr, [el, ...(curr.__args)]);
    }
    if (edits[1][0] !== 0) {
        diffAttributes(el, prev[1], curr[1]);
    }
    const equivKeys = extractEquivElements(edits);
    const n = edits.length;
    const noff = prev.length - 1;
    const offsets = [];
    let i, j, k, eq;
    for (i = noff; i >= 2; i--) {
        offsets[i] = i - 2;
    }
    for (i = 2; i < n; i++) {
        const e = edits[i], status = e[0], idx = e[1], val = e[2];
        // DEBUG && console.log(`edit: o:[${offsets.toString()}] i:${idx} s:${status}`, val);
        if (status === -1) {
            if (isArray(val)) {
                k = val[1].key;
                if (k !== undefined && equivKeys[k][2] !== undefined) {
                    eq = equivKeys[k];
                    k = eq[0];
                    // DEBUG && console.log(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);
                    _diffElement(el, prev[k], curr[eq[2]], offsets[k]);
                } else {
                    // DEBUG && console.log("remove @", offsets[idx], val);
                    releaseDeep(val);
                    removeChild(el, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j] = Math.max(offsets[j] - 1, 0);
                    }
                }
            } else if (isString(val)) {
                el.textContent = "";
            }
        } else if (status === 1) {
            if (isString(val)) {
                el.textContent = val;
            } else if (isArray(val)) {
                k = val[1].key;
                if (k === undefined || (k && equivKeys[k][0] === undefined)) {
                    // DEBUG && console.log("insert @", offsets[idx], val);
                    createDOM(el, val, undefined, offsets[idx]);
                    for (j = noff; j >= idx; j--) {
                        offsets[j]++;
                    }
                }
            }
        }
    }
}

function releaseDeep(tag: any) {
    if (isArray(tag)) {
        if ((<any>tag).__release) {
            // DEBUG && console.log("call __release", tag);
            (<any>tag).__release.apply(tag, (<any>tag).__args);
            delete (<any>tag).__release;
        }
        for (let i = tag.length - 1; i >= 2; i--) {
            releaseDeep(tag[i]);
        }
    }
}

function hasChangedEvents(prev: any, curr: any) {
    for (let k in curr) {
        if (k.indexOf("on") === 0 && prev[k] !== curr[k]) {
            return true;
        }
    }
    return false;
}

function diffAttributes(el: Element, prev: any, curr: any) {
    let i, e, edits;
    const delta = diffObject(prev, curr);
    removeAttribs(el, delta.dels);
    for (edits = delta.edits, i = edits.length - 1; i >= 0; i--) {
        e = edits[i];
        setAttrib(el, e[0], e[1]);
    }
    for (edits = delta.adds, i = edits.length - 1; i >= 0; i--) {
        e = edits[i];
        setAttrib(el, e, curr[e]);
    }
}

function extractEquivElements(edits: diff.DiffLogEntry<any>[]) {
    let k;
    const equiv = {};
    for (let i = edits.length - 1; i >= 0; i--) {
        const e = edits[i];
        const v = e[2];
        if (isArray(v) && (k = v[1].key) !== undefined) {
            equiv[k] = equiv[k] || [, ,];
            equiv[k][e[0] + 1] = e[1];
        }
    }
    return equiv;
}
