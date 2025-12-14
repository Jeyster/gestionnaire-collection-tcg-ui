import { Timestamp } from "rxjs";
import { Expansion } from "./expansion";
import { Game } from "./game";
import { Item } from "./item";
import { ItemType } from "./item-type";
import { Locale } from "./locale";
import { User } from "./user";

export interface UserItem {
    id: number,
    user: User,
    item: Item,
    purchasePrice: number,
    purchaseDate: Date,
    sellingPrice: number,
    sellingOrOpeningDate: Date,
    comment: string
}
