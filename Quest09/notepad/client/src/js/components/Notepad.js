import { DocApi } from '../api.js';
import { Actions } from './Actions.js';
import Component from './Component.js';
import { Doc } from '../doc.js';
import { Editor } from './Editor.js';
import { TabList } from './TabList.js';

export default class Notepad extends Component {
  async init() {
    const resDocs = await DocApi.getDocs();
    const docs = resDocs.map(doc => new Doc(doc));
    this.setState({
      docs: docs,
      curr: docs[0],
    });
  }

  template() {
    return `
      <section class="actions" data-component="actions"></section>
      <section class="tabs" data-component="tabs"></section>
      <section class="editor" data-component="editor"></section>
    `;
  }

  mounted() {
    const docs = this.state?.docs ?? [];
    const curr = this.state?.curr ?? null;

    const $actions = this.$target.querySelector('[data-component="actions"]');
    const $tabs = this.$target.querySelector('[data-component="tabs"]');
    const $editor = this.$target.querySelector('[data-component="editor"]');

    new Actions($actions, undefined, {
      add: this.add.bind(this),
      save: this.save.bind(this),
    });

    this.tabs = new TabList(
      $tabs,
      { docs, curr },
      {
        open: this.open.bind(this),
        changeName: this.changeFileName.bind(this),
        close: this.close.bind(this),
      }
    );

    new Editor($editor, { curr }, undefined);
  }

  async add() {
    const name = prompt('파일명을 입력하세요');
    if (!this.validateName(name)) {
      return alert('이미 존재하는 파일명 입니다.');
    }
    try {
      const resDoc = await DocApi.create(name);
      if (resDoc) {
        const newDoc = new Doc(resDoc);
        this.setState({
          docs: [...this.docs, newDoc],
        });
        this.open(newDoc);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async save() {
    const savedDocObj = await DocApi.update(this.curr.plain);
    if (savedDocObj) {
      const savedDoc = new Doc(savedDocObj);
      const currIndex = this.docs.findIndex(doc => this.curr === doc);
      this.setState({
        docs: [
          ...this.docs.slice(0, currIndex),
          savedDoc,
          ...this.docs.slice(currIndex + 1, this.docs.length),
        ],
      });
      this.open(savedDoc);
    }
  }

  setEvent() {
    this.$target.addEventListener('input', e => {
      this.curr.text = e.target.value;
      this.tabs.render();
    });
  }

  open(doc) {
    this.setState({ curr: doc });
  }

  changeFileName(doc, newName) {
    if (!newName) {
      return;
    }
    if (!this.validateName(newName)) {
      return alert('이미 존재하는 파일명 입니다.');
    }

    this.curr.name = newName;
    this.render();
  }

  async close(doc) {
    const removedDocs = await DocApi.delete(doc.id);
    if (removedDocs) {
      this.setState({
        docs: this.docs.filter(d => d !== doc),
      });
      const length = this.docs.length;
      this.state.curr = null;
      if (length >= 1) {
        this.open(this.docs[length - 1]);
      } else {
        this.state.curr = null;
        this.render();
      }
    }
  }

  validateName(name) {
    return !this.docs.map(doc => doc.name).includes(name);
  }

  get docs() {
    return this.state.docs;
  }
  get curr() {
    return this.state.curr;
  }
}
