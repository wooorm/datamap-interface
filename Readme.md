# datamap-interface [![Build Status](https://travis-ci.org/wooorm/datamap-interface.svg?branch=master)](https://travis-ci.org/wooorm/datamap-interface) [![Coverage Status](https://img.shields.io/coveralls/wooorm/datamap-interface.svg)](https://coveralls.io/r/wooorm/datamap-interface?branch=master)

A simple interface for a map functioning as a database.

## Installation

npm:
```sh
$ npm install datamap-interface
```

Component.js:
```sh
$ component install wooorm/datamap-interface
```

Component.js:
```sh
$ bower install datamap-interface
```

## Usage

```js
var DatamapInterface = require('datamap-interface'),
    animals;

animals = new DatamapInterface({
    'shark' : 'fish',
    'tuna' : 'fish',
    'colugo' : 'mammal',
    'human' : 'mammal'
});

animals.get('human'); // 'mammal'
animals.get('unicorn'); // null

animals.add('unicorn', 'mammal');
animals.get('unicorn'); // 'mammal'

animals.remove('unicorn');
animals.has('unicorn'); // false
```

## API

### DatamapInterface(values)

**datamap-interface** exports a constructor, which can be passed an object.

```js
var DatamapInterface = require('datamap-interface'),
    fish;

animals = new DatamapInterface({
    'unicorn' : 'mystical creature',
    'shark' : 'fish',
    'tuna' : 'fish',
    'colugo' : 'mammal',
    'human' : 'mammal'
});
```

The following functions are available on the instance:

### DatamapInterface#has(key)

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

Gets the value for `key` in map, or `null`.

### DatamapInterface#add(key, value)

```js
animals.add('giant grouper', 'fish');

animals.add({
    'dragon' : 'mystical creature'
});
```

Either adds the key/value pair to the map, or every key/value pair in the first argument.

### DatamapInterface#remove(keys)

```js
animals.remove(['giant grouper', 'human']);
animals.remove('dragon');
```

Removes `keys` or every key in `keys`.

Given values are **NOT** validated; no error is thrown when non-existent values are removed.

### DatamapInterface#all()

```js
animals.all();
/* {
 *    'shark' : 'fish',
 *    'tuna' : 'fish',
 *    'colugo' : 'mammal',
 *    'unicorn' : 'mystical creature'
 * }
 */
```

Return the values (as an Object) in the internal database.

## License

MIT © Titus Wormer
