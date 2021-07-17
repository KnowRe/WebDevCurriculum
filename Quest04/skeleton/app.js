const type = (target, type) => {
  if (typeof type == "string") {
    if (typeof target !== type) throw `invalid type ${target} : ${type}`;
  } else if (!(target instanceof type))
    throw `invalid type ${target} : ${type}`;
  return target;
};

const draggable = ($el) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  $el.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    $el.style.top = $el.offsetTop - pos2 + "px";
    $el.style.left = $el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

class Desktop {
  #headerEl;
  #windowEl;
  #currentWindow = null;
  #windows = [];

  constructor(nums) {
    this.#windows = nums.map(([fileNum, folderNum], i) => {
      const window = new Window(`${i}`);
      [...Array(fileNum)].forEach((_, j) => {
        window.add(
          File.create({ name: `file ${j}` }).setPosition([5, j * 110 + 5])
        );
      });
      [...Array(folderNum)].forEach((_, j) => {
        window.add(
          Folder.create({ name: `folder ${j}` }).setPosition([110, j * 110 + 5])
        );
      });
      return window;
    });
  }

  init() {
    this.setCurrentWindow(0);
    this.renderHeader();
    this.renderWindow();
  }

  setCurrentWindow(n, _ = type(n, "number")) {
    this.clear(this.#windowEl);
    this.#currentWindow = this.#windows[n];
    this.renderWindow();
  }

  renderHeader() {
    this.#windows.forEach((window, i) => {
      const btn = TabButton.create({ name: window.name });
      btn.el.addEventListener("click", (e) => {
        this.setCurrentWindow(i);
      });
      this.#headerEl.appendChild(btn.el);
    });
  }

  renderWindow() {
    this.#currentWindow.icons.forEach((icon) => {
      this.#windowEl.appendChild(icon.el);
    });
  }

  clear($target, _ = type($target, HTMLElement)) {
    while ($target.firstChild) {
      $target.removeChild($target.firstChild);
    }
  }

  setHeaderEl($target, _ = type($target, HTMLElement)) {
    this.#headerEl = $target;
  }
  setWindowEl($target, _ = type($target, HTMLElement)) {
    this.#windowEl = $target;
  }
}

class Window {
  #name = "";
  #icons = [];

  constructor(name, _ = type(name, "string")) {
    this.#name = name;
  }

  add(icon, _ = type(icon, Icon)) {
    this.#icons.push(icon);
  }

  get name() {
    return this.#name;
  }

  get icons() {
    return this.#icons;
  }
}

class Component {
  #state = {};
  #target;

  constructor(
    $target,
    state,
    _1 = type($target, HTMLElement),
    _2 = type(state, "object")
  ) {
    this.#target = $target;
    this.state = state;
    this.init();
  }

  render() {
    this.#target.innerHTML = this.getTemplate();
  }

  init() {}

  getTemplate() {
    throw "should be overridden";
  }

  get el() {
    return this.#target;
  }

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = {
      ...this.#state,
      ...state,
    };
    this.render();
  }
  static create(
    state,
    tag,
    className,
    _1 = type(state, "object"),
    _2 = type(tag, "string"),
    _3 = type(className, "string")
  ) {
    const wrapper = document.createElement(tag || "div");
    if (className) {
      wrapper.className = className;
    }
    return new this(wrapper, state);
  }
}

class Icon extends Component {
  init() {
    draggable(this.el);
  }
  getTemplate(className, src) {
    return `
      <img class="icon-image ${className}" src="${src}" alt="icon"><div class="icon-name">${this.state.name}</div>
    `;
  }
  setPosition([x, y]) {
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    return this;
  }
  static create(state) {
    return super.create(state, "div", "icon-wrapper");
  }
}

class File extends Icon {
  getTemplate() {
    return super.getTemplate("icon-file", "./asset/file.svg");
  }
}

class Folder extends Icon {
  init() {
    super.init();
    this.el.addEventListener("dblclick", (e) => {
      const modal = Modal.create({
        open: false,
        name: this.state.name,
      }).setPosition([e.clientX, e.clientY]);
      this.el.parentNode.appendChild(modal.el);
    });
  }
  getTemplate() {
    return super.getTemplate("icon-folder", "./asset/folder.svg");
  }
}

class Modal extends Component {
  init() {
    draggable(this.el);
    this.el.querySelector(".btn").addEventListener("click", () => {
      this.close();
    });
  }
  getTemplate() {
    return `    
      <div class="modal-header">
        <span class="modal-title">${this.state.name}</span>
        <button class="btn">×</button>
      </div>
      <div class="modal-content"></div>
    `;
  }

  setPosition([x, y]) {
    this.el.style.left = `${x}px`;
    this.el.style.top = `${y}px`;
    return this;
  }

  close() {
    this.el.remove();
  }
  static create(state) {
    return super.create(state, "div", "modal-wrapper");
  }
}

class TabButton extends Component {
  getTemplate() {
    return `<button>window${this.state.name}</button>`;
  }
  static create(state) {
    return super.create(state, "li", "tab");
  }
}
