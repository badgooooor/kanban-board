import { useRecoilValue, useRecoilState } from "recoil";
import {
  archivedCardsLength,
  archiveState,
  orderedArchiveState,
} from "../../stores/archive";
import { ArchivedCard, Card, Column } from "../../types/KanbanBoard";

const useArchive = () => {
  const [, setArchive] = useRecoilState(archiveState);
  const archiveCardList = useRecoilValue(orderedArchiveState);
  const totalLength = useRecoilValue(archivedCardsLength);

  const createArchiveCard = (card: Card, column: Column) => {
    const newArchiveCard: ArchivedCard = {
      ...card,
      columnSnapshot: column,
      order: totalLength,
    };

    setArchive([...archiveCardList, newArchiveCard]);
  };

  return {
    archiveCardList,
    createArchiveCard,
    totalLength,
  };
};

export default useArchive;
