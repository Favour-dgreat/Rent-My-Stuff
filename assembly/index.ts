import { Item, listedItems } from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

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

export function sellItem(itemId: string): void {
  const item = getItem(itemId);
  if (item == null) {
    throw new Error("item not found");
  }
  if (item.owner != context.sender) {
    throw new Error("You are not the owner");
  }
  item.isSale = true;
  item.isBought = false;
  listedItems.set(item.id, item);

}