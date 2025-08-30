import React from "react";
import { render, screen } from "~/test/test-utils";
import { Label } from "./label";

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Label text</Label>);
    expect(screen.getByText("Label text")).toBeInTheDocument();
  });
});
