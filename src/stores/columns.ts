import _ from "lodash";
import { atom, selector } from "recoil";

import { columns } from "../mocks/data";
import { localStorageEffect } from "./localStorageEffect";

export const columnState = atom({
  key: "state-columns",
  default: columns ?? [],
  effects_UNSTABLE: [localStorageEffect("kanban:columns")],
});

export const orderedColumns = selector({
  key: "state-ordered-columns",
  get: ({ get }) => {
    const _columns = get(columnState);

    return _.orderBy(_columns, "order");
  },
});
