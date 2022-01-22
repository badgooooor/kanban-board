import { Card, Column } from "../types/KanbanBoard";

export const columns: Column[] = [
  {
    id: "83d3caca-411f-46ee-ad3f-997984be6384",
    name: "To Do",
    order: 1,
  },
  {
    id: "f31c00eb-c097-4a5a-a55a-c79d18c56ab2",
    name: "In Progress",
    order: 2,
  },
  {
    id: "5fbd5048-3f50-4ae9-afc9-297e2add6836",
    name: "Done",
    order: 3,
  },
];

export const initialItems: Card[] = [
  {
    id: "1adfsdff",
    columnId: "83d3caca-411f-46ee-ad3f-997984be6384",
    name: "Task A",
    description: "Test description",
    createdAt: new Date(),
    status: "open",
    order: 1,
  },
  {
    id: "2asdfasd",
    columnId: "83d3caca-411f-46ee-ad3f-997984be6384",
    name: "Task B",
    description: "Another description",
    createdAt: new Date(),
    status: "open",
    order: 2,
  },
  {
    id: "3sdafsdf",
    columnId: "83d3caca-411f-46ee-ad3f-997984be6384",
    name: "Task C",
    description: "Space description",
    createdAt: new Date(),
    status: "open",
    order: 3,
  },
];
