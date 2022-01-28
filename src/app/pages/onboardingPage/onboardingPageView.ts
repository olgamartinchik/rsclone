import footer from '../../components/footer/footer';
import Gender from '../../components/gender/gender';
import Calender from '../../components/calender/calender';
import Node from '../../components/Node';
import gender from '../../components/gender/gender';

class OnboardingPageView {
    private rootNode: HTMLElement;

    constructor() {
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(): void {
        this.rootNode.textContent = '';

        const header = new Node(this.rootNode, 'div', 'registration-header');
        Node.setChild(header.node, 'h2', 'title title-tablet registration-title', 'About you');

        const content = Node.setChild(this.rootNode, 'div', 'registration-content');
        const form = Node.setChild(content, 'form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post');

        form.append(Gender.getTemplate());

        this.rootNode.append(footer.getTemplate());
    }
}

export default OnboardingPageView;