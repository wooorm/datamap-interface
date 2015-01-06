# datamap-interface [![Build Status](https://img.shields.io/travis/wooorm/datamap-interface.svg?style=flat)](https://travis-ci.org/wooorm/datamap-interface) [![Coverage Status](https://img.shields.io/coveralls/wooorm/datamap-interface.svg?style=flat)](https://coveralls.io/r/wooorm/datamap-interface?branch=master)

A simple interface for a map.

## Installation

npm:
```sh
$ npm install datamap-interface
```

Component.js:
```sh
$ component install wooorm/datamap-interface
```

Bower:
```sh
$ bower install datamap-interface
```

## Usage

```js
var DatamapInterface = require('datamap-interface');

var animals = new DatamapInterface({
    'shark' : 'fish',
    'tuna' : 'fish',
    'colugo' : 'mammal',
    'human' : 'mammal'
});

animals.get('human'); // 'mammal'
animals.get('unicorn'); // null

animals.add('unicorn', 'mammal').get('unicorn'); // 'mammal'

animals.remove('unicorn').has('unicorn'); // false
```

## API

### DatamapInterface(values)

**datamap-interface** exports a constructor, which can be passed an object.

```js
var DatamapInterface = require('datamap-interface');

var animals = new DatamapInterface({
    'unicorn' : 'mystical creature',
    'shark' : 'fish',
    'tuna' : 'fish',
    'colugo' : 'mammal',
    'human' : 'mammal'
});
```

### DatamapInterface#has(key)

> Alias: `DatamapInterface#is()`

```js
animals.has('unicorn'); // true
animals.has('rainbow'); // false
```

Returns whether (`true`) or not (`false`) a `key` is in the map.

### DatamapInterface#get(key)

```js
animals.get('unicorn'); // 'mystical creature'
animals.get('rainbow'); // null
```

Get the value for `key` in map, or `null`.

### DatamapInterface#add()

```js
animals.add('giant grouper', 'fish');

animals.add({
    'dragon' : 'mystical creature'
});
```

- `DatamapInterface#add(key, value)`: Add `value` as `key` to map;
- `DatamapInterface#add(values)`: Add every item in `values` to map.

Returns self.

### DatamapInterface#remove(keys)

```js
animals.remove(['giant grouper', 'human']);
animals.remove('dragon');
```

- `DatamapInterface#remove(key)`: Remove `key` from map;
- `DatamapInterface#remove(keys)`: Remove every key in `keys` from map.

Returns self. No error is thrown when non-existent values are removed.

### DatamapInterface#keys()

```js
animals.keys(); // ['shark', 'tuna', 'colugo', 'unicorn']
```

Return the map as an `Object`.


### DatamapInterface#all()

> Alias: `DatamapInterface#valueOf()`, `DatamapInterface#toJSON()`

```js
animals.all();
/**
 * {
 *    'shark' : 'fish',
 *    'tuna' : 'fish',
 *    'colugo' : 'mammal',
 *    'unicorn' : 'mystical creature'
 * }
 */
```

Return the map as an `Object`.

## License

[MIT](LICENSE) © [Titus Wormer](http;//wooorm.com)
