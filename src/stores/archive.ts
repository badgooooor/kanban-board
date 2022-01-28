import _ from "lodash";
import { atom, selector } from "recoil";
import { ArchivedCard } from "../types/KanbanBoard";
import { localStorageEffect } from "./localStorageEffect";

export const archiveState = atom<ArchivedCard[]>({
  key: "state-archived-card",
  default: [],
  effects_UNSTABLE: [localStorageEffect("kanban:archive")],
});

export const orderedArchiveState = selector({
  key: "state-archived-card-ordered",
  get: ({ get }) => {
    const _cards = get(archiveState);

    return _.orderBy(_cards, "createdAt");
  },
});

export const archivedCardsLength = selector({
  key: "state-archived-card-length",
  get: ({ get }) => {
    const _cards = get(archiveState);

    return _cards.length;
  },
});
