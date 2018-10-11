'use strict';

/**************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 **************************************************************************************************/


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
    return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
    let obj = Object.create(proto);
    return Object.assign(obj, JSON.parse(json))
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()  => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()  => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()        =>    'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Selector {
    constructor(arr) {
        this.arr = arr;
    }

    _getLastEl() {
        return this.arr.slice(-1)[0];
    }

    _getPrefix(el) {
        if (el.includes('::')) {
            return '::';
        } else if (/[A-Za-z]/.test(el[0])) {
            return '_';
        } else {
            return el[0]
        }
    }

    _getPrefixIndex(prefix) {
        const pr = ['#', '.', '[', ':', '::'];
        return pr.indexOf(prefix);
    }


    checkDuplicates(it) {
        if (this.arr.length) {
            if (['_', '#', '::'].some(e => e === this._getPrefix(it))) {
                let a = this.arr.map(e => this._getPrefix(e));
                if (a.filter(e => e === this._getPrefix(it)).length) {
                    throw 'Element, id and pseudo-element should not occur more then one time inside the selector';
                }
            }
        }
        return this;
    }

    checkOrder(it) {
        if (this.arr.length) {
            let elIndex = this._getPrefixIndex(this._getPrefix(it));
            let lastElIndex = this._getPrefixIndex(this._getPrefix(this._getLastEl()));
            if (lastElIndex > elIndex) {
                throw 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
            }
        }
        return this;
    }

    addItem(value) {
        this.arr.push(value);
        return this;
    }
}

class SelectorBuilder {
    constructor(selector) {
        this.selector = selector;
    }

    _newBuilder(value) {
        return new SelectorBuilder(
            new Selector(this.selector.arr.slice())
                .checkDuplicates(value)
                .checkOrder(value)
                .addItem(value));
    }

    css(value) {
        return new SelectorBuilder(
            new Selector(this.selector.arr.slice())
                .addItem(value));
    }

    element(value) {
        return this._newBuilder(value);
    }

    id(value) {
        return this._newBuilder(`#${value}`);
    }

    class(value) {
        return this._newBuilder(`.${value}`);
    }

    attr(value) {
        return this._newBuilder(`[${value}]`);
    }

    pseudoClass(value) {
        return this._newBuilder(`:${value}`);
    }

    pseudoElement(value) {
        return this._newBuilder(`::${value}`);
    }

    combine(builder1, combinator, builder2) {
        return builder1.css(` ${combinator} ` + builder2.stringify());
    }

    stringify() {
        return this.selector.arr.join('');
    }
}

const cssSelectorBuilder = new SelectorBuilder(new Selector([]));

module.exports = {
    Rectangle: Rectangle,
    getJSON: getJSON,
    fromJSON: fromJSON,
    cssSelectorBuilder: cssSelectorBuilder
};
