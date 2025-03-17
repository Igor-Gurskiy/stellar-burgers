import { FC } from 'react';

import { useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrders,
  selectTotalToday,
  selectTotal,
  fetchFeeds
} from '../../services/slices/Feeds';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  const feed = {
    total: useSelector(selectTotal),
    totalToday: useSelector(selectTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
