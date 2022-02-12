// Facade visa abstrair fluxos de execuções complexos executando
// determinado pipeline sem necessitar o tempo todo
// relembrar sequencia de execução
const TextProcessorFluentAPI = require("./TextProcessorFluentApi");
class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }
  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}
module.exports = TextProcessorFacade;
