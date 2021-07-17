import Component from './Component.js';

export class Actions extends Component {
  template() {
    return `
    <div class="btn-group">
        <button class="btn" id="new-file">ADD NEW</button>
        <button class="btn" id="save">SAVE</button>
    </div>
    `;
  }

  setEvent() {
    this.$target.querySelector('#new-file').addEventListener('click', () => {
      this.events.add();
    });
    this.$target.querySelector('#save').addEventListener('click', () => {
      this.events.save();
    });
  }
}
