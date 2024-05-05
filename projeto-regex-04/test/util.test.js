'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('../src/util')

describe('Util', () => {
  it('#evalueteRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]]+\s?)+$/;

    /*
    time  node --eval "/^([a-z|A-Z|0-9]]+\s?)+$/.test('como vai voce e como vai como vai voce e como vai?') && console.log('xii')"
    */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('#evalueteRegex should not throw an error using a safe regex', () => {
    const unsafeRegex = /^([a-z]])$/;

    expect(() => evaluateRegex(unsafeRegex)).to.not.throw;
    expect(evaluateRegex(unsafeRegex)).to.be.ok;
  })
})