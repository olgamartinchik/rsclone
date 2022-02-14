import { profileInputItemTemplate, profileGenderItemTemplate, changePasswordTemplate } from "./template";

export class ProfileItem {

  public getTemplate(title: string, text: string): HTMLElement {
    const rootNode = document.createElement('div');
    rootNode.className = 'plan-item wrapper';
    rootNode.insertAdjacentHTML('afterbegin', profileInputItemTemplate(title, text));

    return rootNode;
  }

  public getGenderTemplate(title: string): HTMLElement {
    const rootNode = document.createElement('div');
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