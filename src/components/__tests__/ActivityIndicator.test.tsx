import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Provides the `toBeInTheDocument` matcher
import ActivityIndicator from "../ActivityIndicator";
import { hexToRgba } from "../../utils/helpers";
import { colors } from "../../utils/colors";

describe("ActivityIndicator", () => {
  test("renders without crashing", () => {
    render(<ActivityIndicator />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders with custom size and color", () => {
    render(<ActivityIndicator size={50} color="secondary" thickness={4.5} />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveStyle({ width: "50px", height: "50px" }); // Custom size
    expect(progress).toHaveClass("MuiCircularProgress-colorSecondary"); // Custom color
  });

  test("renders in full-screen mode", () => {
    render(<ActivityIndicator fullScreen />);
    const container = screen.getByRole("progressbar").parentElement;
    expect(container).toHaveStyle({
      width: "100vw",
      height: "100vh",
      position: "fixed",
    });

    // Check background color separately to avoid color conversion issues
    const computedStyle = window.getComputedStyle(container as Element);
    expect(computedStyle.backgroundColor).toBe(
      hexToRgba(colors.dark.background.default, 0.7)
    );
  });

  test("does not render full-screen when fullScreen is false", () => {
    render(<ActivityIndicator fullScreen={false} />);
    const container = screen.getByRole("progressbar").parentElement;
    expect(container).toHaveStyle({
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: "transparent",
    });
  });

  // Snapshot test
  test("matches snapshot", () => {
    const { asFragment } = render(<ActivityIndicator />);
    expect(asFragment()).toMatchSnapshot();
  });
});
