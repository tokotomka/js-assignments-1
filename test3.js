class MySuperBaseElementSelector {
    element (value) {
        this.value = value;
        return this;
    }

    id(value) {
        this.value = value;
        return this;
    }

    class(value) {
        this.value = value;
        return this;
    }

    attr(value) {
        this.value = value;
        return this;
    }

    pseudoClass (value) {
        this.value = value;
        return this;
    }

    pseudoElement(value) {
        this.value = value;
        return this;
    }

    checkOrder() {
        this.value = value;
    }

    checkOccur() {
        this.value = value;
    }

    stringify() {
        return `${this.element} ${this.class}`
    }
}

const cssSelectorBuilder = {
    element: function (value) {
        return new MySuperBaseElementSelector().element(value);
    },

    id: function (value) {
        return new MySuperBaseElementSelector().element(value);
    },

    class: function (value) {
        return new MySuperBaseElementSelector().class(value);
    },

    attr: function (value) {
        return new MySuperBaseElementSelector().element(value);
    },

    pseudoClass: function (value) {
        return new MySuperBaseElementSelector().element(value);
    },

    pseudoElement: function (value) {
        return new MySuperBaseElementSelector().element(value);
    },

    combine: function (selector1, combinator, selector2) {
        throw new Error('Not implemented');
    },

    // stringify() {
    //     return this.element, this.class;
    // }
};

var builder = cssSelectorBuilder;

console.log(builder.element('a').class('c').class('l').attr('href$=".png"').pseudoClass('focus').pseudoElement('a').stringify());
