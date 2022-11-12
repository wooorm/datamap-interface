const own = {}.hasOwnProperty

/**
 * A basic interface for a map.
 *
 * @template Item
 */
export class DatamapInterface {
  /**
   * Create a new data map.
   * Values are passed to `#add()`.
   *
   * @param {Record<string, Item>|undefined} [values]
   */
  constructor(values) {
    /** @type {Record<string, Item|undefined>} */
    this.map = {}
    this.add(values)
  }

  /**
   * Add values to map.
   * When the second argument is given, it is treated as a single value and the
   * first parameter as a key.
   * Otherwise, every value in the first argument is added.
   *
   * @param {string|Record<string, Item>|undefined} [values]
   * @param {Item|undefined} [value]
   * @returns {this}
   */
  add(values, value) {
    /** @type {string} */
    let key

    if (typeof values === 'string') {
      this.map[values] = value
    } else if (values) {
      for (key in values) {
        if (own.call(values, key) && values[key] !== undefined) {
          this.map[key] = values[key]
        }
      }
    }

    return this
  }

  /**
   * Remove things from map by key.
   * One or more keys can be given.
   *
   * @param {string|Array<string>} keys
   *   One or more keys.
   * @return {this}
   */
  remove(keys) {
    let index = -1

    if (typeof keys === 'string') {
      this.map[keys] = undefined
    } else {
      while (++index < keys.length) {
        this.map[keys[index]] = undefined
      }
    }

    return this
  }

  /**
   * Get values in map.
   *
   * @returns {Record<string, Item>} Values
   */
  all() {
    /** @type {Record<string, Item>} */
    const values = {}
    /** @type {string} */
    let key

    for (key in this.map) {
      if (own.call(this.map, key)) {
        const value = this.map[key]
        if (value !== undefined) {
          values[key] = value
        }
      }
    }

    return values
  }

  /**
   * Get values in map.
   *
   * @returns {Record<string, Item>} Values
   */
  valueOf() {
    return this.all()
  }

  /**
   * Get values in map.
   *
   * @returns {Record<string, Item>} Values
   */
  toJSON() {
    return this.all()
  }

  /**
   * Get a value from map by key.
   *
   * @param {string} key
   * @returns {Item|null} Value
   */
  get(key) {
    if (own.call(this.map, key)) {
      const value = this.map[key]
      if (value !== undefined) {
        return value
      }
    }

    return null
  }

  /**
   * Whether or not `key` is in context.
   *
   * @param {string} key
   * @returns {boolean} Whether or not `key` is in context.
   */
  is(key) {
    return own.call(this.map, key) && this.map[key] !== undefined
  }

  /**
   * Whether or not `key` is in context.
   *
   * @param {string} key
   * @returns {boolean} Whether or not `key` is in context.
   */
  has(key) {
    return this.is(key)
  }

  /**
   * Get all keys.
   *
   * @returns {string[]} Keys in context.
   */
  keys() {
    /** @type {string[]} */
    const result = []
    /** @type {string} */
    let key

    for (key in this.map) {
      if (own.call(this.map, key) && this.map[key] !== undefined) {
        result.push(key)
      }
    }

    return result
  }
}
