import type { NextPage } from "next";

import Header from "../src/components/core/Header";
import DndContainer from "../src/components/KanbanBoard";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Header />
      <DndContainer />
    </div>
  );
};

export default IndexPage;
