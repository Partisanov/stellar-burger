import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header.tsx';
import {
  ForgotPasswordPage,
  HomePage,
  IngredientsPage,
  LoginPage,
  NotFoundPage,
  OrderPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import { Pages } from '../../utils/constants.ts';
import { ProtectedRoute } from '../protected-route/protected-route.tsx';
import { Modal } from '../modal/modal.tsx';
import { Ingredient } from '../ingredient/ingredient.tsx';
import React, { useEffect } from 'react';
import { getUser } from '../../services/auth/action.ts';
import { useDispatch } from '../../hooks/redux.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileUserInfo } from '../profile-user-info/profile-user-info.tsx';
import { OrdersHistoryList } from '../orders-history-list/orders-history-list.tsx';
import { fetchIngredients } from '../../services/ingredients/action.ts';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(getUser());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          path={Pages.home}
          element={<HomePage />}
        />
        <Route
          path={Pages.login}
          element={
            <ProtectedRoute forAnonymous={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Pages.register}
          element={
            <ProtectedRoute forAnonymous={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Pages.forgotPassword}
          element={
            <ProtectedRoute forAnonymous={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Pages.resetPassword}
          element={
            <ProtectedRoute forAnonymous={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={Pages.ingredients}
          element={<IngredientsPage />}
        />
        <Route
          path={Pages.profile}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route
            path='/profile'
            element={<ProfileUserInfo />}
          />
          <Route
            path='/profile/orders'
            element={<OrdersHistoryList />}
          />
        </Route>
        <Route
          path={Pages.order}
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
      {background && (
        <Modal
          caption='Детали ингредиента'
          onClose={() => navigate(-1)}
        >
          <Ingredient />
        </Modal>
      )}
      <ToastContainer position='top-right' />
    </>
  );
}

export default App;
