import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LayoutAuth from "../LayoutAuth";

// Mock the ActivityIndicator component
jest.mock("../ActivityIndicator", () => {
  return function DummyActivityIndicator() {
    return <div data-testid="activity-indicator" />;
  };
});

describe("LayoutAuth Component", () => {
  it("renders children correctly", () => {
    render(
      <LayoutAuth>
        <div data-testid="child-element">Test Child</div>
      </LayoutAuth>
    );
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
  });

  it("renders the ActivityIndicator when loading is true", () => {
    render(
      <LayoutAuth loading={true}>
        <div>Test Child</div>
      </LayoutAuth>
    );
    expect(screen.getByTestId("activity-indicator")).toBeInTheDocument();
  });

  it("does not render the ActivityIndicator when loading is false", () => {
    render(
      <LayoutAuth loading={false}>
        <div>Test Child</div>
      </LayoutAuth>
    );
    expect(screen.queryByTestId("activity-indicator")).not.toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <LayoutAuth loading={false}>
        <div>Test Child</div>
      </LayoutAuth>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
