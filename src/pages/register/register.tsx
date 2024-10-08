import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Page } from '../../components/page/page.tsx';
import { Link } from 'react-router-dom';
import { Pages } from '../../utils/constants.ts';
import { useForm } from '../../hooks/useForm.ts';
import { register } from '../../services/auth/action.ts';
import { useDispatch } from '../../hooks/redux.ts';
import { IRegisterForm } from '../../utils/types.ts';
import { useSelector } from '../../hooks/redux.ts';

const initForm = {
  name: '',
  email: '',
  password: '',
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { formValues, handleInputsChange, handleSubmit } = useForm(initForm);
  const isFormValid = useMemo(
    () => !(formValues.name && formValues.email && formValues.password),
    [formValues.name, formValues.email, formValues.password],
  );
  const { isLoading, hasError, errorMessage } = useSelector(
    (state) => state.auth,
  );
  const onSubmit = () => {
    dispatch(register(formValues as unknown as IRegisterForm));
  };

  return (
    <Page>
      <div className="wrapper">
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          className="form mb-20"
        >
          <Input
            name="name"
            type="text"
            value={formValues.name}
            onChange={(e) => handleInputsChange(e)}
            placeholder="Имя"
            extraClass="mb-6"
            size="default"
          />
          <EmailInput
            name="email"
            value={formValues.email}
            onChange={(e) => handleInputsChange(e)}
            placeholder={'Укажите e-mail'}
            extraClass="mb-6"
          />
          <PasswordInput
            name="password"
            value={formValues.password}
            onChange={(e) => handleInputsChange(e)}
            placeholder={'Пароль'}
            extraClass="mb-6"
            icon={'ShowIcon'}
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
          >
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Уже зарегистрированы??{' '}
          <Link
            className="link"
            to={Pages.login}
          >
            Войти
          </Link>
        </p>
      </div>
    </Page>
  );
};
