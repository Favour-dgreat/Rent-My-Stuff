import { Item, listedItems } from "./model";
import { ContractPromiseBatch, context, u128 } from "near-sdk-as";


/**
 * @dev allow users to add an item to the platform
 * @param item object of values for creating an instance of Item
 */
export function setItem(item: Item): void {
	let storedItem = listedItems.get(item.id);
	if (storedItem !== null) {
		throw new Error(`item with ${item.id} already exists`);
	}
  assert(item.location.length > 0, "Empty location");
  assert(item.name.length > 0, "Empty name");
  assert(item.image.length > 0, "Empty image url");
  assert(item.description.length > 0, "Empty location");
	listedItems.set(item.id, Item.fromPayload(item));
}

export function getItem(id: string): Item | null {
	return listedItems.get(id);
}

export function getItems(): Item[] {
	return listedItems.values();
}

/**
 * @dev allow items' owners to put an item on sale
 * @param itemId of item
 * @param price new price of item
 */
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

/**
 * @dev allow items' owners to put an item on rent
 * @param itemId of item
 * @param price new price of item
 */
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


/**
 * @dev allow users to buy an item on sale
 * @param itemId of item
 */
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

/**
 * @dev allow users to rent an item available for rent
 * @param itemId of item
 * @param duration is the duration of rent
 */
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

/**
 * @dev allow items' owners or owners to end rent of an item
 * @param itemId of item
 */
export function endRentItem(itemId: string): void {
	const item = getItem(itemId);
	if (item == null) {
		throw new Error("item not found");
	}
	assert(item.isRented == true, "Item isn't being rented");
  assert(item.rentTime <= context.blockTimestamp, "Renting period isn't over yet");
	assert(
		item.owner.toString() == context.sender.toString() ||
			item.renter.toString() == context.sender.toString(),
		"Only owner or renter of item can end rent"
	);
  item.endRent();
	listedItems.set(item.id, item);
}
