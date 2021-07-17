export class Doc {
  #origin;
  #name = "";
  #text = "";
  #isNew = false;

  constructor(name, text) {
    if(text === undefined) {
      this.#isNew = true;
    }
    this.#origin = { name, text: text ?? '' };
    this.#name = name;
    this.#text = text ?? '';
  }

  save() {
    this.originText = this.text;
  }

  get isModified() {
    return this.#isNew || this.#text !== this.#origin.text || this.#name !== this.#origin.name;
  }

  get name() {
    return this.#name;
  }

  get text() {
    return this.#text;
  }

  set name(name) {
    this.#name = name;
  }

  set text(text) {
    this.#text = text;
  }

  set originText(text) {
    this.#origin.text = text;
  }

  getParsed() {
    return {
      name: this.#name,
      text: this.#text,
    };
  }
}
