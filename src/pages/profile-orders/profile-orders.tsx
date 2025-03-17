import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserOrders } from '../../services/slices/Profile';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
