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
}
