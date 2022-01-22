import _ from "lodash";
import { atom, selector } from "recoil";

import { columns } from "../mocks/data";

export const columnState = atom({
  key: "column",
  default: columns ?? [],
});

export const orderedColumns = selector({
  key: "orderedColumns",
  get: ({ get }) => {
    const _columns = get(columnState);

    return _.orderBy(_columns, "order");
  },
});
