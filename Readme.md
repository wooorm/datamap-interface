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
    mammals;

mammals = new DatamapInterface([
    'common vampire bat',
    'virginia opossum',
    'eastern grey kangaroo',
    'tasmanian devil',
    'human',
    'northern elephant seal',
    'fox squirrel',
    'tree pangolin',
    'african elephant',
    'platypus',
    'colugo',
    'reindeer',
    'humpback whale',
    'star-nosed mole',
    'giant panda',
    'giant armadillo',
    'plains zebra',
    'black and rufous elephant shrew'
]);

mammals.is('human'); // true
mammals.is('unicorn'); // false

mammals.add('unicorn');
mammals.is('unicorn'); // true

mammals.remove('unicorn');
mammals.is('unicorn'); // false
```

## API

### DatamapInterface(values)

**datamap-interface** exports a constructor, which can be passed an array.

```js
var DatamapInterface = require('datamap-interface'),
    fish;

fish = new DatamapInterface(['shark', 'tuna']);
```

The following functions are available on the instance:

### DatamapInterface#is(word)

```js
fish.is('shark'); // true
fish.is('human'); // false
```

Returns whether (true) or not (false) a given word is a filler word.

### DatamapInterface#add(word...)

```js
fish.add('giant grouper', 'red lionfish');
```

Adds all arguments to the internal database.
Given values are **NOT** validated.

### DatamapInterface#remove(word...)

```js
fish.remove('giant grouper', 'reindeer');
```

Removes all arguments from the internal database.
Given values are **NOT** validated; no error is thrown when non-existent values are removed.

### DatamapInterface#all()

```js
fish.all(); // ['shark', 'tuna', 'red lionfish']
```

Return the values (as an Array) in the internal database.

## License

MIT © Titus Wormer
