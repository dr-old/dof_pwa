import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BarDesign from "../BarDesign";

// Mock theme for testing
const theme = createTheme();

describe("BarDesign Component", () => {
  test("renders title correctly", () => {
    const title = "Test Title";
    render(
      <ThemeProvider theme={theme}>
        <BarDesign title={title} />
      </ThemeProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("handles bar click event", () => {
    render(
      <ThemeProvider theme={theme}>
        <BarDesign title="Sample Title" />
      </ThemeProvider>
    );

    const barChart = screen.getByTestId("bar-chart");
    fireEvent.click(barChart);

    // You can add more assertions here to check if the state is updated or other changes occur
    expect(barChart).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <BarDesign title="Snapshot Title" />
      </ThemeProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
