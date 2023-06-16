import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  it("renders the component", () => {
    render(<App />);
    const componentElement = screen.getByTestId("app");
    expect(componentElement).toBeInTheDocument();
  });
});
