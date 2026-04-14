import { render, screen } from "@testing-library/react";

import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
import "@testing-library/jest-dom";

//import the components
import Home from "../pages/index";

describe("Home", () => {
  it("renders the page components", () => {
    useRouter.mockReturnValue({ query: {} });
    render(<Home />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works")).toBeInTheDocument();
    expect(screen.getByTestId("how-help")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
