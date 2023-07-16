import { useState, useCallback } from "react";

const useFormValidation = () => {
  const [formState, setFormState] = useState({
    values: {},
    errors: {},
    isInputValid: false,
  });

  const handleChange = (event) => {
    const { name, value, validationMessage } = event.target;
    const form = event.target.closest("form");

    setFormState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: validationMessage,
      },
      isInputValid: form ? form.checkValidity() : prevState.isInputValid,
    }));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsInputValid = false) => {
      setFormState({
        values: newValues,
        errors: newErrors,
        isInputValid: newIsInputValid,
      });
    },
    []
  );

  return {
    ...formState,
    handleChange,
    resetForm,
  };
};

export default useFormValidation;
