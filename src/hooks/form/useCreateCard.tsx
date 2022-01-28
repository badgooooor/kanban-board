import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Column } from "../../types/KanbanBoard";

const useCreateCard = (columnList: Column[]) => {
  const [column, setColumn] = useState<string>(columnList[0].id ?? "");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"open" | "closed">("open");
  const [hasFilled, setHasFilled] = useState<boolean>(false);

  const nameError = useMemo(() => {
    return name.length === 0 && hasFilled;
  }, [name, hasFilled]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("open");
    setColumn(columnList[0].id);
    setHasFilled(false);
  };

  useEffect(() => {
    if (name.length > 1 && !hasFilled) {
      setHasFilled(true);
    }
  }, [name, hasFilled]);

  const handleNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescriptionChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleStatusChanged = () => {
    if (status === "open") {
      setStatus("closed");
    } else if (status === "closed") {
      setStatus("open");
    }
  };

  const handleColumnChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setColumn(e.target.value);
  };

  return {
    value: {
      column,
      name,
      description,
      status,
    },
    nameError,
    resetForm,
    handleNameChanged,
    handleDescriptionChanged,
    handleStatusChanged,
    handleColumnChanged,
  };
};

export default useCreateCard;
