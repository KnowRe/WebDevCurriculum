import { Actions } from "./Actions.js";
import Component from "./component.js";
import { Doc } from "../Doc.js";
import { Editor } from "./Editor.js";
import { TabList } from "./TabList.js";

export default class Notepad extends Component {
  init() {
    this.setDocs(this.props.loader.load());
  }

  template() {
    return `
      <section class="actions" data-component="actions"></section>
      <section class="tabs" data-component="tabs"></section>
      <section class="editor" data-component="editor"></section>
    `;
  }

  mounted() {
    const { docs = [], curr = null } = this.state;
    const $actions = this.$target.querySelector('[data-component="actions"]');
    const $tabs = this.$target.querySelector('[data-component="tabs"]');
    const $editor = this.$target.querySelector('[data-component="editor"]');

    this.actions = new Actions($actions, undefined, {
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
    this.editor = new Editor(
      $editor,
      { curr },
      {
        setText: this.setText.bind(this),
      }
    );
  }

  add() {
    const name = prompt("파일명을 입력하세요");
    if (!this.validateName(name)) {
      return alert("이미 존재하는 파일명 입니다.");
    }
    const newDoc = new Doc(name);
    this.setState({
      docs: [...this.docs, newDoc],
    });
    this.open(newDoc);
  }

  save() {
    const { loader } = this.props;
    const currIndex = this.docs.findIndex((doc) => this.curr === doc);
    const pDocs = this.docs.map((doc) => doc.getParsed())
    console.log('%c [JL] save - pDocs', 'font-size: 16px; color:  red;', pDocs)
    loader.save(this.docs.map((doc) => doc.getParsed()));
    this.setDocs(loader.load(), currIndex);
  }

  open(doc) {
    this.setState({ curr: doc });
  }

  setDocs(pDocs, i = 0) {
    const docs = pDocs.map((doc) => new Doc(doc.name, doc.text));
    this.setState({
      docs: docs,
      curr: docs[i],
    });
  }

  setText(text) {
    this.curr.text = text;
    this.tabs.render();
  }

  changeFileName(doc, newName) {
    if (!newName) {
      return;
    }
    if (!this.validateName(newName)) {
      return alert("이미 존재하는 파일명 입니다.");
    }

    this.curr.name = newName;
    this.render();
  }

  validateName(name) {
    return !this.docs.map((doc) => doc.name).includes(name);
  }

  close(doc) {
    this.setState({
      ...this.state,
      docs: this.docs.filter((d) => d !== doc),
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

  get docs() {
    return this.state.docs;
  }
  get curr() {
    return this.state.curr;
  }
}
