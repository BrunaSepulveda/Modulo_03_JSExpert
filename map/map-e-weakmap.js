'use strict'

const assert = require('assert')

const myMap = new Map();
myMap
  .set(1, 'one')
  .set('Bruna', { text: 'two' })
  .set(true, () => 'hello')

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Bruna'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em objetos as chaves só podem ser string ou symbol
const obj = {id: 1}
myMap.set(obj, {name: 'Bruneca'})
//para acessar um valor em um map só a referencia desse em memória funciona
assert.deepStrictEqual(myMap.get({name: 'Bruneca'}), undefined)
assert.deepStrictEqual(myMap.get(obj), {name: 'Bruneca'})

//no objeto seria Object.keys().length
assert.deepStrictEqual(myMap.size, 4)

/*
para verificar se um item existe no objeto
item.key -> se não existir = undefined
if() -> coerção implicita para boolean e retorna false
console.log(obj.hasOwnProperty('id'))
*/
assert.deepStrictEqual(obj.hasOwnProperty('id'), true)
assert.deepStrictEqual(obj.hasOwnProperty('bruna'), false)
assert.ok(myMap.has(obj))

/*
para remover um item no objeto
delete item.id
 */
assert.ok(myMap.delete(obj))

// No objeto não é possível iterar diretamente

assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Bruna",{"text":"two"}],[true,null]]')

for (const [key, value] of myMap) {
  console.log([key, value])
}
// qualquer chave pode colidir, com as propriedades herdadas do object
// -> constructor,toString, valueOf e etc...

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(()=>myMap.get(actor).toString, TypeError)

//não dá para limpar um obj sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...map.keys()], []);


