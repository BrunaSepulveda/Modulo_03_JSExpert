/*
o objetivo do fluent api é executar tarefas como um pipeline,
passo a passo, e no final chamar o build, o foco é processos
e não objetos
*/

class TextProcessorFulentAPI{
  //prop privada
  #content
  constructor(content){
    this.#content = content
  }

  extractPeopleData(){
    /*
    ?<= selecionar os dados que vier após

    [CONTRATANTE|CONTRATADA] um ou outro

    :\s{1} procurar : seguido por um espaço em branco

    () agrupa as regras,sendo assim, selecione tudo
    que vier após o CONTRATANTE ou CONTRATADA seguido de dois pontos com um espaço vazio
    
    (?!\s) negative look aroud, ignora o que se só tiver espaço após o primeiro grupo de pesquisa

    .*\n qualquer coisa seguida do primeio \n
    .*? non, greety, qualquer coisa na primeira recorrencia, evita loop

    $ final na pesquisa
    g tentar dar match em todas as linhas
    m seleciona o match se tiver mais que uma linha que corresponde a pesquisa
    i insensitive
    */
    const matchPerson = /(?<=[CONTRATANTE|CONTRATADA]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson
    return this
  }

  //responsável por retornar a instância do obj
  build(){
    return this.#content;
  }
};

module.exports = TextProcessorFulentAPI;