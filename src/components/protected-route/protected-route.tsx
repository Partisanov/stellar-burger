import { Navigate, useLocation } from 'react-router-dom';
import { Pages } from '../../utils/constants.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store.ts';

interface IProtectedRoute {
  children: JSX.Element;
  forAnonymous?: boolean;
  redirectPath?: Pages;
}

export const ProtectedRoute = ({
  children,
  forAnonymous = false,
  redirectPath,
}: IProtectedRoute) => {
  const location = useLocation();

  const { isLogIn } = useSelector((state: RootState) => state.auth);
  const from = location.state?.from || '/';

  if (forAnonymous && isLogIn) {
    return <Navigate to={redirectPath || from} />;
  }

  if (!forAnonymous && !isLogIn) {
    return (
      <Navigate
        to={redirectPath || Pages.login}
        state={{ from: location }}
      />
    );
  }

  return children;
};
