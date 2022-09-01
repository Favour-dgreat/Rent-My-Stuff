import { Item, listedItems } from "./model";
import { ContractPromiseBatch, context, u128 } from "near-sdk-as";

export function setItem(item: Item): void {
	let storedItem = listedItems.get(item.id);
	if (storedItem !== null) {
		throw new Error(`item with ${item.id} already exists`);
	}
	listedItems.set(item.id, Item.fromPayload(item));
}

export function getItem(id: string): Item | null {
	return listedItems.get(id);
}

export function getItems(): Item[] {
	return listedItems.values();
}

export function putOnSale(itemId: string, price: u128): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	if (item.owner != context.sender) {
		throw new Error("You are not the owner");
	}
	assert(
		item.isRented == false,
		"Status of item can't be changed while being rented"
	);
	item.putOnSale();
	item.changePrices(price, "sale");
	listedItems.set(item.id, item);
}

export function putOnRent(itemId: string, price: u128): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	if (item.owner != context.sender) {
		throw new Error("You are not the owner");
	}
	assert(
		item.isRented == false,
		"Status of item can't be changed while being rented"
	);
	item.putOnRent();
	item.changePrices(price, "rent");
	listedItems.set(item.id, item);
}

export function buyItem(itemId: string): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	assert(item.isSale == true, "Item isn't for sale");
	assert(
		item.owner.toString() != context.sender.toString(),
		"You can't buy your own item"
	);
	assert(
		item.price.toString() == context.attachedDeposit.toString(),
		"Attached deposit has to match the price of item"
	);
	ContractPromiseBatch.create(item.owner).transfer(context.attachedDeposit);
	item.buy();
	listedItems.set(item.id, item);
}

export function rentItem(itemId: string, duration: u64): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	assert(item.isRent == true, "Item isn't for sale");
	assert(
		item.owner.toString() != context.sender.toString(),
		"You can't rent your own item"
	);
	assert(
		item.rentPrice.toString() == context.attachedDeposit.toString(),
		"Attached deposit has to match the price of item"
	);
	assert(duration > u64.MIN_VALUE, "Invalid duration");
	ContractPromiseBatch.create(item.owner).transfer(context.attachedDeposit);
	item.rent(duration);
	listedItems.set(item.id, item);
}

export function endRentItem(itemId: string): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	assert(item.isRented == true, "Item isn't being rented");
	assert(
		item.owner.toString() == context.sender.toString() ||
			item.renter.toString() == context.sender.toString(),
		"Only owner or renter of item can end rent"
	);
  item.endRent();
	listedItems.set(item.id, item);
}
