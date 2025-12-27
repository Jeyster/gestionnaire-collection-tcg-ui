export interface ItemSearchFiltersDto {
  gameId: number | null;
  itemTypeId: number | null;
  localeId: number | null;
  expansionId: number | null;
  pageIndex?: number | null;
  pageSize?: number | null;
  sort?: string | null;
  direction?: 'asc' | 'desc' | null;
}
