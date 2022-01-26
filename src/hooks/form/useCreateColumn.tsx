import { ChangeEvent, useEffect, useMemo, useState } from "react";

const useCreateColumn = () => {
  const [name, setName] = useState<string>("");
  const [hasFilled, setHasFilled] = useState<boolean>(false);

  const nameError = useMemo(() => {
    return name.length === 0 && hasFilled;
  }, [name, hasFilled]);

  const handleNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setHasFilled(false);
  };

  useEffect(() => {
    if (name.length > 1 && !hasFilled) {
      setHasFilled(true);
    }
  }, [name, hasFilled]);

  return {
    name,
    handleNameChanged,
    nameError,
    resetForm,
  };
};

export default useCreateColumn;
