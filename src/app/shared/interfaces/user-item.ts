import { UserItemStatus } from "../enums/user-item-status";
import { Item } from "./item";
import { User } from "./user";

export interface UserItem {
    id: number,
    user: User,
    item: Item,
    purchasePrice: number,
    purchaseDate: Date,
    purchaseComment: string,
    sellingPrice: number,
    sellingOrOpeningDate: Date,
    sellingOrOpeningComment: string
    status: UserItemStatus
}


export function isPurchased(userItem: UserItem): boolean {
  return userItem.status === UserItemStatus.PURCHASED;
}

export function isSold(userItem: UserItem): boolean {
  return userItem.status === UserItemStatus.SOLD;
}

export function isOpened(userItem: UserItem): boolean {
  return userItem.status === UserItemStatus.OPENED;
}
