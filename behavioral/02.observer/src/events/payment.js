export default class Payment {
  constructor(paymentSubject){
    this.paymentSubject = paymentSubject
  }

  creditCard(paymentData){
    //função de executar algo no banco
    console.log(`\n a payment ocurred from ${paymentData.userName}`)
    
    //função de notificar os inscritos
    this.paymentSubject.notify(paymentData)
  }
}