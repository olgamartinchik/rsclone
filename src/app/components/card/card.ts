import { TWorkout } from '../../services/types';
import cardTemplate from './template';

class Card {
    private rootNode: HTMLElement;

    private data: TWorkout;

    public id: string;

    constructor(data: TWorkout) {
        this.data = data;
        this.id = data.img;
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'program-card z-depth-1';
        this.rootNode.id = data.img;
    }

    public getTemplate(onclick: (e: Event) => void): HTMLElement {
        this.rootNode.onclick = (e: Event) => onclick(e);
        this.rootNode.insertAdjacentHTML('afterbegin', cardTemplate(this.data));
        return this.rootNode;
    }
}

export default Card;
