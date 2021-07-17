export default class Component {
  $target;
  props;
  state;
  events;

  constructor($target, props, events) {
    this.$target = $target;
    this.props = props;
    this.events = events;
    this.init();
    this.render();
    this.setEvent();
  }

  init() {}

  mounted() {}

  template() {
    throw 'should be overridden';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
