import { Item } from "../../shared/interfaces/item";

export interface ItemPriceHistory {
    id: number,
    item: Item,
    averagePrice: number,
    createdAt: Date
}
