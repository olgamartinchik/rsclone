import { TWorkout } from '../../services/types';
import cardTemplate from './template';

class Card {
    private rootNode: HTMLElement;

    public readonly data: TWorkout;

    public id: string | void;

    public completed: boolean;

    constructor(data: TWorkout) {
        this.data = data;
        this.id = data._id;
        this.rootNode = document.createElement('div');
        this.rootNode.className = 'program-card z-depth-1';
        this.rootNode.id = data._id!;
        this.completed = data.completed;
    }

    public getTemplate(onclick: (e: Event) => void, index?: number): HTMLElement {
        this.rootNode.onclick = (e: Event) => onclick(e);
        if(index) {
            this.rootNode.style.animationDelay = `${index / 10}s`;
        }
        this.rootNode.insertAdjacentHTML('afterbegin', cardTemplate(this.data));
        return this.rootNode;
    }
}

export default Card;
