export interface CreateItemDto {
    gameId: number,
    itemTypeId: number,
    expansionId: number,
    localeId: number,
    complement: string,
    url: string,
    isCmScrapingActive: boolean
}
