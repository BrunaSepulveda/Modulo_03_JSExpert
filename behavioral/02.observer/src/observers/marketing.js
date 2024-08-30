import * as axios from 'axios'
export default class Marketing {
  update({ id, userName }) {
    console.log(
      `[${id}]: [marketing] will pack the user's order to [${userName}]`,
    );
  }

  //exemplo estrutura update assíncrono
  updateAssync({ id, userName }){
    try {
      // Realiza a requisição usando axios
      axios.post(this.apiEndpoint, data)
        .then(response => {
          console.log(`Success: ${response.status} - ${response.data}`);
        })
        .catch(error => {
          console.error(`Error calling API at ${this.apiEndpoint}:`, error.message);
        });
    } catch (error) {
      // Captura qualquer erro sincrono (não relacionado ao axios)
      console.error(`Synchronous error in APIObserver: ${error.message}`);
    }
  }
}
