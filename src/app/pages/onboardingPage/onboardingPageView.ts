import Footer from '../../components/footer/footer';
import Gender from '../../components/gender/gender';
import Calender from '../../components/calender/calender';
import Parameters from '../../components/parameters/parameters';
import Node from '../../components/Node';
import Button from '../../components/Button';
import MaterializeHandler from '../../services/materialize/materializeHandler';
import { Height, Weight } from '../../services/constants';

class OnboardingPageView {
    private materializeHandler: MaterializeHandler;

    private rootNode: HTMLElement;

    constructor() {
        this.materializeHandler = new MaterializeHandler();
        this.rootNode = <HTMLElement>document.getElementById('app');
    }

    render(onselect: (e: Event) => void, oninput: (e: Event) => void): void {
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
        form.append(Parameters.getTemplate(Height.title, Height.units, Height.option1, Height.option2, Height.min, Height.max, onselect, oninput));
        form.append(Parameters.getTemplate(Weight.title, Weight.units, Weight.option1, Weight.option2, Weight.min, Weight.max, onselect, oninput));
        new Button(form, 'Next');

        this.rootNode.append(Footer.getTemplate());
    }
}

export default OnboardingPageView;