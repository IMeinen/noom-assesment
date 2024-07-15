import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NotFoundPage } from "../404";

describe("NotFoundPage", () => {
  test("renders 404 | Not Found heading", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    const headingElement = screen.getByText(/404 | not found/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders a link to go back to the home page", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    const linkElement = screen.getByRole("link", { name: /back to home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
