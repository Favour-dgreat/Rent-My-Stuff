import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Item {
  id: string;
  name: string;
  location:string;
  date:string;
  description: string;
  image: string;
  price: u128;
  owner: string;
  renter:string;
  isRent: bool;
  isSale: bool;
  isBought: bool;
  isRented: bool;
  isUsed: bool;
  public static fromPayload(payload: Item): Item {
    const item = new Item();
    item.id = payload.id;
    item.name = payload.name;
    item.description = payload.description;
    item.location = payload.location;
    item.date = payload.date;
    item.image = payload.image;
    item.price = payload.price;
    item.owner = context.sender;
    item.renter = "";
    item.isUsed = payload.isUsed;
    item.isRent = payload.isRent;
    item.isSale = payload.isSale;
    item.isBought = false;
    item.isRented = false;
    return item;
  }
}

export const listedItems = new PersistentUnorderedMap<string, Item>("Items");