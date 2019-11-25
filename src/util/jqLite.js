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

  find(selector) {
    if (!this.elems) return null;
    return $(selector, this.elems);
  }

  map(callback) {
    return Array.from(this.elems).map(callback);
  }
}

function $(selector, ctx) {
  return new jqLite(selector, ctx);
}

export default $;
