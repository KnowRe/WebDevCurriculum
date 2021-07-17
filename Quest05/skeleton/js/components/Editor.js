import Component from "./component.js";

export class Editor extends Component {
  init() {
    this.setState({
      text: this.props.curr?.text ?? "",
    });
  }

  template() {
    return `<textarea class="editor-input" ${
      !this.props.curr ? "readonly" : ""
    }>${this.state.text}</textarea>`;
  }

  setEvent() {
    this.$target
      .querySelector(".editor-input")
      .addEventListener("input", (e) => {
        this.events.setText(e.target.value);
      });
  }
}
