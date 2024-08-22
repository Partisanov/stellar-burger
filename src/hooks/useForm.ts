import { ChangeEvent, FormEvent, useState } from 'react';

interface FormValues {
  [key: string]: string;
}

export const useForm = (inputValues: FormValues) => {
  const [formValues, setFormValues] = useState<FormValues>(inputValues);

  const handleInputsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit =
    (callback: () => void) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      callback();
    };

  return { formValues, handleInputsChange, setFormValues, handleSubmit };
};
