'use strict';

/**
 * Cache.
 */

var isOwnProperty;

isOwnProperty = Object.prototype.hasOwnProperty;

/**
 * An interface for a map of items.
 *
 * @constructor
 * @param {Object.<string, *>} values
 */

function DatamapInterface(values) {
    this.map = {};

    this.add(values);
}

/**
 * Detect if a key is defined on an object.
 *
 * @param {Object.<string, *>} object
 * @param {string} key
 * @return {boolean}
 */

function has(object, key) {
    return isOwnProperty.call(object, key) && object[key] !== undefined;
}

/**
 * Loop over an `Object`.
 *
 * @param {Object.<string, *>} object
 * @param {function(string, *)} callback
 */

function forPropertyInObject(object, callback) {
    var key;

    for (key in object) {
        if (has(object, key)) {
            callback(object[key], key);
        }
    }
}

/**
 * Loop over an `Array`.
 *
 * @param {Array.<*>} array
 * @param {function(*, number)} callback
 */

function forValueInArray(array, callback) {
    var index,
        length;

    index = -1;
    length = array.length;

    while (++index < length) {
        callback(array[index], index);
    }
}

/**
 * Add all `values` to `object`.
 *
 * @param {Object.<string, *>} object
 * @param {Object.<string, *>} values
 */

function addAll(object, values) {
    forPropertyInObject(values, function (value, key) {
        object[key] = value;
    });
}

/**
 * Remove every key in `keys` from `object`.
 *
 * @param {Object.<string, *>} object
 * @param {Array.<string>} keys
 */

function removeAll(object, keys) {
    forValueInArray(keys, function (key) {
        object[key] = undefined;
    });
}

/**
 * Add values to map.
 *
 * When the second argument is passed, it is treated as
 * a single value and the first parameter as a key.
 * Otherwise, every value in the first argument is added.
 *
 * @this DatamapInterface
 * @param {Object.<string, *>|string} values
 * @param {*} value
 */

function add(values, value) {
    if (value) {
        this.map[values] = value;
    } else {
        addAll(this.map, values);
    }
}

/**
 * Remove keys from map.
 *
 * When the second argument is passed, it is treated as
 * a single value and the first parameter as a key.
 * Otherwise, every value in the first argument is added.
 *
 * @this DatamapInterface
 * @param {Array.<string>|string} keys
 */

function remove(values) {
    if (typeof values === 'string') {
        this.map[values] = undefined;
    } else {
        removeAll(this.map, values);
    }
}

/**
 * Get all values.
 *
 * @this DatamapInterface
 * @return {Object.<string, *>}
 */

function all() {
    var values;

    values = {};

    addAll(values, this.map);

    return values;
}

/**
 * Get a value.
 *
 * @this DatamapInterface
 * @param {string} key
 * @return {*}
 */

function get(key) {
    return has(this.map, key) ? this.map[key] : null;
}

/**
 * Whether or not `value` is in context.
 *
 * @this DatamapInterface
 * @param {*} value
 * @return {boolean}
 */

function datamapHas(key) {
    return has(this.map, key);
}

/**
 * Expose methods on prototype.
 */

var datamapInterfacePrototype;

datamapInterfacePrototype = DatamapInterface.prototype;

datamapInterfacePrototype.add = add;

datamapInterfacePrototype.remove = remove;

datamapInterfacePrototype.all = all;

datamapInterfacePrototype.get = get;

datamapInterfacePrototype.has = datamapHas;

/**
 * Expose `DatamapInterface`.
 */

module.exports = DatamapInterface;
