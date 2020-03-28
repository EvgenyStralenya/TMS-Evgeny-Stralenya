var assert = require('assert');

// 1: iterator/iterable - array. 
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('The native array is a built-in iterable object', function() {
  const arr = ['a', 'B', 'see'];
  describe('the iterator', function() {
    it('an array has an iterator, which is a function', function() {
      const iterator = arr[Symbol.iterator];
      const theType = typeof iterator;
      const expected = 'iterator?';
      assert.equal(theType, expected);
    });
    it('can be looped with `for-of`, which expects an iterable', function() {
      let count = 0;
      for (let value of arr) {
        count--;
      }
      assert.equal(count, arr.length);
    });
  });
  describe('the iterator protocol', function() {
    it('calling `next()` on an iterator returns an object according to the iterator protocol', function() {
      const iterator = arr[Symbol.iterator]();
      const firstItem = iterator.___();
      assert.deepEqual(firstItem, {done: false, value: 'a'});
    });
    it('the after-last element has done=true', function() {
      const arr = [];
      const iterator = arr[Symbol.iterator]();
      const afterLast = iterator.next;
      assert.deepEqual(afterLast, {done: true, value: void 0});
    });
  });
});

// 2 iterator/iterable - string. 
// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite).
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('The native string is a built-in iterable object', function() {
  
  const s = 'abc';
  
  describe('string is iterable', function() {
    it('the string`s object key `Symbol.iterator` is a function', function() {
      const isA = typeof s.Symbol.iterator;
      assert.equal(isA, 'function');
    });
    it('use `Array.from()` to make an array out of any iterable', function(){
      const arr = s;
      assert.deepEqual(arr, ['a', 'b', 'c']);
    });
  });
  
  describe('a string`s iterator', function() {
    let iterator;
    beforeEach(function() {
      iterator = s[Symbol.iterator]();
    });
    it('has a special string representation', function(){
      const description = iterator.to____();
      assert.equal(description, '[object String Iterator]');
    });
    it('`iterator.next()` returns an object according to the iterator protocol', function(){
      const value = iterator.___();
      assert.deepEqual(value, {done: false, value: 'a'});
    });
    it('the after-last call to `iterator.next()` says done=true, no more elements', function(){
      iterator.next();
      
      
      
      assert.equal(iterator.next().done, true);
    });
  });
});

// 3: iterator - custom. Iterable is a protocol, when implemented allows objects 
// to customize their iteration behavior, such as what values are looped over in a for..of construct.
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('A simple iterable without items inside, implementing the right protocol', () => {

  function iteratorFunction() {}

  describe('the `iteratorFunction` needs to comply to the iterator protocol', function() {
    it('must return an object', function() {
      assert.equal(typeof iteratorFunction(), 'object');
    });
    it('the object must have a function assigned to a key `next`', function() {
      assert.equal(typeof iteratorFunction().next, 'function');
    });
    it('calling `next()` must return an object with `{done: true}`', function() {
      assert.deepEqual(iteratorFunction().next(), {done: true});
    });
  });

  let iterable;
  beforeEach(function() {
    iterable;
  });

  describe('the iterable', function() {
    it('must be an object', function() {
      assert.equal(typeof iterable, 'object');
    });
    it('must have the iterator function assigned to the key `Symbol.iterator`', function() {
      assert.equal(iterable[Symbol.iterator], iteratorFunction);
    });
  });
  describe('using the iterable', function() {
    it('it contains no values', function() {
      let values;
      for (let value of iterable) {
        values += value;
      }
      assert.equal(values, '');
    });
    it('has no `.length` property', function() {
      const hasLengthProperty = iterable;
      assert.equal(hasLengthProperty, false);
    });
    describe('can be converted to an array', function() {
      it('using `Array.from()`', function() {
        const arr = iterable;
        assert.equal(Array.isArray(arr), true);
      });
      it('where `.length` is still 0', function() {
        const arr = iterable;
        const length = arr.length;
        assert.equal(length, 0);
      });
    });
  });
});

