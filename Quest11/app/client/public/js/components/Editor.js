import Component from './Component.js';

export class Editor extends Component {
  init() {
    this.setState({
      text: this.props.curr?.text ?? '',
    });
  }

  template() {
    return `<textarea class="editor-input" ${!this.props.curr ? 'readonly' : ''}>${
      this.state.text
    }</textarea>`;
  }

  setEvent() {
    const { notepad } = this.props;
    this.$target.querySelector('.editor-input').addEventListener('input', e => {
      notepad.curr.text = e.target.value;
      notepad.tabs.render();
    });
  }
}
