/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
// @observablehq/stdlib v3.3.1 Copyright 2020 Observable, Inc.
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).observablehq = e.observablehq || {})
}(this, function (e) {
    "use strict";

    async function t(e) {
        const t = await fetch(await e.url());
        if (!t.ok) throw new Error(`Unable to load file: ${e.name}`);
        return t
    }

    class n {
        constructor(e, t) {
            Object.defineProperties(this, {_url: {value: e}, name: {value: t, enumerable: !0}})
        }

        async url() {
            return this._url
        }

        async blob() {
            return (await t(this)).blob()
        }

        async arrayBuffer() {
            return (await t(this)).arrayBuffer()
        }

        async text() {
            return (await t(this)).text()
        }

        async json() {
            return (await t(this)).json()
        }

        async stream() {
            return (await t(this)).body
        }

        async image() {
            const e = await this.url();
            return new Promise((t, n) => {
                const r = new Image;
                new URL(e, document.baseURI).origin !== new URL(location).origin && (r.crossOrigin = "anonymous"), r.onload = () => t(r), r.onerror = () => n(new Error(`Unable to load file: ${this.name}`)), r.src = e
            })
        }
    }

    function r(e) {
        throw new Error(`File not found: ${e}`)
    }

    const o = new Map, i = [], a = i.map, u = i.some, l = i.hasOwnProperty, s = "https://cdn.jsdelivr.net/npm/",
        c = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/, f = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/, d = /\.[^/]*$/,
        m = ["unpkg", "jsdelivr", "browser", "main"];

    class RequireError extends Error {
        constructor(e) {
            super(e)
        }
    }

    function h(e) {
        const t = c.exec(e);
        return t && {name: t[1], version: t[2], path: t[3]}
    }

    function w(e) {
        const t = `${s}${e.name}${e.version ? `@${e.version}` : ""}/package.json`;
        let n = o.get(t);
        return n || o.set(t, n = fetch(t).then(e => {
            if (!e.ok) throw new RequireError("unable to load package.json");
            return e.redirected && !o.has(e.url) && o.set(e.url, n), e.json()
        })), n
    }

    RequireError.prototype.name = RequireError.name;
    var v = p(async function (e, t) {
        if (e.startsWith(s) && (e = e.substring(s.length)), /^(\w+:)|\/\//i.test(e)) return e;
        if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
        if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e)) throw new RequireError("illegal name");
        const n = h(e);
        if (!n) return `${s}${e}`;
        if (!n.version && null != t && t.startsWith(s)) {
            const e = await w(h(t.substring(s.length)));
            n.version = e.dependencies && e.dependencies[n.name] || e.peerDependencies && e.peerDependencies[n.name]
        }
        if (n.path && !d.test(n.path) && (n.path += ".js"), n.path && n.version && f.test(n.version)) return `${s}${n.name}@${n.version}/${n.path}`;
        const r = await w(n);
        return `${s}${r.name}@${r.version}/${n.path || function (e) {
            for (const t of m) {
                const n = e[t];
                if ("string" == typeof n) return d.test(n) ? n : `${n}.js`
            }
        }(r) || "index.js"}`
    });

    function p(e) {
        const t = new Map, n = o(null);

        function r(e) {
            console.log(e);
            if ("string" != typeof e) return e;
            let n = t.get(e);
            return n || t.set(e, n = new Promise((t, n) => {
                const r = document.createElement("script");
                r.onload = () => {
                    try {
                        t(i.pop()(o(e)))
                    } catch (e) {
                        n(new RequireError("invalid module"))
                    }
                    r.remove()
                }, r.onerror = () => {
                    n(new RequireError("unable to load module")), r.remove()
                }, r.async = !0, r.src = e, window.define = x, document.head.appendChild(r)
            })), n
        }

        function o(t) {
            return n => Promise.resolve(e(n, t)).then(r)
        }

        function u(e) {
            return arguments.length > 1 ? Promise.all(a.call(arguments, n)).then(b) : n(e)
        }

        return u.alias = function (t) {
            return p((n, r) => n in t && (r = null, "string" != typeof (n = t[n])) ? n : e(n, r))
        }, u.resolve = e, u
    }

    function b(e) {
        const t = {};
        for (const n of e) for (const e in n) l.call(n, e) && (null == n[e] ? Object.defineProperty(t, e, {get: g(n, e)}) : t[e] = n[e]);
        return t
    }

    function g(e, t) {
        return () => e[t]
    }

    function y(e) {
        return "exports" === (e += "") || "module" === e
    }

    function x(e, t, n) {
        const r = arguments.length;
        r < 2 ? (n = e, t = []) : r < 3 && (n = t, t = "string" == typeof e ? [] : e), i.push(u.call(t, y) ? e => {
            const r = {}, o = {exports: r};
            return Promise.all(a.call(t, t => "exports" === (t += "") ? r : "module" === t ? o : e(t))).then(e => (n.apply(null, e), o.exports))
        } : e => Promise.all(a.call(t, e)).then(e => "function" == typeof n ? n.apply(null, e) : n))
    }

    function E(e) {
        return function () {
            return e
        }
    }

    x.amd = {};
    var P = {
        math: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    var j = 0;

    function k(e) {
        this.id = e, this.href = new URL(`#${e}`, location) + ""
    }

    k.prototype.toString = function () {
        return "url(" + this.href + ")"
    };
    var L = {
        canvas: function (e, t) {
            var n = document.createElement("canvas");
            return n.width = e, n.height = t, n
        }, context2d: function (e, t, n) {
            null == n && (n = devicePixelRatio);
            var r = document.createElement("canvas");
            r.width = e * n, r.height = t * n, r.style.width = e + "px";
            var o = r.getContext("2d");
            return o.scale(n, n), o
        }, download: function (e, t = "untitled", n = "Save") {
            const r = document.createElement("a"), o = r.appendChild(document.createElement("button"));

            async function i() {
                await new Promise(requestAnimationFrame), URL.revokeObjectURL(r.href), r.removeAttribute("href"), o.textContent = n, o.disabled = !1
            }

            return o.textContent = n, r.download = t, r.onclick = async t => {
                if (o.disabled = !0, r.href) return i();
                o.textContent = "Saving…";
                try {
                    const t = await ("function" == typeof e ? e() : e);
                    o.textContent = "Download", r.href = URL.createObjectURL(t)
                } catch (e) {
                    o.textContent = n
                }
                if (t.eventPhase) return i();
                o.disabled = !1
            }, r
        }, element: function (e, t) {
            var n, r = e += "", o = r.indexOf(":");
            o >= 0 && "xmlns" !== (r = e.slice(0, o)) && (e = e.slice(o + 1));
            var i = P.hasOwnProperty(r) ? document.createElementNS(P[r], e) : document.createElement(e);
            if (t) for (var a in t) o = (r = a).indexOf(":"), n = t[a], o >= 0 && "xmlns" !== (r = a.slice(0, o)) && (a = a.slice(o + 1)), P.hasOwnProperty(r) ? i.setAttributeNS(P[r], a, n) : i.setAttribute(a, n);
            return i
        }, input: function (e) {
            var t = document.createElement("input");
            return null != e && (t.type = e), t
        }, range: function (e, t, n) {
            1 === arguments.length && (t = e, e = null);
            var r = document.createElement("input");
            return r.min = e = null == e ? 0 : +e, r.max = t = null == t ? 1 : +t, r.step = null == n ? "any" : n = +n, r.type = "range", r
        }, select: function (e) {
            var t = document.createElement("select");
            return Array.prototype.forEach.call(e, function (e) {
                var n = document.createElement("option");
                n.value = n.textContent = e, t.appendChild(n)
            }), t
        }, svg: function (e, t) {
            var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            return n.setAttribute("viewBox", [0, 0, e, t]), n.setAttribute("width", e), n.setAttribute("height", t), n
        }, text: function (e) {
            return document.createTextNode(e)
        }, uid: function (e) {
            return new k("O-" + (null == e ? "" : e + "-") + ++j)
        }
    };
    var $ = {
        buffer: function (e) {
            return new Promise(function (t, n) {
                var r = new FileReader;
                r.onload = function () {
                    t(r.result)
                }, r.onerror = n, r.readAsArrayBuffer(e)
            })
        }, text: function (e) {
            return new Promise(function (t, n) {
                var r = new FileReader;
                r.onload = function () {
                    t(r.result)
                }, r.onerror = n, r.readAsText(e)
            })
        }, url: function (e) {
            return new Promise(function (t, n) {
                var r = new FileReader;
                r.onload = function () {
                    t(r.result)
                }, r.onerror = n, r.readAsDataURL(e)
            })
        }
    };

    function A() {
        return this
    }

    function N(e, t) {
        let n = !1;
        if ("function" != typeof t) throw new Error("dispose is not a function");
        return {
            [Symbol.iterator]: A,
            next: () => n ? {done: !0} : (n = !0, {done: !1, value: e}),
            return: () => (n = !0, t(e), {done: !0}),
            throw: () => ({done: n = !0})
        }
    }

    function O(e) {
        let t, n, r = !1;
        const o = e(function (e) {
            n ? (n(e), n = null) : r = !0;
            return t = e
        });
        if (null != o && "function" != typeof o) throw new Error("function" == typeof o.then ? "async initializers are not supported" : "initializer returned something, but not a dispose function");
        return {
            [Symbol.iterator]: A,
            throw: () => ({done: !0}),
            return: () => (null != o && o(), {done: !0}),
            next: function () {
                return {done: !1, value: r ? (r = !1, Promise.resolve(t)) : new Promise(e => n = e)}
            }
        }
    }

    function C(e) {
        switch (e.type) {
            case"range":
            case"number":
                return e.valueAsNumber;
            case"date":
                return e.valueAsDate;
            case"checkbox":
                return e.checked;
            case"file":
                return e.multiple ? e.files : e.files[0];
            case"select-multiple":
                return Array.from(e.selectedOptions, e => e.value);
            default:
                return e.value
        }
    }

    var M = {
        disposable: N, filter: function* (e, t) {
            for (var n, r = -1; !(n = e.next()).done;) t(n.value, ++r) && (yield n.value)
        }, input: function (e) {
            return O(function (t) {
                var n = function (e) {
                    switch (e.type) {
                        case"button":
                        case"submit":
                        case"checkbox":
                            return "click";
                        case"file":
                            return "change";
                        default:
                            return "input"
                    }
                }(e), r = C(e);

                function o() {
                    t(C(e))
                }

                return e.addEventListener(n, o), void 0 !== r && t(r), function () {
                    e.removeEventListener(n, o)
                }
            })
        }, map: function* (e, t) {
            for (var n, r = -1; !(n = e.next()).done;) yield t(n.value, ++r)
        }, observe: O, queue: function (e) {
            let t;
            const n = [], r = e(function (e) {
                n.push(e), t && (t(n.shift()), t = null);
                return e
            });
            if (null != r && "function" != typeof r) throw new Error("function" == typeof r.then ? "async initializers are not supported" : "initializer returned something, but not a dispose function");
            return {
                [Symbol.iterator]: A,
                throw: () => ({done: !0}),
                return: () => (null != r && r(), {done: !0}),
                next: function () {
                    return {done: !1, value: n.length ? Promise.resolve(n.shift()) : new Promise(e => t = e)}
                }
            }
        }, range: function* (e, t, n) {
            e = +e, t = +t, n = (o = arguments.length) < 2 ? (t = e, e = 0, 1) : o < 3 ? 1 : +n;
            for (var r = -1, o = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < o;) yield e + r * n
        }, valueAt: function (e, t) {
            if (!(!isFinite(t = +t) || t < 0 || t != t | 0)) for (var n, r = -1; !(n = e.next()).done;) if (++r === t) return n.value
        }, worker: function (e) {
            const t = URL.createObjectURL(new Blob([e], {type: "text/javascript"})), n = new Worker(t);
            return N(n, () => {
                n.terminate(), URL.revokeObjectURL(t)
            })
        }
    };

    function R(e, t) {
        return function (n) {
            var r, o, i, a, u, l, s, c, f = n[0], d = [], m = null, h = -1;
            for (u = 1, l = arguments.length; u < l; ++u) {
                if ((r = arguments[u]) instanceof Node) d[++h] = r, f += "\x3c!--o:" + h + "--\x3e"; else if (Array.isArray(r)) {
                    for (s = 0, c = r.length; s < c; ++s) (o = r[s]) instanceof Node ? (null === m && (d[++h] = m = document.createDocumentFragment(), f += "\x3c!--o:" + h + "--\x3e"), m.appendChild(o)) : (m = null, f += o);
                    m = null
                } else f += r;
                f += n[u]
            }
            if (m = e(f), ++h > 0) {
                for (i = new Array(h), a = document.createTreeWalker(m, NodeFilter.SHOW_COMMENT, null, !1); a.nextNode();) o = a.currentNode, /^o:/.test(o.nodeValue) && (i[+o.nodeValue.slice(2)] = o);
                for (u = 0; u < h; ++u) (o = i[u]) && o.parentNode.replaceChild(d[u], o)
            }
            return 1 === m.childNodes.length ? m.removeChild(m.firstChild) : 11 === m.nodeType ? ((o = t()).appendChild(m), o) : m
        }
    }

    var U = R(function (e) {
        var t = document.createElement("template");
        return t.innerHTML = e.trim(), document.importNode(t.content, !0)
    }, function () {
        return document.createElement("span")
    });
    const S = "https://cdn.jsdelivr.net/npm/@observablehq/highlight.js@2.0.0/";

    function F(e) {
        return function () {
            return e("marked@0.3.12/marked.min.js").then(function (t) {
                return R(function (n) {
                    var r = document.createElement("div");
                    r.innerHTML = t(n, {langPrefix: ""}).trim();
                    var o = r.querySelectorAll("pre code[class]");
                    return o.length > 0 && e(S + "highlight.min.js").then(function (t) {
                        o.forEach(function (n) {
                            function r() {
                                t.highlightBlock(n), n.parentNode.classList.add("observablehq--md-pre")
                            }

                            t.getLanguage(n.className) ? r() : e(S + "async-languages/index.js").then(r => {
                                if (r.has(n.className)) return e(S + "async-languages/" + r.get(n.className)).then(e => {
                                    t.registerLanguage(n.className, e)
                                })
                            }).then(r, r)
                        })
                    }), r
                }, function () {
                    return document.createElement("div")
                })
            })
        }
    }

    function q(e) {
        let t;
        Object.defineProperties(this, {
            generator: {value: O(e => void (t = e))},
            value: {get: () => e, set: n => t(e = n)}
        }), void 0 !== e && t(e)
    }

    function* D() {
        for (; ;) yield Date.now()
    }

    var T = new Map;

    function W(e, t) {
        var n;
        return (n = T.get(e = +e)) ? n.then(E(t)) : (n = Date.now()) >= e ? Promise.resolve(t) : function (e, t) {
            var n = new Promise(function (n) {
                T.delete(t);
                var r = t - e;
                if (!(r > 0)) throw new Error("invalid time");
                if (r > 2147483647) throw new Error("too long to wait");
                setTimeout(n, r)
            });
            return T.set(t, n), n
        }(n, e).then(E(t))
    }

    var _ = {
        delay: function (e, t) {
            return new Promise(function (n) {
                setTimeout(function () {
                    n(t)
                }, e)
            })
        }, tick: function (e, t) {
            return W(Math.ceil((Date.now() + 1) / e) * e, t)
        }, when: W
    };

    function z(e, t) {
        if (/^(\w+:)|\/\//i.test(e)) return e;
        if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
        if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e)) throw new Error("illegal name");
        return "https://unpkg.com/" + e
    }

    function B(e) {
        return null == e ? v : p(e)
    }

    var H = R(function (e) {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
        return t.innerHTML = e.trim(), t
    }, function () {
        return document.createElementNS("http://www.w3.org/2000/svg", "g")
    }), I = String.raw;

    function V(e) {
        return new Promise(function (t, n) {
            var r = document.createElement("link");
            r.rel = "stylesheet", r.href = e, r.onerror = n, r.onload = t, document.head.appendChild(r)
        })
    }

    function G(e) {
        return function () {
            return Promise.all([e("@observablehq/katex@0.11.1/dist/katex.min.js"), e.resolve("@observablehq/katex@0.11.1/dist/katex.min.css").then(V)]).then(function (e) {
                var t = e[0], n = r();

                function r(e) {
                    return function () {
                        var n = document.createElement("div");
                        return t.render(I.apply(String, arguments), n, e), n.removeChild(n.firstChild)
                    }
                }

                return n.options = r, n.block = r({displayMode: !0}), n
            })
        }
    }

    function X() {
        return O(function (e) {
            var t = e(document.body.clientWidth);

            function n() {
                var n = document.body.clientWidth;
                n !== t && e(t = n)
            }

            return window.addEventListener("resize", n), function () {
                window.removeEventListener("resize", n)
            }
        })
    }

    var J = Object.assign(function (e) {
        const t = B(e);
        Object.defineProperties(this, {
            DOM: {value: L, writable: !0, enumerable: !0},
            FileAttachment: {value: E(r), writable: !0, enumerable: !0},
            Files: {value: $, writable: !0, enumerable: !0},
            Generators: {value: M, writable: !0, enumerable: !0},
            html: {value: E(U), writable: !0, enumerable: !0},
            md: {value: F(t), writable: !0, enumerable: !0},
            Mutable: {value: E(q), writable: !0, enumerable: !0},
            now: {value: D, writable: !0, enumerable: !0},
            Promises: {value: _, writable: !0, enumerable: !0},
            require: {value: E(t), writable: !0, enumerable: !0},
            resolve: {value: E(z), writable: !0, enumerable: !0},
            svg: {value: E(H), writable: !0, enumerable: !0},
            tex: {value: G(t), writable: !0, enumerable: !0},
            width: {value: X, writable: !0, enumerable: !0}
        })
    }, {resolve: v.resolve});
    e.FileAttachments = function (e) {
        return t => {
            const r = e(t += "");
            if (null == r) throw new Error(`File not found: ${t}`);
            return new n(r, t)
        }
    }, e.Library = J, Object.defineProperty(e, "__esModule", {value: !0})
});
