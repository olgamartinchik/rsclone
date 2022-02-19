import ClientManager from "../../services/clientManager";
import Card from "../../components/card/card";
import storageManager from "../../services/storageManager";
import Utils from "../../services/utils";

export default class CategoryPageModel {
  private clientManager: ClientManager;
  private cards: Card[];
  filteredCards: Card[];

  constructor() {
    this.clientManager = new ClientManager();
    this.cards = [];
    this.filteredCards = [];
  }

  public async getData() {
    const data = await this.clientManager.getWorkouts();
    if (data) {
        this.cards = data.map(item => {
            return new Card(item);
        });
    }
  }

  public filterCardArray(filters): Array<Card> {
    this.filteredCards = this.cards;
    for (let key in filters) {
      const type = key;
      const values = filters[key];
      values.forEach((value) => {
        this.filteredCards = this.filteredCards.filter((card) => this.getValues(card, type).includes(value));
      });
    }
    return this.filteredCards;
  }

  private getValues(card: Card, type: string): Array<string> {
    const valuesArray = card.data[type].split(',');
    const modifiedValuesArr = valuesArray.map((value) => value.trim());
    return modifiedValuesArr;
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

  public getType(): string {
    const type = <string>storageManager.getItem('type', 'local');
    return type;
  }

  public getAllCards() {
    return this.cards;
  }

  public getFilteredCards() {
    return this.filteredCards;
  }

  public saveFilters<T>(filters: T) {
    storageManager.addItem('filters', filters, 'local');
  }

  public createMessage(text: string) {
    if (text) {
        window.M.toast({ html: `${text}` });
    }
}
}