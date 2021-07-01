import React, { useCallback } from 'react';

// хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

// хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, handleChange, errors, isValid, resetForm,
  };
}
