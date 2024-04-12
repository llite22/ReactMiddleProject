import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: StateSchema;
  asyncReducers?: ReducersMapObject<StateSchema>;
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProviderProps) => {
  const navigate = useNavigate();
  const store = createReduxStore(initialState, asyncReducers, navigate);
  return <Provider store={store}>{children}</Provider>;
};
