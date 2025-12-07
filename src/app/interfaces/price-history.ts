import { Item } from "./item";

export interface PriceHistory {
    id: number,
    item: Item,
    averagePrice: number,
    createdAt: Date
}
