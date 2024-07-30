import { expect, describe, test, jest, beforeAll } from "@jest/globals";
import PaymentSubject from "../src/subjects/paymentSubject.js";
import Payment from "../src/events/payment.js";
import Shipment from "../src/observers/shipment.js";
import Marketing from "../src/observers/marketing.js";

describe('Test Suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console,console.log.name).mockImplementation(() => {})
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    //todos os observadores vão ter funções em comum
    const observer = {
      update: jest.fn()
    }

    const data = 'bruna'
    
    subject.subscribe(observer)
    subject.notify(data)

    expect(observer.update).toBeCalledWith(data)
  })

  test('#PaymentSubject should not notify observers', () => {
    const subject = new PaymentSubject()
    //todos os observadores vão ter funções em comum
    const observer = {
      update: jest.fn()
    }

    const data = 'bruna'
    
    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name,
    )

    const data = { user: "Bruna", id: 1}

    payment.creditCard(data)

    expect(paymentSubjectNotifySpy).toBeCalledWith(data)
  })

  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const marketing = new Marketing()

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    const payment = new Payment(subject)

    const data = { userName: "Bruna", id: 1}

    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)

  })
})
