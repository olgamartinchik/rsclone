import { profileInputItemTemplate, profileGenderItemTemplate, changePasswordTemplate } from "./template";

export class ProfileItem {

  public getTemplate(type: string, title: string, text: string, onchangeValue: (e: Event) => void): HTMLElement {
    const rootNode = document.createElement('div');
    rootNode.onchange = (e: Event) => onchangeValue(e);
    rootNode.className = 'plan-item wrapper';
    rootNode.insertAdjacentHTML('afterbegin', profileInputItemTemplate(type, title, text));

    return rootNode;
  }

  public getGenderTemplate(title: string, onclick: (e: Event) => void): HTMLElement {
    const rootNode = document.createElement('div');
    rootNode.onclick = (e: Event) => onclick(e);
    rootNode.className = 'plan-item wrapper';
    rootNode.insertAdjacentHTML('afterbegin', profileGenderItemTemplate(title));

    return rootNode;
  }

  public getConfirmPasswordTemplate(title: string): HTMLElement {
    const rootNode = document.createElement('div');
    rootNode.className = 'plan-item wrapper';
    rootNode.insertAdjacentHTML('afterbegin', changePasswordTemplate(title));

    return rootNode;
  }
}

export default new ProfileItem();