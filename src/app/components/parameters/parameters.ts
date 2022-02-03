import { paramsTemplate } from './template';

class Parameters {
    public getTemplate(
        title: string,
        units: string,
        option1: string,
        option2: string,
        min: string,
        max: string,
        onselect: (e: Event) => void,
        oninput: (e: Event) => void,
        onchange: (e: Event) => void
    ): HTMLElement {
        const rootNode = document.createElement('div');
        rootNode.className = 'input-group';
        rootNode.id = title.split(' ').join('');
        rootNode.onclick = (e: Event) => onselect(e);
        rootNode.oninput = (e: Event) => oninput(e);
        rootNode.onchange = (e: Event) => onchange(e);
        rootNode.insertAdjacentHTML('afterbegin', paramsTemplate(title, units, option1, option2, min, max, onchange));

        return rootNode;
    }
}

export default new Parameters();
