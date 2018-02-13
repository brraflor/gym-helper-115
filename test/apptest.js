//import chai
const assert = require('chai').assert;
//import server.js
//const server = require('../server');


const tst = require('../server').tst;
const tsttwo = require('../server').tsttwo;


//assert.equal
//assert.typeof
//assert.isAbove

describe('Server.js', function() {
  describe('tst()', function(){
    it('app should return hello', function(){
      let result = tst();
      assert.equal(result, 'hello');
      });
    });
    describe('tsttwo', function(){
      it('Return a type number', function(){
        let result = tsttwo(1, 2);
        assert.notTypeOf(result, 'string');
      });
      it("return a value above 5", function(){
        let result = tsttwo(1,6);
        assert.isAbove(result, 5);
      });

  });
});
