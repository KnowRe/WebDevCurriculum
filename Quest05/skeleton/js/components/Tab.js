import Component from "./component.js";

export class Tab extends Component {
  template() {
    const { doc, curr } = this.props;
    const { isModified } = doc;
    return `
      <div class="tab ${doc === curr ? "tab--selected" : ""}">
        <span class="tab-name">${doc.name}</span>
        <span class="tab-status ${
          isModified ? "" : "tab-status-saved"
        }">●</span>
        <span class="close-btn">×</span>
      </div>
    `;
  }

  setEvent() {
    const { doc } = this.props;

    const tabEl = this.$target.querySelector(".tab");
    const closeEl = this.$target.querySelector(".close-btn");

    tabEl.addEventListener("click", () => {
      this.events.open(doc);
    });
    tabEl.addEventListener("dblclick", () => {
      const newName = prompt("파일명을 입력하세요", doc.name);
      this.events.changeName(doc, newName);
    });
    closeEl.addEventListener("click", (e) => {
      e.stopPropagation();
      this.events.close(doc);
    });
  }
}
