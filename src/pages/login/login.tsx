import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Page } from '../../components/page/page.tsx';
import { Link } from 'react-router-dom';
import { Pages } from '../../utils/constants.ts';
import { useForm } from '../../hooks/useForm.ts';
import { useSelector } from '../../hooks/redux.ts';
import { ILoginForm } from '../../utils/types.ts';
import { login } from '../../services/auth/action.ts';
import { useDispatch } from '../../hooks/redux.ts';

const initForm = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { formValues, handleInputsChange, handleSubmit } = useForm(initForm);
  const { isLoading, hasError, errorMessage } = useSelector(
    (state) => state.auth,
  );

  const isFormValid = useMemo(
    () => !(formValues.email && formValues.password),
    [formValues.email, formValues.password],
  );

  const onSubmit = () => {
    dispatch(login(formValues as unknown as ILoginForm));
  };

  return (
    <Page>
      <div className="wrapper">
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          className="form mb-20"
        >
          <EmailInput
            name="email"
            value={formValues.email}
            onChange={(e) => handleInputsChange(e)}
            placeholder={'Укажите e-mail'}
            extraClass="mb-6"
            data-testid="email-login-field"
          />
          <PasswordInput
            name="password"
            value={formValues.password}
            onChange={(e) => handleInputsChange(e)}
            placeholder={'Пароль'}
            extraClass="mb-6"
            icon={'ShowIcon'}
            data-testid="password-login-field"
          />
          {hasError && (
            <p className="text text_type_main-small mb-6 error">
              {errorMessage}
            </p>
          )}
          <Button
            htmlType="submit"
            size="medium"
            extraClass="mb-6"
            disabled={isFormValid || isLoading}
            data-testid="login-submit-btn"
          >
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Вы — новый пользователь?{' '}
          <Link
            className="link"
            to={Pages.register}
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Забыли пароль?{' '}
          <Link
            className="link"
            to={Pages.forgotPassword}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </Page>
  );
};
