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
            const optionName = option.split(' ')[0];
            if (checkedOptions.includes(optionName.toUpperCase())) {
                isChecked = true;
            }
            if (optionName === 'all') {
                this.rootNode.insertAdjacentHTML('afterbegin', optionTemplate(className, option, isChecked, true));    
            } else {
                this.rootNode.insertAdjacentHTML('afterbegin', optionTemplate(className, option, isChecked));
            }
            isChecked = false;
        });
        return this.rootNode;
    }
}

export default new Checkbox();
