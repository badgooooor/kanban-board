import _ from "lodash";
import { atom, selector } from "recoil";

import { initialItems } from "../mocks/data";
import { localStorageEffect } from "./localStorageEffect";

export const cardState = atom({
  key: "state-card",
  default: initialItems,
  effects_UNSTABLE: [localStorageEffect("kanban:cards")],
});

export const orderedCards = selector({
  key: "state-card-ordered",
  get: ({ get }) => {
    const _cards = get(cardState);

    return _.orderBy(_cards, ["columnId", "order"], ["asc", "asc"]);
  },
});

export const columnCardsLength = selector({
  key: "state-column-card-length",
  get: ({ get }) => {
    const _cards = get(cardState);
    const columnLength = _.countBy(_cards, "columnId");

    return {
      columnLength: columnLength,
      totalLength: _.sum(_.values(columnLength)),
    };
  },
});
