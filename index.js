/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module datamap-interface
 * @fileoverview Simple interface for a map functioning as a database.
 */

'use strict';

/* Dependencies. */
var has = require('has');

/* Expose. */
module.exports = DatamapInterface;

/* Methods. */
var proto = DatamapInterface.prototype;

proto.add = add;
proto.remove = remove;
proto.all = proto.valueOf = proto.toJSON = all;
proto.get = get;
proto.has = proto.is = is;
proto.keys = getKeys;

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
  var self = this;

  if (value) {
    self.map[values] = value;
  } else {
    addAll(self.map, values);
  }

  return self;
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
function remove(keys) {
  var self = this;

  if (typeof keys === 'string') {
    self.map[keys] = undefined;
  } else {
    removeAll(self.map, keys);
  }

  return self;
}

/**
 * Get all values.
 *
 * @this DatamapInterface
 * @return {Object.<string, *>}
 */
function all() {
  var values = {};

  addAll(values, this.map);

  return values;
}

/**
 * Get all keys.
 *
 * @this DatamapInterface
 * @return {Array.<string>}
 */
function getKeys() {
  var result = [];
  var index = -1;

  forPropertyInObject(this.map, function (value, key) {
    result[++index] = key;
  });

  return result;
}

/**
 * Get a value.
 *
 * @this DatamapInterface
 * @param {string} key
 * @return {*}
 */
function get(key) {
  return real(this.map, key) ? this.map[key] : null;
}

/**
 * Whether or not `value` is in context.
 *
 * @this DatamapInterface
 * @param {string} key
 * @return {boolean}
 */
function is(key) {
  return real(this.map, key);
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
    if (real(object, key)) {
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
  var index = -1;
  var length = array.length;

  while (++index < length) {
    callback(array[index], index);
  }
}

/**
 * Detect if a key is defined on an object.
 *
 * @param {Object.<string, *>} object
 * @param {string} key
 * @return {boolean}
 */
function real(object, key) {
  return has(object, key) && object[key] !== undefined;
}
