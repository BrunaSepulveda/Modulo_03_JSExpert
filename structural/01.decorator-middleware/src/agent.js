import Http from 'http';

async function InjectHttpInterceptor() {
  // intercepta o evento emit do http
  // pesquisar eventos do http
  //herda de event logo -> emit, on
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args;

    if (type === 'request') {

      response.setHeader('X-Instrumented-By', 'Bruna');
    }

    return oldEmit.apply(this, args);
  };

  /*
  substitui na aplicação a propriedade emit no http
  por uma função própria, essa nova função recebe todos os parametros 
  que a função antiga emit receberia
  retorna a execução de uma função que insere uma nova função no contexto do evento gerado
  que e essa nova função é executada quando o evento for emitido
  para isso a função apply recebe o contexto do evento em execução
  recebe o contexto e os argumentos(função do emit executar ?? e em seguida chamar a função appl0000y)
  */
}

export { InjectHttpInterceptor };
