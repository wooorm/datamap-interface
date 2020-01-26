# datamap-interface

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A basic interface for a map.

## Install

[npm][]:

```sh
npm install datamap-interface
```

## Use

```js
var DatamapInterface = require('datamap-interface')

var animals = new DatamapInterface({
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})

animals.get('human') // => 'mammal'
animals.get('unicorn') // => null

animals.add('unicorn', 'mammal').get('unicorn') // => 'mammal'

animals.remove('unicorn').has('unicorn') // => false
```

## API

### DatamapInterface(values)

**datamap-interface** exports a constructor, which can be passed an object.

```js
var DatamapInterface = require('datamap-interface')

var animals = new DatamapInterface({
  unicorn: 'mystical creature',
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})
```

## API

### `datamapInterface([values])`

Create a new instance.
Values are passed to [`#add()`][add].

###### Example

```js
var DatamapInterface = require('datamap-interface')

var animals = new DatamapInterface({
  unicorn: 'mystical creature',
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})
```

### `datamapInterface#has(value)`

### `datamapInterface#is(value)`

Check if `value` is in the map.

###### Example

```js
animals.has('unicorn') // => true
animals.has('rainbow') // => false
```

### `datamapInterface#get(key)`

Get the value of `key`, or `null`.

###### Example

```js
animals.get('unicorn') // => 'mystical creature'
animals.get('rainbow') // => null
```

### `datamapInterface#add(values)`

Add each value, or one pair.

###### Example

```js
animals.add('giant grouper', 'fish')

animals.add({dragon: 'mystical creature'})
```

### `datamapInterface#remove([values])`

Remove each value.

###### Example

```js
animals.remove(['giant grouper', 'human'])
animals.remove('dragon')
```

### `datamapInterface#keys()`

Get each key in the map.

###### Example

```js
animals.keys() // => ['shark', 'tuna', 'colugo', 'unicorn']
```

### `datamapInterface#all()`

### `datamapInterface#valueOf()`

### `datamapInterface#toJSON()`

Return the list as an `Object`.

###### Example

```js
animals.all()
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
    — Basic interface for a list functioning as a database

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/datamap-interface.svg

[build]: https://travis-ci.org/wooorm/datamap-interface

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/datamap-interface.svg

[coverage]: https://codecov.io/github/wooorm/datamap-interface

[downloads-badge]: https://img.shields.io/npm/dm/datamap-interface.svg

[downloads]: https://www.npmjs.com/package/datamap-interface

[size-badge]: https://img.shields.io/bundlephobia/minzip/datamap-interface.svg

[size]: https://bundlephobia.com/result?p=datamap-interface

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[add]: #datamapinterfaceaddvalues
