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

// forma segura e respeitando o ciclo de vida do JS
const withReflection = { user: "Xuxa" };
Reflect.deleteProperty(withReflection, "user")
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// casos em que seja necessário garantir que estamos acessando a chave e caso não tenha levante um erro
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

assert.ok('superman' in {superman: ''}) // verificar se uma chave existe
assert.ok(Reflect.has({batman: ''}, 'batman'))

const user = Symbol('user');

const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'bruna',
};

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
];

assert.deepStrictEqual(objectKeys,['id', Symbol.for('password'), user])
//Reflect.ownKeys é usado para fazer uma cópia segura de objetos
assert.deepStrictEqual(Reflect.ownKeys(databaseUser),['id', Symbol.for('password'), user])