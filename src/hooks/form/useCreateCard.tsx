import { ChangeEvent, useState } from "react";
import { Column } from "../../types/KanbanBoard";

const useCreateCard = (columnList: Column[]) => {
  const [column, setColumn] = useState<string>(columnList[0].id ?? "");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"open" | "closed">("open");

  const handleNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescriptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
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
    handleNameChanged,
    handleDescriptionChanged,
    handleStatusChanged,
    handleColumnChanged,
  };
};

export default useCreateCard;
