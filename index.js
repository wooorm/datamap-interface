'use strict';

var datamapInterfacePrototype, isOwnProperty;

isOwnProperty = Object.prototype.hasOwnProperty;

function DatamapInterface(values) {
    this.map = {};
    this.add(values);
}

datamapInterfacePrototype = DatamapInterface.prototype;

function has(object, property) {
    return isOwnProperty.call(object, property) &&
        object[property] !== undefined;
}

function forPropertyInObject(object, callback) {
    var property;

    for (property in object) {
        if (has(object, property)) {
            callback(property, object[property]);
        }
    }
}

function forValueInArray(array, callback) {
    var iterator = -1,
        length = array.length;

    while (++iterator < length) {
        callback(array[iterator], iterator);
    }
}

function add(object, property, value) {
    object[property] = value;
}

function addAll(object, values) {
    forPropertyInObject(values, function (property, value) {
        add(object, property, value);
    });
}

function remove(object, property) {
    object[property] = undefined;
}

function removeAll(object, array) {
    forValueInArray(array, function (property) {
        remove(object, property);
    });
}

function getProperty(object, property) {
    return has(object, property) ? object[property] : null;
}

datamapInterfacePrototype.add = function (values, value) {
    if (value) {
        add(this.map, values, value);
    } else {
        addAll(this.map, values);
    }
};

datamapInterfacePrototype.remove = function (values) {
    (typeof values === 'string' ? remove : removeAll)(this.map, values);
};

datamapInterfacePrototype.all = function () {
    var values = {};

    addAll(values, this.map);

    return values;
};

datamapInterfacePrototype.get = function (property) {
    return getProperty(this.map, property);
};

datamapInterfacePrototype.has = function (property) {
    return has(this.map, property);
};

exports = module.exports = DatamapInterface;
