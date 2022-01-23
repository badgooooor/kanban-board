import { ChangeEvent, useState } from "react";

const useCreateColumn = () => {
  const [name, setName] = useState<string>("");

  const handleNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return {
    name,
    handleNameChanged,
  };
};

export default useCreateColumn;
