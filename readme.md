# datamap-interface [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

A simple interface for a map.

## Installation

[npm][]:

```bash
npm install datamap-interface
```

## Usage

```js
var DatamapInterface = require('datamap-interface');

var animals = new DatamapInterface({
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
});

animals.get('human'); //=> 'mammal'
animals.get('unicorn'); //=> null

animals.add('unicorn', 'mammal').get('unicorn'); //=> 'mammal'

animals.remove('unicorn').has('unicorn'); //=> false
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

## API

### `datamapInterface([values])`

Create a new instance.  Values are passed to [`#add()`][add].

###### Example

```js
var DatamapInterface = require('datamap-interface');

var animals = new DatamapInterface({
  unicorn: 'mystical creature',
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
});
```

### `datamapInterface#has(value)`

### `datamapInterface#is(value)`

Check if `value` is in the map.

###### Example

```js
animals.has('unicorn'); //=> true
animals.has('rainbow'); //=> false
```

### `datamapInterface#get(key)`

Get the value of `key`, or `null`.

###### Example

```js
animals.get('unicorn'); //=> 'mystical creature'
animals.get('rainbow'); //=> null
```

### `datamapInterface#add(values)`

Add each value, or one pair.

###### Example

```js
animals.add('giant grouper', 'fish');

animals.add({dragon : 'mystical creature'});
```

### `datamapInterface#remove([values])`

Remove each value.

###### Example

```js
animals.remove(['giant grouper', 'human']);
animals.remove('dragon');
```

### `datamapInterface#keys()`

Get each key in the map.

###### Example

```js
animals.keys(); //=> ['shark', 'tuna', 'colugo', 'unicorn']
```

### `datamapInterface#all()`

### `datamapInterface#valueOf()`

### `datamapInterface#toJSON()`

Return the list as an `Object`.

###### Example

```js
animals.all();
```

Yields:

```js
{
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  unicorn: 'mystical creature'
}
```

## Related

*   [datalist-interface](https://github.com/wooorm/datalist-interface)
    — Simple interface for a list functioning as a database

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/datamap-interface.svg

[travis]: https://travis-ci.org/wooorm/datamap-interface

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/datamap-interface.svg

[codecov]: https://codecov.io/github/wooorm/datamap-interface

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[add]: #datamapinterfaceaddvalues
