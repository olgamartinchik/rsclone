import footer from '../../components/footer/footer';

class RegisterPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(): void {
        this.rootNode.textContent = '';

        this.rootNode.insertAdjacentHTML(
            'beforeend',
            `<main class="main-page"><span>This is Register Page!</span></main>`
        );

        this.rootNode.append(footer.getTemplate());
    }
}

export default RegisterPageView;
