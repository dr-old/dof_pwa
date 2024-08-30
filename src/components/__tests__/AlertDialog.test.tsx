import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlertDialog from "../AlertDialog";

describe("AlertDialog Component", () => {
  test("renders AlertDialog correctly", () => {
    const { asFragment } = render(
      <AlertDialog
        open={true}
        onClose={() => {}}
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        confirmText="Yes"
        cancelText="No"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays title and content correctly", () => {
    render(
      <AlertDialog
        open={true}
        onClose={() => {}}
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        confirmText="Yes"
        cancelText="No"
      />
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to proceed?")
    ).toBeInTheDocument();
  });

  test("calls onClose when cancel button is clicked", () => {
    const onCloseMock = jest.fn();

    render(
      <AlertDialog
        open={true}
        onClose={onCloseMock}
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        confirmText="Yes"
        cancelText="No"
      />
    );

    fireEvent.click(screen.getByText("No"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm when confirm button is clicked", () => {
    const onConfirmMock = jest.fn();

    render(
      <AlertDialog
        open={true}
        onClose={() => {}}
        title="Confirm Action"
        content="Are you sure you want to proceed?"
        onConfirm={onConfirmMock}
        confirmText="Yes"
        cancelText="No"
      />
    );

    fireEvent.click(screen.getByText("Yes"));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
