
/**
 * no fluent api nao cria o objeto ele cria o processo dos dados de form
 * ordenada, todo metodo retorna o this.
 * 
 * Objetivo é executar tarefas como um pipeline, step by step, 
 * e no fim chama o build de forma similar ao padrão builder
 */
const { evaluateRegex } = require('./utils');
const Person = require('./Person');
class TextProcessorFluentApi {
  // propriedade privada
  // nao pode ser acessada de fora
  #content;
  constructor(content){
    this.#content = content;
  }
  extractPeopleData(){
    /**
     * ?<= - pegar todos os dados que virão apos esse grupo
     * [contratante|contratada] ou um ou outro, so deu certo por causa do i em gmi (insensitive case)
     * :\s{1} vai pegar somente o caractere literal ':' e que tenha somente 1 espaço
     * tudo fica dentro de um parenteses para falar 'vamos pegar daí pra frente'
     * (!?\s) negative look around, ignora os contratantes do fim do documento que possuem mais um espaço no caso
     * .*\n pega tudo ate primeira quebra de linha \n
     * .*? not greety, esse ? faz com que ele pare na primeira recorrencia,evitando loops indesejaados
     * $ informa que é no fim da linha
     * g => global
     * m => multilinha
     * i => case insensitive
     */
    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);
    const onlyPerson = this.#content.match(matchPerson);
    // objetivo do fluent api vai ser sempre atualizar a 
    // variavel this.#content
    this.#content = onlyPerson;
    return this;
  }
  divideTextInColumns(){
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map(line => line.split(splitRegex));
    return this;
  }
  removeEmptyCharacters(){
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces,'')));
    return this;
  }
  mapPerson(){
    this.#content = this.#content.map(line => new Person(line));
    return this;
  }
  build(){
    return this.#content;
  }
}

module.exports = TextProcessorFluentApi;