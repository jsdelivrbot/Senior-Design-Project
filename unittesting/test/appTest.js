const assert = require('chai').assert;
const app = require('../app');
const sayHello = require('../app').sayHello;
const addNumbers = require('../app').addNumbers;

describe('App', function(){
  it('app should return hello', function(){
    assert.equal(sayHello(), 'hello');
  });

  it('app should return type string', function(){
    assert.typeOf(sayHello(), 'string');
  });

  it('addNumbers should be above 5', function(){
    assert.isAbove(addNumbers(5,5), 5);
  });

  it('addNumbers should return type number', function(){
    assert.typeOf(addNumbers(5,5), 'number');
  });



  
});
