import { ReduxStoreWithReducerManager } from "@/app/providers/StoreProvider";
import { StateSchemaKey } from "@/app/providers/StoreProvider/config/StateSchema";
import { Reducer } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch/useAppDispatch";

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  children: React.ReactNode;
  reducers: ReducerList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
  children,
  reducers,
  removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
  const store = useStore() as ReduxStoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, _]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@Destroy ${name} reducer` });
        });
      }
    };
  }, []);
  return <>{children}</>;
};
