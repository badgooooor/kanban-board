export type Column = {
  id: string;
  name: string;
  order: number;
};

export type Card = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: "open" | "closed";
  order: number;
  columnId: string;
};

export type ArchivedCard = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  status: "open" | "closed";
  order: number;
  columnSnapshot: Column;
};
