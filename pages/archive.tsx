import { NextPage } from "next";

import ArchiveList from "../src/components/ArchiveList";
import Header from "../src/components/core/Header";

const ArchivePage: NextPage = () => {
  return (
    <div>
      <Header />
      <ArchiveList />
    </div>
  );
};

export default ArchivePage;
