import test from 'tape'
import {DatamapInterface} from './index.js'

var animals = new DatamapInterface({
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})

/* eslint-disable no-use-extend-native/no-use-extend-native */
/* eslint-disable no-extend-native */

test('#get(key)', function (t) {
  t.equal(
    animals.get('shark'),
    'fish',
    'should return the value of an item in the database'
  )

  t.equal(
    animals.get('unicorn'),
    null,
    'should return null if am item is not in the database'
  )

  t.end()
})

test('#has(key)', function (t) {
  t.equal(
    animals.has('shark'),
    true,
    'should return `true` if an item is in the database'
  )

  t.equal(
    animals.has('unicorn'),
    false,
    'should return `false` if an item is in the database'
  )

  // @ts-ignore Check prototype polution.
  Object.prototype.unicorn = 'mammal'

  t.notOk(animals.has('unicorn'), 'should not fail on prototpe extending')

  // @ts-ignore Check prototype polution.
  delete Object.prototype.unicorn

  t.notOk(animals.has('toString'), 'should not fail on native properties (1)')
  t.notOk(
    animals.has('constructor'),
    'should not fail on native properties (2)'
  )
  t.notOk(
    animals.has('hasOwnProperty'),
    'should not fail on native properties (3)'
  )

  t.end()
})

test('#all()', function (t) {
  t.deepEqual(
    animals.all(),
    {
      shark: 'fish',
      tuna: 'fish',
      colugo: 'mammal',
      human: 'mammal'
    },
    'should return all keys/values'
  )

  animals.all().unicorn = 'mammal'

  t.notOk(animals.has('unicorn'), 'should be immutable')

  t.deepEqual(
    animals.all(),
    animals.valueOf(),
    'should be aliased as `valueOf`'
  )

  t.deepEqual(animals.all(), animals.toJSON(), 'should be aliased as `toJSON`')

  t.end()
})

test('#keys()', function (t) {
  t.deepEqual(
    animals.keys(),
    ['shark', 'tuna', 'colugo', 'human'],
    'should return all keys'
  )

  animals.keys().push('unicorn')

  t.notOk(animals.has('unicorn'), 'should be immutable')

  t.end()
})

test('#add() and #remove()', function (t) {
  t.equal(animals.add('unicorn', 'mammal'), animals, '`add` should return self')
  t.ok(animals.has('unicorn'), 'should add items')
  t.equal(animals.remove('unicorn'), animals, '`remove` should return self')
  t.notOk(animals.has('unicorn'), 'should remove items')

  animals.add({unicorn: 'mammal', doge: 'mammal'})

  t.ok(animals.has('unicorn'), 'should add multiple items (1)')
  t.ok(animals.has('doge'), 'should add multiple items (2)')

  animals.remove(['unicorn', 'doge'])

  t.notOk(animals.has('unicorn'), 'should remove multiple items (1)')
  t.notOk(animals.has('doge'), 'should remove multiple items (2)')

  t.notOk(
    animals.remove('unicorn').has('unicorn'),
    'should ignore removing a non-existing item'
  )

  // @ts-ignore Check prototype polution.
  Object.prototype.platypus = 'mammal'

  t.notOk(
    animals.add({unicorn: 'mammal'}).has('platypus'),
    'should not fail on prototpe extending'
  )

  t.end()
})

/* eslint-enable no-use-extend-native/no-use-extend-native */
/* eslint-enable no-extend-native */
