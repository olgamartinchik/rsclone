class LoginPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render() {
        this.rootNode.textContent = 'This is Login Page!';
    }
}

export default LoginPageView;
