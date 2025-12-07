import { Expansion } from "./expansion";
import { Game } from "./game";
import { ItemType } from "./item-type";
import { Locale } from "./locale";

export interface Item {
    id: number,
    url: string,
    game: Game,
    itemType: ItemType,
    locale: Locale,
    expansion: Expansion,
    complement: string
}
