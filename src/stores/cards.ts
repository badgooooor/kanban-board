import _ from "lodash";
import { atom, selector } from "recoil";

import { initialItems } from "../mocks/data";

export const cardState = atom({
  key: "card",
  default: initialItems,
});

export const orderedCards = selector({
  key: "orderedCards",
  get: ({ get }) => {
    const _cards = get(cardState);

    return _.orderBy(_cards, ["columnId", "order"], ["asc", "asc"]);
  },
});
