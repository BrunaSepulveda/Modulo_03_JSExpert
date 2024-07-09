const { expect } = require('chai');
const { it,describe } = require('mocha');
const { productValidator } = require('../src');
const ProductMotherObject = require('./model/productMotherObject');

describe('Test Mother Object', () => {
  it('shouldn\'t return error with valid product', () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product)

    const expected ={
      result: true,
      erros: [],
    };

    expect(result).to.be.deep.equal(expected)
  })

  describe('', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductMotherObject.withInvalidId();
      const result = productValidator(product)
  
      const expected ={
        result: false,
        erros: ["id: invalid length, current [1] expected to be between 2 and 20"],
      };

      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductMotherObject.withInvalidName();
      const result = productValidator(product)
  
      const expected ={
        result: false,
        erros: ["name: invalid value, current [abc123] expected to have only words"],
      };

      expect(result).to.be.deep.equal(expected)
 
    })
    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductMotherObject.withInvalidPrice();
      const result = productValidator(product)
  
      const expected ={
        result: false,
        erros: ["price: invalid value, current [2000] expected to be between 1 and 1000"],
      };
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when creating a Product with invalid category',() => {
      const product = ProductMotherObject.withInvalidCategory();
      const result = productValidator(product)
  
      const expected ={
        result: false,
        erros: ["category: invalid value, current [forniture] expected to be eletronic or organic"],
      };
      expect(result).to.be.deep.equal(expected)
    })
  })
})