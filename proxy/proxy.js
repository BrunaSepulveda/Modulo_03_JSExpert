'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter';

event.on(eventName, msg => console.log('counter updated', msg))

// event.emit(eventName, 'oi')
// event.emit(eventName, 'tchau')

const myCounter = {
  counter: 0,
}

// altera os valores dentro do obj
const proxy = new  Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, {newValue, key: target[propertyKey]})
    target[propertyKey] = newValue;
    return true;
  },
  get: (target, propertyKey) => {
    // console.log("chamou", { target, propertyKey })
    return target[propertyKey]
  }
})

// A função setTimeout é executada apenas uma unica vez após um determinado tempo,
// e o setInterval é executada em intervalos de tempo indefinidamente.

//ja ja depende do que está executando com ele ???
setInterval(function() {
  proxy.counter += 1
  if (proxy.counter === 10) {
    clearInterval(this)
  }
}, 200)

//caso o tempo seja 0 executa imediatamente, futuro com um tempo determinado
setTimeout(() => {
  proxy.counter = 4;
  console.log('[2]: setTimeout')
}, 100);

setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})

// executa imediatamente, mas acaba com o ciclo de vida do node
// interrompe a fila e executa no meio dos processos em andamento
process.nextTick(() => {
  proxy.counter = 2;
  console.log('[0]: nextTick')
})