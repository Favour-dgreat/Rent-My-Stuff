import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function addItem(item) {
  console.log(item);
  item.id = uuid4();
  item.price = parseNearAmount(item.price + "");
  return window.contract.setItem({ item });
}

export function getItems() {
  return window.contract.getItems();
}

export async function buyItem({ id, price }) {
    await window.contract.buyItem({ itemId: id }, GAS, price);
}

export async function rentingItem({ id, price }) {
  await window.contract.rentingItem({ itemId: id }, GAS, price);
}

export async function rentItem({ id }) {
  await window.contract.rentItem({ itemId: id });
}

export async function sellItem({ id }) {
  await window.contract.sellItem({ itemId: id });
}

export async function redeemItem({id}){
    await window.contract.redeemItem({itemId: id});
}
