import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ConstructorPage } from '../../pages/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleModalClose = () => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title='' onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
