import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Payment from "./events/payment.js";

const subject = new PaymentSubject()
const marketing = new Marketing()
const shipment = new Shipment()

subject.subscribe(marketing)
subject.subscribe(shipment)

const payment = new Payment(subject)

payment.creditCard({ userName: "Bruna", id: 1})
