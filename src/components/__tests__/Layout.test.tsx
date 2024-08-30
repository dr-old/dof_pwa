import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../Layout";
import { MemoryRouter } from "react-router-dom";

// Mock the AppBar and ListMenu components
jest.mock("../AppBar", () => {
  return function DummyAppBar({
    isMenuOpen,
    toggleMenu,
    isMobile,
  }: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isMobile: boolean;
  }) {
    return (
      <div data-testid="app-bar">
        <button onClick={toggleMenu}>Toggle Menu</button>
        <span>{isMenuOpen ? "Menu Open" : "Menu Closed"}</span>
        <span>{isMobile ? "Mobile View" : "Desktop View"}</span>
      </div>
    );
  };
});

jest.mock("../ListMenu", () => {
  return function DummyListMenu({
    isMenuOpen,
    toggleMenu,
    isMobile,
  }: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    isMobile: boolean;
  }) {
    return (
      <div data-testid="list-menu">
        <span>{isMenuOpen ? "Menu Visible" : "Menu Hidden"}</span>
        <span>{isMobile ? "Mobile Menu" : "Desktop Menu"}</span>
      </div>
    );
  };
});

// Mock Outlet from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

describe("Layout Component", () => {
  it("renders AppBar and ListMenu components correctly", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Check if AppBar and ListMenu components are rendered
    expect(screen.getByTestId("app-bar")).toBeInTheDocument();
    expect(screen.getByTestId("list-menu")).toBeInTheDocument();
  });

  it("toggles the menu when the AppBar toggle button is clicked", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Initially, the menu should be closed
    expect(screen.getByText("Menu Closed")).toBeInTheDocument();
    expect(screen.getByText("Menu Hidden")).toBeInTheDocument();

    // Click the toggle button to open the menu
    fireEvent.click(screen.getByText("Toggle Menu"));

    // The menu should now be open
    expect(screen.getByText("Menu Open")).toBeInTheDocument();
    expect(screen.getByText("Menu Visible")).toBeInTheDocument();

    // Click the toggle button to close the menu
    fireEvent.click(screen.getByText("Toggle Menu"));

    // The menu should now be closed again
    expect(screen.getByText("Menu Closed")).toBeInTheDocument();
    expect(screen.getByText("Menu Hidden")).toBeInTheDocument();
  });

  it("renders Outlet content correctly", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Check if the Outlet content is rendered
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Create a snapshot of the component
    expect(asFragment()).toMatchSnapshot();
  });
});
