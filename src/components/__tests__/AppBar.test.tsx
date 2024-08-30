// src/components/__tests__/AppBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "../AppBar";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "@testing-library/jest-dom";

// Create a custom theme to use in tests
const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#ffffff" },
    text: { secondary: "#000" },
    action: { hover: "#e0e0e0" },
  },
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

// Mock functions
const mockToggleMenu = jest.fn();

const renderComponent = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar {...props} />
      </Router>
    </ThemeProvider>
  );
};

describe("AppBar Component", () => {
  test("renders correctly with menu and search", () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { title: "Dashboard" },
    });

    const { asFragment } = renderComponent({
      isMenuOpen: false,
      toggleMenu: mockToggleMenu,
      isMobile: true,
    });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if title is rendered - adjust if state.title is set
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();

    // Check if search icon button is present
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    // Click on the search icon to open search
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // Check if the search input field is rendered
    expect(
      screen.getByPlaceholderText("Search something...")
    ).toBeInTheDocument();

    // Click on the close icon to close search
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    // Check if the search input field is no longer rendered
    expect(
      screen.queryByPlaceholderText("Search something...")
    ).not.toBeInTheDocument();
  });

  test("calls toggleMenu function when menu button is clicked", () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { title: "Dashboard" },
    });

    renderComponent({
      isMenuOpen: false,
      toggleMenu: mockToggleMenu,
      isMobile: true,
    });

    // Click the menu button
    fireEvent.click(screen.getByRole("button", { name: /open drawer/i }));

    // Check if toggleMenu was called
    expect(mockToggleMenu).toHaveBeenCalled();
  });

  test("renders correctly without search and menu", () => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { title: "Dashboard" },
    });

    const { asFragment } = renderComponent({
      isMenuOpen: false,
      toggleMenu: mockToggleMenu,
      isMobile: false,
    });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if the search and menu buttons are not rendered
    expect(
      screen.queryByRole("button", { name: /search/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /open drawer/i })
    ).not.toBeInTheDocument();
  });
});
