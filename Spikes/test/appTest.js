const assert = require('chai').assert;
const app = require('../app');
const sayHello = require('../app').sayHello;
const addNumbers = require('../app').addNumbers;
const divideNumbers = require('../app').divideNumbers;
const multiplyNumbers = require('../app').multiplyNumbers;
const moduleNumbers = require('../app').moduleNumbers;

describe('App', function(){
  it('Checks string values', function(){
    assert.equal(sayHello(), 'hello');
  });

  it('check function types', function(){
    assert.typeOf(sayHello(), 'string');
  });

  it('Checks node js addition', function(){
    assert.isAbove(addNumbers(5,5), 5);
  });

  it('Checks type of number', function(){
    assert.typeOf(addNumbers(5,5), 'number');
  });

  it('Checks if passowrd is hashed', function(){
    assert.typeOf(divideNumbers(50,5), 'number');
  });

  it('Checks if fieldl is empty', function(){
    assert.typeOf(multiplyNumbers(10,5), 'number');
  });

  it('moduleNumbers should return type number', function(){
    assert.typeOf(moduleNumbers(42,5), 'number');
  });

  it('multiplyNumbers should equal 25', function(){
    assert.equal(multiplyNumbers(5,5), 25);
  });

  it('divideNumbers should equal 5', function(){
    assert.equal(divideNumbers(25,5), 5);
  });

  it('addNumbers should equal 10', function(){
    assert.equal(addNumbers(5,5), 10);
  });



});
