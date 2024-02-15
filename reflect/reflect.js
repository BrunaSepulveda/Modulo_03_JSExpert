'use strict'

const assert = require('assert');

//garantir semantica e segurança em objetos

const myObj = {
  add(myValue){
    return this.arg1 + this.arg2 + myValue
  }
};

//chama a função, como parametro passa o this como objeto, e os argumentos e array
assert.deepStrictEqual(myObj.add.apply({arg1:10, arg2: 20}, [100]), 130)

Function.prototype.apply = () => { throw new TypeError('Eita')}
assert.throws(() => myObj.add.apply({},[]), { name: 'TypeError', message: 'Eita' })

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20}, [200])
assert.deepStrictEqual(result, 260)
// com reflect a mudança predomina mesmo sendo usado outras formas de modificação

function MyDate(){}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })
Reflect.defineProperty(MyDate, 'withReflectObject', { value: () => 'Hey you' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflectObject(), 'Hey you')

const withDelete = { user: 'Bruna' };
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: "Xuxa" };
Reflect.deleteProperty(withReflection, "user")
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
