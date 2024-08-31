import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, Pages } from '../../utils/constants.ts';
import { Page } from '../../components/page/page.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { IAxiosErrorResponse } from '../../utils/types.ts';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { setResetPassword } from '../../utils/local-storage.ts';
import { toast } from 'react-toastify';

const initForm = {
  email: '',
};

export const ForgotPasswordPage = () => {
  const { formValues, handleInputsChange, handleSubmit } = useForm(initForm);
  const navigate = useNavigate(); // Хук для перенаправления
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  interface IForgotResponse {
    success: boolean;
    message: string;
  }
  const onSubmit = async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
    try {
      const response = await axios.post<IForgotResponse>(
        `${BASE_URL}/password-reset`,
        {
          email: formValues.email,
        },
      );

      if (response.data.success) {
        setResetPassword();
        navigate(Pages.resetPassword);
        toast.success('Письмо для сброса пароля отправлено!');
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
          <EmailInput
            name='email'
            value={formValues.email}
            onChange={(e) => handleInputsChange(e)}
            placeholder={'Укажите e-mail'}
            extraClass='mb-6'
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
            disabled={!formValues.email || isLoading}
          >
            Восстановить
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
