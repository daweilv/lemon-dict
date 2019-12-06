class jqLite {
    constructor(selector, ctx) {
        if (typeof selector === 'string') {
            this.elems = Array.from(ctx.querySelectorAll(selector));
        } else {
            if (selector) {
                if (selector.length) {
                    this.elems = Array.from(selector);
                } else {
                    this.elems = [selector];
                }
            } else {
                this.elems = null;
            }
        }
    }

    text() {
        if (!this.elems) return '';
        let s = '';
        for (let i = 0; i < this.elems.length; i++) {
            s += this.elems[i].textContent;
        }
        return s.trim();
    }

    attr(attr) {
        if (!this.elems) return null;
        return this.elems.reduce((acc, o) => acc + o.getAttribute(attr), '');
    }

    find(selector) {
        if (!this.elems) return null;
        return $(selector, this.elems);
    }

    eq(idx) {
        if (!this.elems || idx >= this.elems.length || idx < 0) return null;
        return $(this.elems[idx]);
    }

    map(callback) {
        return this.elems.map(callback);
    }
}

function $(selector, ctx) {
    return new jqLite(selector, ctx);
}

export default $;
