import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Item {
	id: string;
	name: string;
	location: string;
	date: string;
	description: string;
	image: string;
	price: u128;
  rentPrice: u128;
	owner: string;
	renter: string;
  rentTime: u64;
	isRent: bool;
	isSale: bool;
	isRented: bool;
	public static fromPayload(payload: Item): Item {
		const item = new Item();
		item.id = payload.id;
		item.name = payload.name;
		item.description = payload.description;
		item.location = payload.location;
		item.date = payload.date;
		item.image = payload.image;
		item.price = u128.Zero;
    item.rentPrice = u128.Zero;
    item.rentTime = u64.MIN_VALUE;
		item.owner = context.sender;
		item.renter = "";
		item.isRent = false;
		item.isSale = false;
		item.isRented = false;
		return item;
	}

  // puts an item on sale
	public putOnSale(): void {
		this.isSale = true;
    this.isRent = false;
  }
  // puts an item on rent
  public putOnRent(): void {
    this.isRent = true;
    this.isSale = false;
  }
  // changes either price or rentPrice depending on @param priceOf which is a hardcoded string
  public changePrices(price: u128, priceOf: string): void {
    if(priceOf == "sale"){
      this.price = price;
    }else if (priceOf == "rent"){
      this.rentPrice = price;
    }else { 
      return;
    }
  }
  // rents an item to caller
  public rent(duration :u64): void {
    this.isRent = false;
    this.isRented = true;
    this.renter = context.sender;
    this.rentTime = duration + context.blockTimestamp;
  }
  // changes ownership of item to caller
  public buy() : void {
    this.isSale = false;
    this.owner = context.sender;
  }
  // ends rent on an item
  public endRent(): void {
    this.renter = "";
    this.rentTime = u64.MIN_VALUE;
  }

}

export const listedItems = new PersistentUnorderedMap<string, Item>("Items");
