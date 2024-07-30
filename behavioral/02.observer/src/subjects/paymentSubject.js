export default class PaymentSubject {
  #observers =  new Set()

  notify(data){
    this.#observers.forEach(obs => obs.update(data))
  }

  unsubscribe(observable){
    this.#observers.delete(observable)
  }

  subscribe(observable){
    this.#observers.add(observable)
  }
}
