// Register.test.tsx

import { render, screen } from "@testing-library/react";

import Register from "../Register";

describe("Register Component", () => {
  it("should render the text 'Register'", () => {
    // Arrange: Render the Register component
    render(<Register />);

    // Act: Query the element with the text 'Register'
    const registerText = screen.getByText("Register");

    // Assert: Ensure the text is in the document
    expect(registerText).toBeInTheDocument();
  });

  it("should have the correct typography variant", () => {
    // Arrange: Render the Register component
    render(<Register />);

    // Act: Query the Typography element by its text
    const registerText = screen.getByText("Register");

    // Assert: Check that it has the correct variant (MUI's Typography uses 'caption' as a class)
    expect(registerText).toHaveClass("MuiTypography-caption");
  });

  it("should have the display set to block", () => {
    // Arrange: Render the Register component
    render(<Register />);

    // Act: Query the Typography element by its text
    const registerText = screen.getByText("Register");

    // Assert: Check that it has the 'block' display style
    expect(registerText).toHaveStyle("display: block");
  });
});
