import { InjectionKey } from "@vue/composition-api";
import { useTodos } from "./useTodos";

export default function store() {
  return {
    ...useTodos()
  };
}

export type Store = ReturnType<typeof store>;
export const StoreKey: InjectionKey<Store> = Symbol("Store");
