import footer from '../../components/footer/footer';
import Gender from '../../components/gender/gender';
import Calender from '../../components/calender/calender';
import Parameters from '../../components/parameters/parameters';
import Node from '../../components/Node';
import MaterializeHandler from '../../services/materialize/materializeHandler';

class OnboardingPageView {
    private materializeHandler: MaterializeHandler;

    private rootNode: HTMLElement;

    constructor() {
        this.materializeHandler = new MaterializeHandler();
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(onselect: (e: Event) => void): void {
        this.rootNode.textContent = '';

        const header = new Node(this.rootNode, 'div', 'registration-header');
        Node.setChild(header.node, 'h2', 'title title-tablet registration-title', 'About you');

        const content = Node.setChild(this.rootNode, 'div', 'registration-content');
        const form = Node.setChild(content, 'form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post');

        form.append(Gender.getTemplate(onselect));
        form.append(Calender.getTemplate(onselect));
        this.materializeHandler.initDatePicker();
        form.append(Parameters.getTemplate('Height', 'Feet & Inches', 'Centimeters', '120', '220', onselect));

        this.rootNode.append(footer.getTemplate());
    }
}

export default OnboardingPageView;