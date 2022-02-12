const { evaluateRegex } = require("./utils.js");
class Person {
  // (\w+):\s.*
  //$1
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    
    // ^ => Começo da string
    // + => Um ou mais ocorrencias
    // (\w{1}) => Pega so a primeira letra e deixa em um grupo
    // ([a-zA-Z]) encontra letras maiusculas ou minusculas, adicionamos o + para ele pegar
    // todas as letras ate o final
    // /g => todas ocorrencias
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+)$/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    };
    // (\w+),
    //this.$1 = $1
    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    //tudo que nao for digito \D é removido
    this.documento = documento.replace(evaluateRegex(/\D/g),'');
    // começa a procurar tudo que tem " a " e pega tudo que ta a frente
    // (?<=) faz com que ignore tudo que vem antes - positive lookBehind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/),'').join();
    this.numero = numero;
    // Comeca a buscar depois do espaco, e pega qualquer letra ou digito ate o fim da linha
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    // Remove o ponto literal (.) no fim da frase e remove
    this.estado = estado.replace(evaluateRegex(/\.$/),'');
  }
}

module.exports = Person;
