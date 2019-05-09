'use strict'

module.exports = DatamapInterface

var own = {}.hasOwnProperty

var proto = DatamapInterface.prototype

proto.add = add
proto.remove = remove
proto.all = all
proto.valueOf = all
proto.toJSON = all
proto.get = get
proto.has = is
proto.is = is
proto.keys = getKeys

// Interface for a map of items.
function DatamapInterface(values) {
  this.map = {}
  this.add(values)
}

// Add all `values` to `object`.
function addAll(object, values) {
  forPropertyInObject(values, set)

  function set(value, key) {
    object[key] = value
  }
}

// Remove every key in `keys` from `object`.
function removeAll(object, keys) {
  forValueInArray(keys, unset)

  function unset(key) {
    object[key] = undefined
  }
}

// Add values to map.
// When the second argument is given, it is treated as a single value and the
// first parameter as a key.
// Otherwise, every value in the first argument is added.
function add(values, value) {
  var self = this

  if (value) {
    self.map[values] = value
  } else {
    addAll(self.map, values)
  }

  return self
}

// Remove keys from map.
// When the second argument is given, it is treated as a single value and the
// first parameter as a key.
// Otherwise, every value in the first argument is added.
function remove(keys) {
  var self = this

  if (typeof keys === 'string') {
    self.map[keys] = undefined
  } else {
    removeAll(self.map, keys)
  }

  return self
}

// Get all values.
function all() {
  var values = {}

  addAll(values, this.map)

  return values
}

// Get all keys.
function getKeys() {
  var result = []
  var index = -1

  forPropertyInObject(this.map, push)

  return result

  function push(value, key) {
    result[++index] = key
  }
}

// Get a value.
function get(key) {
  return real(this.map, key) ? this.map[key] : null
}

// Whether or not `value` is in context.
function is(key) {
  return real(this.map, key)
}

// Loop over an `Object`.
function forPropertyInObject(object, callback) {
  var key

  for (key in object) {
    if (real(object, key)) {
      callback(object[key], key)
    }
  }
}

// Loop over an `Array`.
function forValueInArray(array, callback) {
  var index = -1
  var length = array.length

  while (++index < length) {
    callback(array[index], index)
  }
}

// Detect if a key is defined on an object.
function real(object, key) {
  return own.call(object, key) && object[key] !== undefined
}
