class jqLite {
    constructor(selector, ctx) {
        if (typeof selector === 'string') {
            this.elems = ctx.querySelectorAll(selector);
        } else {
            this.elems = selector;
        }
    }
    text() {
        if (!this.elems) return '';
        let s = '';
        for (let i = 0; i < this.elems.length; i++) {
            s += this.elems[i].innerText;
        }
        return s.trim();
    }

    attr(attr) {
        if (!this.elems) return null;
        return this.elems.getAttribute(attr);
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
        return Array.from(this.elems).map(callback);
    }
}

function $(selector, ctx) {
    return new jqLite(selector, ctx);
}

export default $;
