import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

test("Home Page Render Properly", () => {
  render(<HomePage />, { wrapper: MemoryRouter });

  const episodeButton = screen.getByTestId("episodeButton");
  const charactersButton = screen.getByTestId("charactersButton");
  expect(episodeButton).toBeInTheDocument();
  expect(charactersButton).toBeInTheDocument();
});
