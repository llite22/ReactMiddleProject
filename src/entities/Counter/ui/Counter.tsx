import { Button } from "@/shared/ui/Button/Button";
import { counterActions, useCounterActions } from "../model/slice/CounterSlice";
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue";

export const Counter = () => {
  const value = useCounterValue();
  const { decrement, increment, add } = useCounterActions();
  const handleIncrement = () => {
    increment();
  };
  const handleDecrement = () => {
    decrement();
  };

  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1>{value}</h1>
      <Button onClick={handleAddFive}>AddFive</Button>
      <Button onClick={handleIncrement}>increment</Button>
      <Button onClick={handleDecrement}>decrement</Button>
    </div>
  );
};
