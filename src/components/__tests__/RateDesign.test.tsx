// src/components/__tests__/RateDesign.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RateDesign from "../RateDesign";
import "@testing-library/jest-dom";

// Create a custom theme to use in tests
const theme = createTheme({
  palette: {
    mode: "light",
    text: { primary: "#000" },
    background: { default: "#fff" },
    secondary: { main: "#ff5722" },
    warning: { main: "#ff9800" },
  },
});

const renderComponent = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <RateDesign {...props} />
    </ThemeProvider>
  );
};

describe("RateDesign Component", () => {
  test("renders correctly", () => {
    const { asFragment } = renderComponent({
      title: "Test Title",
      backgroundColor: "#f0f0f0",
    });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if title is rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Check if icon button is present
    expect(screen.getByRole("button")).toBeInTheDocument();

    // Check if the values are rendered
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Tue")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });

  test("handles click events", () => {
    renderComponent({ title: "Test Title", backgroundColor: "#f0f0f0" });

    // Click on the first item
    fireEvent.click(screen.getByText("Mon"));

    // Check if the border color changed (assuming border color changes on selection)
    const monBox = screen.getByText("Mon").closest("div");
    expect(monBox).toHaveStyle(`border-color: ${theme.palette.warning.main}`);
  });
});
