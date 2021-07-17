export class Doc {
  origin;
  id;
  name;
  text;
  constructor(doc) {
    Object.assign(this, doc);
    this.origin = doc;
  }
  get isModified() {
    return this.text !== this.origin.text || this.name !== this.origin.name;
  }
  get plain() {
    return {
      id: this.id,
      name: this.name,
      text: this.text,
    };
  }
}
