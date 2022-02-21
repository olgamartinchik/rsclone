import calenderTemplate, { editcalenderTemplate } from './template';

class Calender {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'input-group';
    }

    public getTemplate(onselect: (e: Event) => void): HTMLElement {
        this.rootNode.textContent = '';
        this.rootNode.onclick = (e: Event) => onselect(e);
        this.rootNode.insertAdjacentHTML('afterbegin', calenderTemplate());

        return this.rootNode;
    }

    public getEditTemplate(text: string, onclick: (e: Event) => void): HTMLElement {
        const rootNode = document.createElement('div');
        rootNode.className = 'plan-item wrapper';
        rootNode.onchange = (e: Event) => onclick(e);
        rootNode.insertAdjacentHTML('afterbegin', editcalenderTemplate(text));

        return rootNode;
    }
}

export default new Calender();
