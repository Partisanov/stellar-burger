import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-user-info.module.css';
import { useSelector } from '../../hooks/redux.ts';
import { useForm } from '../../hooks/useForm.ts';
import { useDispatch } from '../../hooks/redux.ts';
import React, { useEffect, useState } from 'react';
import { updateUser } from '../../services/auth/action.ts';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const ProfileUserInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((store) => store.auth);
  const initialFormValues = {
    name: user.name,
    email: user.email,
    password: '',
  };

  const [isChanged, setIsChanged] = useState(false);
  const { formValues, handleInputsChange, setFormValues, handleSubmit } =
    useForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
    });
  const handlerSave = async () => {
    dispatch(
      updateUser({
        name: formValues.nane,
        email: formValues.email,
        password: formValues.password,
      }),
    )
      .unwrap()
      .then(() => {
        setIsChanged(false);
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      });
  };
  const handlerReset = () => {
    setFormValues({
      name: user.name || '',
      email: user.email || '',
      password: '',
    });
    setIsChanged(false);
  };
  useEffect(() => {
    const isFormChanged =
      formValues.name !== initialFormValues.name ||
      formValues.email !== initialFormValues.email ||
      formValues.password !== initialFormValues.password;

    setIsChanged(isFormChanged);
  }, [formValues]);

  return (
    <div>
      <form
        className='form'
        onSubmit={handleSubmit(() => handlerSave())}
      >
        <Input
          type='text'
          name='name'
          value={formValues.name}
          onChange={(e) => handleInputsChange(e)}
          placeholder='Имя'
          extraClass='mb-6'
          size='default'
          icon='EditIcon'
          autoComplete='off'
        />

        <EmailInput
          name='email'
          value={formValues.email}
          onChange={(e) => handleInputsChange(e)}
          placeholder={'E-mail'}
          extraClass='mb-6'
          isIcon={true}
        />
        <PasswordInput
          name='password'
          value={formValues.password}
          onChange={(e) => handleInputsChange(e)}
          placeholder={'Пароль'}
          extraClass='mb-6'
          icon={'EditIcon'}
        />
        {isChanged && (
          <div className={styles.buttons}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              extraClass='mr-5'
              onClick={handlerReset}
              disabled={isLoading || !isChanged}
            >
              Отмена
            </Button>
            <Button
              htmlType='submit'
              size='medium'
              disabled={isLoading || !isChanged}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
