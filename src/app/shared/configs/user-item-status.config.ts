import { UserItemStatus } from '../enums/user-item-status';

export const USER_ITEM_STATUS_CONFIG: Record<
  UserItemStatus,
  { label: string; color: string; icon: string }
> = {
  [UserItemStatus.PURCHASED]: {
    label: 'Acheté',
    color: 'var(--color-purchase)',
    icon: 'shopping_cart',
  },
  [UserItemStatus.SOLD]: {
    label: 'Vendu',
    color: 'var(--color-sell)',
    icon: 'sell',
  },
  [UserItemStatus.OPENED]: {
    label: 'Ouvert',
    color: 'var(--color-open)',
    icon: 'auto_awesome',
  },
};
