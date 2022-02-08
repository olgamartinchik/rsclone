import optionTemplate from './template';

class Checkbox {
    private rootNode: HTMLFormElement;

    constructor() {
        this.rootNode = document.createElement('form');
        this.rootNode.setAttribute('action', '#');
    }

    public getTemplate(
        className: string,
        options: Array<string>,
        checkedOptions: Array<string | undefined>
    ): HTMLElement {
        this.rootNode.textContent = '';

        let isChecked = false;
        options.forEach((option) => {
            if (checkedOptions.includes(option.toUpperCase())) isChecked = true;
            this.rootNode.insertAdjacentHTML('afterbegin', optionTemplate(className, option, isChecked));
            isChecked = false;
        });
        return this.rootNode;
    }
}

export default new Checkbox();
