import { DefaultValue } from "recoil";

type LocalStorageType = {
  setSelf: (value: any) => void;
  onSet: any;
};

export const localStorageEffect =
  <T>(key: string) =>
  ({ setSelf, onSet }: LocalStorageType) => {
    if (typeof window !== "undefined") {
      const savedValue = window.localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue: T) => {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
