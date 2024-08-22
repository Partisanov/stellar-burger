import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, Pages } from '../../utils/constants.ts';
import { Page } from '../../components/page/page.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { useEffect, useMemo, useState } from 'react';
import { IAxiosErrorResponse, IInputInterface } from '../../utils/types.ts';
import {
  clearResetPassword,
  getResetPassword,
} from '../../utils/local-storage.ts';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const initForm = {
  password: '',
  token: '',
};

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { formValues, handleInputsChange, handleSubmit } = useForm(initForm);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = useMemo(
    () => !(formValues.password && formValues.token),
    [formValues.password, formValues.token],
  );
  useEffect(() => {
    if (!getResetPassword()) {
      navigate(Pages.forgotPassword);
    }
  }, [navigate]);

  const onSubmit = async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    try {
      const response = await axios.post<{ success: boolean; message: string }>(
        `${BASE_URL}/password-reset/reset`,
        {
          password: formValues.password,
          token: formValues.token,
        },
      );

      if (response.data.success) {
        clearResetPassword();
        toast.success('Пароль успешно сброшен!');
        navigate(Pages.login);
      } else {
        setErrorMessage(response.data.message);
        setHasError(true);
        toast.error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<IAxiosErrorResponse>;
      toast.error(
        axiosError.message || 'Произошла ошибка. Попробуйте еще раз.',
      );
      setErrorMessage(
        axiosError.message || 'Произошла ошибка. Попробуйте еще раз.',
      );
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <div className='wrapper'>
        <h2 className='mb-6'>Восстановление пароля</h2>
        <form
          onSubmit={handleSubmit(() => onSubmit())}
          className='form mb-20'
        >
          <PasswordInput
            name='password'
            onChange={(e) => handleInputsChange(e)}
            value={formValues.password}
            placeholder='Введите новый пароль'
            extraClass='pb-6'
          />
          <Input
            {...({
              name: 'token',
              type: 'text',
              onChange: (e) => handleInputsChange(e),
              value: formValues.token,
              placeholder: 'Введите код из письма',
              error: false,
              errorText: 'Ошибка',
              size: 'default',
              extraClass: 'pb-6',
            } as IInputInterface)}
          />
          {hasError && (
            <p className='text text_type_main-small mb-6 error'>
              {errorMessage}
            </p>
          )}
          <Button
            htmlType='submit'
            size='medium'
            extraClass='mb-6'
            disabled={isFormValid || isLoading}
          >
            Сохранить
          </Button>
        </form>
        <p className='text text_type_main-default text_color_inactive pb-4'>
          Вспомнили пароль?{' '}
          <Link
            className='link'
            to={Pages.login}
          >
            Войти
          </Link>
        </p>
      </div>
    </Page>
  );
};
