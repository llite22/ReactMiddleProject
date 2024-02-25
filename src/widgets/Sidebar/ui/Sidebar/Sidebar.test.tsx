import { Sidebar } from "./Sidebar";
import { render, screen } from "@testing-library/react";

describe("Sidebar", () => {
  test("with only first param", () => {
    render(<Sidebar className="test" />);
    screen.debug();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
