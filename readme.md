# datamap-interface

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

A basic interface for a map.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install datamap-interface
```

## Use

```js
import {DatamapInterface} from 'datamap-interface'

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

This package exports the following identifiers: `DatamapInterface`.
There is no default export.

### DatamapInterface(values)

`DatamapInterface` is a constructor, which can be passed an object.

```js
import {DatamapInterface} from 'datamap-interface'

var animals = new DatamapInterface({
  unicorn: 'mystical creature',
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})
```

### `DatamapInterface([values])`

Create a new instance.
Values are passed to [`#add()`][add].

###### Example

```js
import {DatamapInterface} from 'datamap-interface'

var animals = new DatamapInterface({
  unicorn: 'mystical creature',
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})
```

### `DatamapInterface#has(value)`

### `DatamapInterface#is(value)`

Check if `value` is in the map.

###### Example

```js
animals.has('unicorn') // => true
animals.has('rainbow') // => false
```

### `DatamapInterface#get(key)`

Get the value of `key`, or `null`.

###### Example

```js
animals.get('unicorn') // => 'mystical creature'
animals.get('rainbow') // => null
```

### `DatamapInterface#add(values)`

Add each value, or one pair.

###### Example

```js
animals.add('giant grouper', 'fish')

animals.add({dragon: 'mystical creature'})
```

### `DatamapInterface#remove([values])`

Remove each value.

###### Example

```js
animals.remove(['giant grouper', 'human'])
animals.remove('dragon')
```

### `DatamapInterface#keys()`

Get each key in the map.

###### Example

```js
animals.keys() // => ['shark', 'tuna', 'colugo', 'unicorn']
```

### `DatamapInterface#all()`

### `DatamapInterface#valueOf()`

### `DatamapInterface#toJSON()`

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

[build-badge]: https://github.com/wooorm/datamap-interface/workflows/main/badge.svg

[build]: https://github.com/wooorm/datamap-interface/actions

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
