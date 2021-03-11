var own = {}.hasOwnProperty

// Interface for a map of items.
export class DatamapInterface {
  constructor(values) {
    this.map = {}
    this.add(values)
  }

  // Add values to map.
  // When the second argument is given, it is treated as a single value and the
  // first parameter as a key.
  // Otherwise, every value in the first argument is added.
  add(values, value) {
    var key

    if (value) {
      this.map[values] = value
    } else {
      for (key in values) {
        if (own.call(values, key) && values[key] !== undefined) {
          this.map[key] = values[key]
        }
      }
    }

    return this
  }

  // Remove keys from map.
  // When the second argument is given, it is treated as a single value and the
  // first parameter as a key.
  // Otherwise, every value in the first argument is added.
  remove(keys) {
    var index = -1

    if (typeof keys === 'string') {
      this.map[keys] = undefined
    } else {
      while (++index < keys.length) {
        this.map[keys[index]] = undefined
      }
    }

    return this
  }

  // Get all values.
  all() {
    var values = {}
    var key

    for (key in this.map) {
      if (own.call(this.map, key) && this.map[key] !== undefined) {
        values[key] = this.map[key]
      }
    }

    return values
  }

  valueOf() {
    return this.all()
  }

  toJSON() {
    return this.all()
  }

  // Get a value.
  get(key) {
    return own.call(this.map, key) && this.map[key] !== undefined
      ? this.map[key]
      : null
  }

  // Whether or not `value` is in context.
  is(key) {
    return own.call(this.map, key) && this.map[key] !== undefined
  }

  has(key) {
    return this.is(key)
  }

  // Get all keys.
  keys() {
    var result = []
    var key

    for (key in this.map) {
      if (own.call(this.map, key) && this.map[key] !== undefined) {
        result.push(key)
      }
    }

    return result
  }
}
