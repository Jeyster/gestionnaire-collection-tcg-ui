import { Expansion } from "./expansion";
import { Game } from "./game";
import { ItemType } from "./item-type";
import { Locale } from "./locale";

export interface Item {
    id: number,
    game: Game,
    itemType: ItemType,
    expansion: Expansion,
    locale: Locale,
    complement: string
    url: string,
    isCmScrapingActive: boolean
}
