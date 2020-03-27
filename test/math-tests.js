var assert = require('assert');

describe('Math', function() {

  describe('#multiply', function() {
    it('should return 9', () => assert.equal(3 * 3, 9));
    it('should return 0', () => assert.equal(2 * 0, 0));
    it('should return 6', () => assert.equal(-2 * -3, 6))
  });

  describe('#substract', function() {
    it('should return 0', () => assert.equal(3-3, 0));
    it('should return 0', () => assert.equal(-3 - -3, 0));
    it('should return 0', () => assert.equal(0 - -3, 3));
  });

});