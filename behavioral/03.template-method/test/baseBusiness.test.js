import { expect, describe, test, jest } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness.js';
import { NotImplementedException } from '../src/util/exceptions.js';

describe('#BaseBusiness', () => {
  test("should throw an error when child class doesn't implement _validateRequiredFields function", () => {
    class ConcreteClass extends BaseBusiness {}
    const concreteClass = new ConcreteClass();
    const validateError = new NotImplementedException(
      concreteClass._validateRequiredFields.name,
    );

    expect(() => concreteClass.create({})).toThrow(validateError);
  });
  test('should throw an error when _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCEEDED = false;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest
        .fn()
        .mockReturnValue(VALIDATION_DOESNT_SUCCEEDED);
    }

    const concreteClass = new ConcreteClass();
    const validateError = new Error('invalid data!');

    expect(() => concreteClass.create({})).toThrow(validateError);
  });
  test("should throw an error when child class doesn't implement _create function", () => {
    const VALIDATION_SUCCEEDED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED);
    }

    const concreteClass = new ConcreteClass();
    const validateError = new NotImplementedException(
      concreteClass._create.name,
    );

    expect(() => concreteClass.create({})).toThrow(validateError);
  });
  test('ok', () => {
    const VALIDATION_SUCCEEDED = true;
    const CREATED_SUCCEEDED = true;

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED);
      _create = jest.fn().mockReturnValue(CREATED_SUCCEEDED);
    }

    const concreteClass = new ConcreteClass();

    const baseClassFn = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name,
    );

    const result = concreteClass.create({})

    expect(result).toBeTruthy();
    expect(baseClassFn).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
  });
});
