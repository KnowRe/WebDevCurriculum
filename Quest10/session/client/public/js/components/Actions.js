import { AuthApi } from '../api/auth.js';
import Component from './Component.js';

export class Actions extends Component {
  init() {
    this.notepad = this.props.notepad;
  }

  template() {
    const notepad = this.props.notepad;
    const user = notepad.state?.user || null;
    return `
    <div class="btn-group">
        <button class="btn" id="new-file">ADD NEW</button>
        <button class="btn" id="save">SAVE</button>
    </div>
    <p>${user?.id || ''}</p>
    <button class="btn" id="logout">LOGOUT</button>
    `;
  }

  setEvent() {
    this.$target.querySelector('#new-file').addEventListener('click', async () => {
      await this.notepad.add();
    });
    this.$target.querySelector('#save').addEventListener('click', async () => {
      await this.notepad.save();
    });
    this.$target.querySelector('#logout').addEventListener('click', async () => {
      await AuthApi.logout();
    });
  }
}
