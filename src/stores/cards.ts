import _ from "lodash";
import { atom, selector } from "recoil";

import { initialItems } from "../mocks/data";

export const cardState = atom({
  key: "state-card",
  default: initialItems,
});

export const orderedCards = selector({
  key: "state-card-ordered",
  get: ({ get }) => {
    const _cards = get(cardState);

    return _.orderBy(_cards, ["columnId", "order"], ["asc", "asc"]);
  },
});
