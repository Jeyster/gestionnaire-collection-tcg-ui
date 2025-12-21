import { Item } from "../../shared/interfaces/item";
import { User } from "../../shared/interfaces/user";

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
