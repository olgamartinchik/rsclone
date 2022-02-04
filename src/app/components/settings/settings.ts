import { settingsTemplate, settingsWithChipsTemplate } from "./template";
import { Weight, Height } from "../../services/constants";
import Node from "../Node";

class Settings {
  public getTemplate(titles: Array<string>, hasChips: boolean, onclick: (e: Event) => void): HTMLElement {
    const rootNode = new Node(null, 'div', 'settings-item wrapper');
    rootNode.node.onclick = (e: Event) => onclick(e);
    if (!hasChips) {
      titles.forEach(text => {
        rootNode.node.insertAdjacentHTML('afterbegin', settingsTemplate(text));
      });
    } else {
      titles.forEach(text => {
        const unit1 = (text === 'Weight') ? Weight.units : Height.units;
        const unit2 = (text === 'Weight') ? Weight.units2 : Height.units2;
        rootNode.node.insertAdjacentHTML('afterbegin', settingsWithChipsTemplate(text, unit1, unit2))
      });
    }
    return rootNode.node;
  }
}

export default new Settings();