import Component from "./component.js";
import { Tab } from "./Tab.js";

export class TabList extends Component {
  template() {
    return `
      <div class="tabs" data-component="tab-list"></div>
    `;
  }
  mounted() {
    const { docs, curr } = this.props;
    const $tabList = this.$target.querySelector('[data-component="tab-list"]');
    docs.forEach((doc) => {
      const tab = document.createElement("div");
      $tabList.appendChild(tab);
      new Tab(tab, { doc, curr }, this.events);
    });
  }
}
