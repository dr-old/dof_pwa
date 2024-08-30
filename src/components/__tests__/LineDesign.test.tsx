import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LineDesign from "../LineDesign";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";

// Mocking the ChartContainer and related components
jest.mock("@mui/x-charts", () => ({
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  LinePlot: () => <div data-testid="line-plot" />,
  MarkPlot: () => <div data-testid="mark-plot" />,
  lineElementClasses: {
    root: "line-element-root",
  },
  markElementClasses: {
    root: "mark-element-root",
  },
}));

describe("LineDesign Component", () => {
  const theme = createTheme();

  const renderComponent = (backgroundColor?: string, title?: string) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <LineDesign backgroundColor={backgroundColor} title={title} />
        </MemoryRouter>
      </ThemeProvider>
    );

  it("renders the title correctly", () => {
    renderComponent("#ffffff", "Test Title");
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the chart components", () => {
    renderComponent();
    expect(screen.getByTestId("chart-container")).toBeInTheDocument();
    expect(screen.getByTestId("line-plot")).toBeInTheDocument();
    expect(screen.getByTestId("mark-plot")).toBeInTheDocument();
  });

  it("displays the correct ROI text", () => {
    renderComponent();
    expect(screen.getByText("282%")).toBeInTheDocument();
    expect(screen.getByText("Return On Investment")).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = renderComponent("#ffffff", "Snapshot Title");
    expect(asFragment()).toMatchSnapshot();
  });
});
