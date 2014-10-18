'use strict';

/**
 * Dependencies.
 */

var DatamapInterface,
    assert;

DatamapInterface = require('./');
assert = require('assert');

/**
 * Data.
 */

var animals;

animals = new DatamapInterface({
    'shark' : 'fish',
    'tuna' : 'fish',
    'colugo' : 'mammal',
    'human' : 'mammal'
});

describe('DatamapInterface#get(key)', function () {
    it('should return the value of an item in the database', function () {
        assert(animals.get('shark') === 'fish');
    });

    it('should return null if am item is not in the database', function () {
        assert(animals.get('unicorn') === null);
    });
});

describe('DatamapInterface#has(key)', function () {
    it('should return if an item is in the database', function () {
        assert(animals.has('shark') === true);
        assert(animals.has('unicorn') === false);
    });

    it('should not fail on prototpe extending', function () {
        /* eslint-disable no-extend-native */
        Object.prototype.unicorn = 'mammal';

        assert(!animals.has('unicorn'));

        delete Object.prototype.unicorn;
        /* eslint-enable no-extend-native */
    });

    it('should not fail on native properties', function () {
        assert(!animals.has('toString'));
        assert(!animals.has('constructor'));
        assert(!animals.has('hasOwnProperty'));
    });
});

describe('DatamapInterface#all()', function () {
    var all;

    all = animals.all();

    it('should return an object', function () {
        assert(typeof all === 'object');
    });

    it('should return all values in the datamap', function () {
        assert('shark' in all);
        assert('tuna' in all);
        assert('colugo' in all);
        assert('human' in all);
    });

    it('should be immutable', function () {
        all.unicorn = 'mammal';

        assert(!animals.has('unicorn'));
        assert(!('unicorn' in animals.all()));
    });
});

describe('DatamapInterface#add() and DatamapInterface#remove()', function () {
    it('should add and remove an item', function () {
        assert(!animals.has('unicorn'));

        animals.add('unicorn', 'mammal');

        assert(animals.has('unicorn'));

        animals.remove('unicorn');

        assert(!animals.has('unicorn'));
    });

    it('should add and remove multiple values', function () {
        assert(!animals.has('unicorn'));
        assert(!animals.has('doge'));

        animals.add({
            'unicorn' : 'mammal',
            'doge' : 'mammal'
        });

        assert(animals.has('unicorn'));
        assert(animals.has('doge'));

        animals.remove(['unicorn', 'doge']);

        assert(!animals.has('unicorn'));
        assert(!animals.has('doge'));
    });

    it('should fail silently when removing a non-existing item',
        function () {
            assert(animals.has('unicorn') === false);

            animals.remove('unicorn');

            assert(animals.has('unicorn') === false);
        }
    );

    it('should not fail on prototpe extending', function () {
        /* eslint-disable no-extend-native */
        Object.prototype.platypus = 'mammal';

        animals.add({
            'unicorn' : 'mammal'
        });

        assert(!animals.has('platypus'));

        delete Object.prototype.platypus;
        /* eslint-enable no-extend-native */
    });
});
