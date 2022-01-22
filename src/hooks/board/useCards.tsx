import _ from "lodash";

import { useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { cardState, orderedCards } from "../../stores/cards";

import { Card } from "../../types/KanbanBoard";

const useCards = () => {
  const [items, setItems] = useRecoilState(cardState);
  const cards = useRecoilValue(orderedCards);

  const dragData = useRef<Card | null>();
  const dragOverItem = useRef<Card | null>();
  const dragOverGroup = useRef<any>({});

  const handleDragStart = (item: Card) => {
    dragData.current = item;
  };

  const handleDragEnterColumn = (columnId: string) => {
    dragOverGroup.current = columnId;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDragOverItem = (item: Card) => {
    dragOverItem.current = item;
  };

  const getSortedColumnCardList = (
    targetItem: Card,
    columnId: string
  ): Card[] => {
    const newOrder = cards.filter((card) => card.columnId === columnId);
    const targetIndex = cards.findIndex(
      (card) => card.id === dragOverItem.current?.id
    );

    const newCards = [...newOrder].filter((item) => item.id !== targetItem.id);
    const newCard: Card = _.cloneDeep(targetItem);

    newCard.columnId = columnId;
    newCards.splice(targetIndex, 0, newCard);

    return newCards.map((item, idx) => {
      return {
        ...item,
        order: idx + 1,
      };
    });
  };

  const updateItem = (targetItem: Card, columnId: string) => {
    const cardsWithoutUpdatedOrders = items.filter(
      (card) => card.columnId !== columnId && targetItem.id !== card.id
    );
    const cardWithUpdatedOrders = getSortedColumnCardList(targetItem, columnId);

    setItems([...cardWithUpdatedOrders, ...cardsWithoutUpdatedOrders]);
  };

  const handleDrop = (e: any) => {
    const selected = dragData.current;

    if (selected) {
      updateItem(selected, dragOverGroup.current);
    }
    dragOverItem.current = null;
    dragOverGroup.current = null;
    dragData.current = null;
  };

  return {
    cards,
    handleDragStart,
    handleDragEnterColumn,
    handleDragOver,
    handleDragOverItem,
    handleDrop,
  };
};

export default useCards;
