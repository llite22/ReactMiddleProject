import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider = ({
  children,
  initialState,
}: StoreProviderProps) => {
  const store = createReduxStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};
