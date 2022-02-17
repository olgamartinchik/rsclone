import { paramsTemplate, paramsShortTemplate, desiredWeightTemplate } from './template';

class Parameters {
    public getTemplate(
        className: string,
        title: string,
        units: string,
        units2: string,
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
        rootNode.onchange = (e: Event) => onchange(e);
        rootNode.insertAdjacentHTML(
            'afterbegin',
            paramsTemplate(className, title, units, units2, option1, option2, min, max)
        );
        (<HTMLInputElement>rootNode.querySelector('#play-bar')).oninput = (e: Event) => oninput(e);

        return rootNode;
    }

    public getDesireWeightTemplate(
        className: string,
        title: string,
        units: string,
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
        rootNode.onchange = (e: Event) => onchange(e);
        rootNode.insertAdjacentHTML(
            'afterbegin',
            desiredWeightTemplate(className, title, units, min, max)
        );
        (<HTMLInputElement>rootNode.querySelector('#play-bar')).oninput = (e: Event) => oninput(e);

        return rootNode;
    }

    public getShortTemplate(className: string, title: string, onchange: (e: Event) => void): HTMLElement {
        const rootNode = document.createElement('div');
        rootNode.className = 'input-group';
        rootNode.id = title.split(' ').join('');
        rootNode.onchange = (e: Event) => onchange(e);
        rootNode.insertAdjacentHTML('afterbegin', paramsShortTemplate(className, title));

        return rootNode;
    }
}

export default new Parameters();
