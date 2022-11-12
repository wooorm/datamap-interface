import assert from 'node:assert/strict'
import test from 'node:test'
import {DatamapInterface} from './index.js'

const animals = new DatamapInterface({
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})

/* eslint-disable no-use-extend-native/no-use-extend-native */
/* eslint-disable no-extend-native */

test('#get(key)', function () {
  assert.equal(
    animals.get('shark'),
    'fish',
    'should return the value of an item in the database'
  )

  assert.equal(
    animals.get('unicorn'),
    null,
    'should return null if am item is not in the database'
  )
})

test('#has(key)', function () {
  assert.equal(
    animals.has('shark'),
    true,
    'should return `true` if an item is in the database'
  )

  assert.equal(
    animals.has('unicorn'),
    false,
    'should return `false` if an item is in the database'
  )

  // @ts-expect-error Check prototype polution.
  // type-coverage:ignore-next-line
  Object.prototype.unicorn = 'mammal'

  assert.ok(!animals.has('unicorn'), 'should not fail on prototpe extending')

  // @ts-expect-error Check prototype polution.
  // type-coverage:ignore-next-line
  delete Object.prototype.unicorn

  assert.ok(
    !animals.has('toString'),
    'should not fail on native properties (1)'
  )
  assert.ok(
    !animals.has('constructor'),
    'should not fail on native properties (2)'
  )
  assert.ok(
    !animals.has('hasOwnProperty'),
    'should not fail on native properties (3)'
  )
})

test('#all()', function () {
  assert.deepEqual(
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

  assert.ok(!animals.has('unicorn'), 'should be immutable')

  assert.deepEqual(
    animals.all(),
    animals.valueOf(),
    'should be aliased as `valueOf`'
  )

  assert.deepEqual(
    animals.all(),
    animals.toJSON(),
    'should be aliased as `toJSON`'
  )
})

test('#keys()', function () {
  assert.deepEqual(
    animals.keys(),
    ['shark', 'tuna', 'colugo', 'human'],
    'should return all keys'
  )

  animals.keys().push('unicorn')

  assert.ok(!animals.has('unicorn'), 'should be immutable')
})

test('#add() and #remove()', function () {
  assert.equal(
    animals.add('unicorn', 'mammal'),
    animals,
    '`add` should return self'
  )
  assert.ok(animals.has('unicorn'), 'should add items')
  assert.equal(
    animals.remove('unicorn'),
    animals,
    '`remove` should return self'
  )
  assert.ok(!animals.has('unicorn'), 'should remove items')

  animals.add({unicorn: 'mammal', doge: 'mammal'})

  assert.ok(animals.has('unicorn'), 'should add multiple items (1)')
  assert.ok(animals.has('doge'), 'should add multiple items (2)')

  animals.remove(['unicorn', 'doge'])

  assert.ok(!animals.has('unicorn'), 'should remove multiple items (1)')
  assert.ok(!animals.has('doge'), 'should remove multiple items (2)')

  assert.ok(
    !animals.remove('unicorn').has('unicorn'),
    'should ignore removing a non-existing item'
  )

  // @ts-expect-error Check prototype polution.
  // type-coverage:ignore-next-line
  Object.prototype.platypus = 'mammal'

  assert.ok(
    !animals.add({unicorn: 'mammal'}).has('platypus'),
    'should not fail on prototpe extending'
  )
})

/* eslint-enable no-use-extend-native/no-use-extend-native */
/* eslint-enable no-extend-native */
