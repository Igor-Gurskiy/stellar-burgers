import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '../../services/slices/Profile';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  return children;
};
