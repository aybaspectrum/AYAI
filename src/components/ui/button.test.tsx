import React from "react";
import { render, screen } from "~/test/test-utils";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant and size classes", () => {
    render(<Button variant="destructive" size="lg">Delete</Button>);
    const btn = screen.getByText("Delete");
    expect(btn.className).toMatch(/bg-destructive/);
    expect(btn.className).toMatch(/h-11/);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
