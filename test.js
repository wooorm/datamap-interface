'use strict'

var test = require('tape')
var Interface = require('.')

var animals = new Interface({
  shark: 'fish',
  tuna: 'fish',
  colugo: 'mammal',
  human: 'mammal'
})

/* eslint-disable no-use-extend-native/no-use-extend-native */
/* eslint-disable no-extend-native */

test('#get(key)', function(t) {
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

test('#has(key)', function(t) {
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

  Object.prototype.unicorn = 'mammal'

  t.notOk(animals.has('unicorn'), 'should not fail on prototpe extending')

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

test('#all()', function(t) {
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

  t.end()
})

test('#keys()', function(t) {
  t.deepEqual(
    animals.keys(),
    ['shark', 'tuna', 'colugo', 'human'],
    'should return all keys'
  )

  animals.keys().push('unicorn')

  t.notOk(animals.has('unicorn'), 'should be immutable')

  t.end()
})

test('#add() and #remove()', function(t) {
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

  Object.prototype.platypus = 'mammal'

  t.notOk(
    animals.add({unicorn: 'mammal'}).has('platypus'),
    'should not fail on prototpe extending'
  )

  t.end()
})
