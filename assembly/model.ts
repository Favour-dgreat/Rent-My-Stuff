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
		item.price = payload.price;
    item.rentPrice = payload.rentPrice;
    item.rentTime = u64.MIN_VALUE;
		item.owner = context.sender;
		item.renter = "";
		item.isRent = payload.isRent;
		item.isSale = payload.isSale;
		item.isRented = false;
		return item;
	}

	public putOnSale(): void {
		this.isSale = true;
    this.isRent = false;
  }

  public putOnRent(): void {
    this.isRent = true;
    this.isSale = false;
  }

  public changePrices(price: u128, priceOf: string): void {
    if(priceOf == "sale"){
      this.price = price;
    }else if (priceOf == "rent"){
      this.rentPrice = price;
    }else { 
      return;
    }
  }

  public rent(duration :u64): void {
    this.renter = context.sender;
    this.rentTime = duration + context.blockTimestamp;
  }

  public buy() : void {
    this.isSale = false;
    this.owner = context.sender;
  }

  public endRent(): void {
    this.renter = "";
    this.rentTime = u64.MIN_VALUE;
  }

}

export const listedItems = new PersistentUnorderedMap<string, Item>("Items");
