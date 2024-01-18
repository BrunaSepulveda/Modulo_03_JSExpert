'use strict'
const assert = require('assert')

// chave única em nível de referência de memória
// cada vez que chama o symbol ele cria um endereço diferente
const uniqueKey = Symbol('userName')
const user = {};

user["userName"] = "comum key"
user[uniqueKey] = "symbol key"

console.log('getting normal', user.userName)
console.log('getting "symbol"', user[Symbol('userName')])
console.log('getting symbol', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'comum key')
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'symbol key')

console.log('symbols', Object.getOwnPropertySymbols(user)[0])
//não é secreto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//má prática 
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123)

/* 
Well know Symbols são propriedades do objeto Symbol.
Eles incluem iterator, toStringTag, toPrimitive e
isConcatSpreadable.
*/
const obj = {
  // interators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

for(const item of obj){
  console.log({ item })
}

assert.deepStrictEqual([...obj], ['a','b','c'])

/*
cria um metadata que só vai ser usado de forma +/- privada!
m cada caso você verá que não temos acesso às
propriedades declaradas como símbolos, devido à sua não
enumerabilidade.
As propriedades criadas pelo símbolo são acessíveis
somente com acesso ao próprio símbolo.
Sem isso, as propriedades ficam inacessíveis.

com o Object.getOwnPropertySymbols() podemos acessar, por
isso não é realmente privado
*/
const kItems = Symbol('kItems');

class MyDate{
  constructor(...args){
    //array de datas
    this[kItems] = args.map(arg => new Date(...arg))
  }

  /*
  toPrimitive é o método acessado para retornar
  algum tipo primitivo que represente o objeto
  */
  [Symbol.toPrimitive](coercionType){
    if (coercionType !== 'string') throw new TypeError()
    const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', {month: 'long', day: '2-digit', year: 'numeric'}).format(item))
  return new Intl.ListFormat('pt-BR', {style: 'long', type: 'conjunction'}).format(items)
  }

  /*
  A sintaxe get vincula uma propriedade de objeto
  a uma função que será chamada quando essa
  propriedade for consultada. Também pode ser
  usado em classes.

  const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log[this.log.length - 1];
  },
};

console.log(obj.latest);
aqui sobrescrevemos a propriedade do prototype
  */

  get[Symbol.toStringTag](){
    return "Bruna"
  }

  *[Symbol.iterator] () {
    for (const item of this[kItems]) {
      yield item;
    }
  //   return ({
  //   items: this[kItems],
  //   next() {
  //     return {
  //       done: this.items.length === 0,
  //       value: this.items.shift()
  //     }
  //   }
  // })
  }

  async *[Symbol.asyncIterator](){
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for (const item of this[kItems]) {
      await timeout(100)
      yield item;
    }
  }
}
// actual: '[object Object]' tostring tag => Object
const myDate = new MyDate([2020, 3, 1],[2021, 2, 2])
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object Bruna]')
assert.throws(() => myDate + 1, TypeError)

//coerção explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate),'01 de abril de 2020 e 02 de março de 2021')

const expectDates = [
  new Date(2020, 3, 1),
  new Date(2021, 2, 2),
]
console.log([...myDate])

//coerção explicita para chamar o toPrimitive
// assert.deepStrictEqual(`${myDate}`,'')