import { Button, ThemeButton } from "./Button";
import { render, screen } from "@testing-library/react";

describe("classNames", () => {
  test("with only first param", () => {
    render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
    screen.debug()
    expect(screen.getByText("TEST")).toHaveClass("clear");
  });
  
});
