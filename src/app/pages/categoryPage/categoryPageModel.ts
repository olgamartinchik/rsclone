import ClientManager from "../../services/clientManager";
import Card from "../../components/card/card";
import storageManager from "../../services/storageManager";
import CloudinaryManager from '../../services/cloudinarySDK';
import Utils from "../../services/utils";
import { tinySrgb } from "@cloudinary/url-gen/qualifiers/colorSpace";

export default class CategoryPageModel {
  private clientManager: ClientManager;
  private sdk: CloudinaryManager;
  private cards: Card[];
  filteredCards: Card[];

  constructor() {
    this.clientManager = new ClientManager();
    this.sdk = new CloudinaryManager();
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
    return this.cards;
  }

  public getVideoLink(id: string): string {
    const card = this.getCardById(id);
    let url = '';
    if (card) {
        url = this.sdk.getVideoUrl(card.data.title);
    }

    return url;
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
    let modifiedValuesArr = [];
    if(type) {
      const valuesArray = card.data[type].split(',');
      modifiedValuesArr = valuesArray.map((value) => value.trim());
    }
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

  public getType(filters): string {
    let type = '';
    for (let key in filters) {
      type = key;
    }
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