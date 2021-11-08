import type { IObjectOf } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { HDOMImplementation, HDOMOpts } from "@thi.ng/hdom";
import { diffTree } from "@thi.ng/hdom/diff";
import { createTree, hydrateTree } from "@thi.ng/hdom/dom";
import { normalizeTree } from "@thi.ng/hdom/normalize";

export const TEXT = Symbol();

export class HDOMNode {
    /**
     * Only real child nodes
     */
    children: HDOMNode[];
    /**
     * Includes real children AND text nodes
     */
    _children: HDOMNode[];

    listeners: IObjectOf<EventListener[]>;

    value: any;
    checked: boolean | undefined;

    tag: string | symbol;
    attribs: IObjectOf<any>;
    style: IObjectOf<any> | undefined;
    body: string | undefined;

    constructor(tag: string | symbol, attribs = {}) {
        this.tag = tag;
        this.children = [];
        this._children = [];
        this.attribs = attribs;
        this.listeners = {};
    }

    get textContent() {
        const res = [];
        for (let c of this._children) {
            if (c.isText()) {
                res.push(c.body);
            }
        }
        return res.join("");
    }

    set textContent(body: string) {
        const txt = new HDOMNode(TEXT);
        txt.body = body;
        this._children = [txt];
        this.children = [];
    }

    isText() {
        return this.tag === TEXT;
    }

    insertBefore(c: HDOMNode, i: number) {
        const existing = this.children[i];
        if (existing) {
            !this.isText() && this.children.splice(i, 0, c);
            this._children.splice(this._children.indexOf(existing), 0, c);
        } else {
            this.appendChild(c);
        }
        return c;
    }

    appendChild(c: HDOMNode) {
        !c.isText() && this.children.push(c);
        this._children.push(c);
        return c;
    }

    removeChild(i: number) {
        const c = this.children[i];
        if (c) {
            this.children.splice(i, 1);
            this._children.splice(this._children.indexOf(c), 1);
        }
    }

    getElementById(id: string): HDOMNode | null {
        if (this.attribs.id === id) return this;
        let c: HDOMNode | null;
        for (c of this.children) {
            c = c.getElementById(id);
            if (c) return c;
        }
        return null;
    }

    toHiccup(): any {
        if (this.isText()) {
            return this.body;
        }
        const attr = { ...this.attribs };
        this.style && (attr.style = this.style);
        this.value != null && (attr.value = this.value);
        this.checked && (attr.checked = true);
        return [this.tag, attr, ...this._children.map((c) => c.toHiccup())];
    }
}

export class MockHDOM implements HDOMImplementation<HDOMNode> {
    root: HDOMNode;

    constructor(root: HDOMNode) {
        this.root = root;
    }

    normalizeTree(opts: Partial<HDOMOpts>, tree: any): any[] {
        return normalizeTree(opts, tree);
    }

    createTree(
        opts: Partial<HDOMOpts>,
        parent: HDOMNode,
        tree: any,
        child?: number
    ): HDOMNode | HDOMNode[] {
        return createTree(opts, this, parent, tree, child);
    }

    hydrateTree(
        opts: Partial<HDOMOpts>,
        parent: HDOMNode,
        tree: any,
        child?: number
    ) {
        return hydrateTree(opts, this, parent, tree, child);
    }

    diffTree(
        opts: Partial<HDOMOpts>,
        parent: HDOMNode,
        prev: any[],
        curr: any[],
        child?: number
    ) {
        diffTree(opts, this, parent, prev, curr, child);
    }

    createElement(
        parent: HDOMNode,
        tag: string,
        attribs?: any,
        insert?: number
    ) {
        const el = new HDOMNode(tag);
        if (parent) {
            if (insert == null) {
                parent.appendChild(el);
            } else {
                parent.insertBefore(el, insert);
            }
        }
        if (attribs) {
            this.setAttribs(el, attribs);
        }
        return el;
    }

    createTextElement(parent: HDOMNode, content: string) {
        const el = new HDOMNode(TEXT);
        el.body = content;
        parent && parent.appendChild(el);
        return el;
    }

    getElementById(id: string): HDOMNode | null {
        return this.root.getElementById(id);
    }

    replaceChild(
        opts: Partial<HDOMOpts>,
        parent: HDOMNode,
        child: number,
        tree: any
    ) {
        this.removeChild(parent, child);
        return this.createTree(opts, parent, tree, child);
    }

    getChild(parent: HDOMNode, i: number) {
        return parent.children[i];
    }

    removeChild(parent: HDOMNode, i: number) {
        parent.removeChild(i);
    }

    setAttribs(el: HDOMNode, attribs: any) {
        for (let k in attribs) {
            this.setAttrib(el, k, attribs[k], attribs);
        }
        return el;
    }

    setAttrib(el: HDOMNode, id: string, val: any, attribs?: any) {
        if (id.startsWith("__")) return;
        const isListener = id.indexOf("on") === 0;
        if (!isListener && typeof val === "function") {
            val = val(attribs);
        }
        if (val !== undefined && val !== false) {
            switch (id) {
                case "style":
                    this.setStyle(el, val);
                    break;
                case "value":
                    el.value = val;
                    break;
                case "checked":
                    el[id] = val;
                    break;
                default:
                    if (isListener) {
                        const lid = id.substr(2);
                        const listeners = el.listeners[lid];
                        (listeners || (el.listeners[lid] = [])).push(val);
                    } else {
                        el.attribs[id] = val;
                    }
            }
        } else {
            (<any>el)[id] != null
                ? ((<any>el)[id] = null)
                : delete el.attribs[id];
        }
        return el;
    }

    removeAttribs(el: HDOMNode, attribs: string[], prev: any) {
        for (let i = attribs.length; i-- > 0; ) {
            const a = attribs[i];
            if (a.indexOf("on") === 0) {
                const listeners = el.listeners[a.substr(2)];
                if (listeners) {
                    const i = listeners.indexOf(prev[a]);
                    i >= 0 && listeners.splice(i, 1);
                }
            } else {
                (<any>el)[a] ? ((<any>el)[a] = null) : delete el.attribs[a];
            }
        }
    }

    setContent(el: HDOMNode, value: any) {
        el.textContent = value;
    }

    setStyle(el: HDOMNode, rules: IObjectOf<any>) {
        for (let r in rules) {
            let v = rules[r];
            isFunction(v) && (v = v(rules));
            v != null && ((el.style || (el.style = {}))[r] = v);
        }
    }
}
