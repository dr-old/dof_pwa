// src/components/__tests__/ReportDesign.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReportDesign from "../ReportDesign";
import "@testing-library/jest-dom";

// Create a custom theme to use in tests
const theme = createTheme({
  palette: {
    mode: "light",
    text: { primary: "#000" },
    warning: { main: "#ff9800" },
  },
});

const renderComponent = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <ReportDesign {...props} />
    </ThemeProvider>
  );
};

describe("ReportDesign Component", () => {
  test("renders correctly", () => {
    const { asFragment } = renderComponent({
      title: "Report Title",
      backgroundColor: "#f0f0f0",
    });

    // Snapshot Test
    expect(asFragment()).toMatchSnapshot();

    // Check if title is rendered inside the button
    expect(screen.getByText("Report Title")).toBeInTheDocument();

    // Check if the download button is present
    expect(screen.getByText("Download Report")).toBeInTheDocument();
  });
});
