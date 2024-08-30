import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArcDesign from "../ArchDesign";

describe("ArcDesign Component", () => {
  // Create a theme for testing inside the test function
  const theme = createTheme();

  test("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <ArcDesign backgroundColor="#fff" title="Performance" />
      </ThemeProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays the correct title and details", () => {
    render(
      <ThemeProvider theme={theme}>
        <ArcDesign backgroundColor="#fff" title="Performance" />
      </ThemeProvider>
    );

    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
    expect(screen.getByText("Social Media")).toBeInTheDocument();
    expect(screen.getByText("78%")).toBeInTheDocument();
    expect(screen.getByText("Organic Search")).toBeInTheDocument();
    expect(screen.getByText("22%")).toBeInTheDocument();
    // Add any additional checks if needed
  });
});
