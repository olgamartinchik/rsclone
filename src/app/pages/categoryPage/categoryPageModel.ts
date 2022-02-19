import ClientManager from "../../services/clientManager";
import Card from "../../components/card/card";
import storageManager from "../../services/storageManager";

export default class CategoryPageModel {
  private clientManager: ClientManager;
  private cards: Card[];
  private type: string;

  constructor() {
    this.clientManager = new ClientManager();
    this.cards = [];
    this.type = storageManager.getItem('type', 'local')!;
  }

  public async getData() {
    const data = await this.clientManager.getWorkouts();
    if (data) {
        this.cards = data.map(item => {
            return new Card(item);
        });
    }
    // console.log(this.cards);
  }

  public filterCardArray(value: string): Array<Card> {
    const filteredCardArray = this.cards.filter((card) => card.data[this.type] === value);
    return filteredCardArray;
  }

  public getCardById(id: string): Card | void {
    let currCard!: Card;
    this.cards.forEach((card: Card) => {
        if (card.id === id) {
            currCard = card;
        }
    });

    return currCard;
}

}