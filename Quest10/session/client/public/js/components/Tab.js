import Component from './Component.js';

export class Tab extends Component {
  template() {
    const { doc, curr } = this.props;
    const { isModified, name } = doc;
    return `
      <div class="tab ${doc === curr ? 'tab--selected' : ''}">
        <span class="tab-name">${name}</span>
        <span class="tab-status ${isModified ? '' : 'tab-status-saved'}">●</span>
        <span class="close-btn">×</span>
      </div>
    `;
  }

  setEvent() {
    const { doc, notepad } = this.props;

    const tabEl = this.$target.querySelector('.tab');
    const closeEl = this.$target.querySelector('.close-btn');

    tabEl.addEventListener('click', () => {
      notepad.open(doc);
    });
    tabEl.addEventListener('dblclick', () => {
      const newName = prompt('파일명을 입력하세요', doc.name);
      if (!this.validateName(notepad.docs, newName)) {
        return alert('이미 존재하는 파일명 입니다.');
      }
      notepad.curr.name = newName;
      notepad.render();
    });
    closeEl.addEventListener('click', e => {
      e.stopPropagation();
      notepad.close(doc);
    });
  }

  validateName(docs, name) {
    return !docs.map(doc => doc.name).includes(name);
  }
}
