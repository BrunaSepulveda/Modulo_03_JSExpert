'use strict'
/*
* O Set permite armazenar valores únicos de qualquer tipo, sejam valores primitivos ou referências de objetos.
* size
* has()
* keys()
* values()
*/
const assert = require('assert');

const arr1 = ['0','1','2'];
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ])

const set = new Set();
arr1.map(item =>  set.add(item));
arr2.map(item =>  set.add(item));

assert.deepStrictEqual(Array.from(set),[ '0', '1', '2', '3' ])

assert.deepStrictEqual([...new Set([...arr1,...arr2])],[ '0', '1', '2', '3' ])

// console.log('set.keys',set.keys())
// console.log('set.values',set.values())

//no Array [].indexof() ou [].includes()
assert.ok(set.has('3'))

//não tem get
// interceção, saber o que tem na lista
const user1 = new Set([
  'bruna',
  'maria',
  'xuxa'
]);

const user2 = new Set([
  'bruna',
  'joão',
  'julio'
]);

const intersection = new Set([...user1].filter(user => user2.has(user)))
//weakset mais leve

assert.deepStrictEqual(Array.from(intersection), ['bruna'])

const difference = new Set([...user1].filter(user => !user2.has(user)))

assert.deepStrictEqual(Array.from(difference), ['maria','xuxa'])



