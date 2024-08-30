// src/components/__tests__/ToggleTheme.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleTheme from "../ToggleTheme";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// Mock the useColorMode hook
const mockToggleColorMode = jest.fn();

jest.mock("../../context/useColorMode", () => ({
  useColorMode: () => ({
    toggleColorMode: mockToggleColorMode,
  }),
}));

// Create a custom theme to use in tests
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#ffffff" },
    warning: { main: "#ff9800" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    background: { default: "#121212" },
    warning: { main: "#ff9800" },
  },
});

const renderComponent = (theme: any, props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ToggleTheme {...props} />
    </ThemeProvider>
  );
};

describe("ToggleTheme Component", () => {
  test("renders correctly in light mode", () => {
    const { asFragment } = renderComponent(lightTheme, { reverseColor: false });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if the light mode text is displayed
    expect(screen.getByText("light mode")).toBeInTheDocument();

    // Check if the Brightness4Rounded icon is present
    expect(screen.getByTestId("brightness4-icon")).toBeInTheDocument();
  });

  test("renders correctly in dark mode", () => {
    const { asFragment } = renderComponent(darkTheme, { reverseColor: false });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if the dark mode text is displayed
    expect(screen.getByText("dark mode")).toBeInTheDocument();

    // Check if the Brightness7Rounded icon is present
    expect(screen.getByTestId("brightness7-icon")).toBeInTheDocument();
  });

  test("handles button click", () => {
    renderComponent(lightTheme, { reverseColor: false });

    // Click the button
    fireEvent.click(screen.getByRole("button"));

    // Check if toggleColorMode was called
    expect(mockToggleColorMode).toHaveBeenCalled();
  });
});
