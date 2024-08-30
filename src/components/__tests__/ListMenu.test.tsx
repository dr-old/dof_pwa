import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListMenu from "../ListMenu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorModeProvider } from "../../context/useColorMode";

// Mock the useAuth hook
jest.mock("../../context/useAuth", () => ({
  useAuth: jest.fn(),
}));

// Mock the useLocation and useNavigate hooks
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

interface MockColorModeProviderProps {
  children: ReactNode;
}

// Mock ColorModeProvider, if required
const MockColorModeProvider: React.FC<MockColorModeProviderProps> = ({
  children,
}) => <ColorModeProvider>{children}</ColorModeProvider>;

describe("ListMenu Component", () => {
  const theme = createTheme();
  const mockToggleMenu = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        fullname: "John Doe",
        photo: "https://i.pravatar.cc/150?img=2",
      },
      logOut: jest.fn(),
    });

    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/dashboard",
      state: { title: "Dashboard" },
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderComponent = (isMenuOpen: boolean, isMobile: boolean) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <MockColorModeProvider>
            <ListMenu
              isMenuOpen={isMenuOpen}
              isMobile={isMobile}
              toggleMenu={mockToggleMenu}
            />
          </MockColorModeProvider>
        </MemoryRouter>
      </ThemeProvider>
    );

  it("renders the component", () => {
    renderComponent(true, false);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    // Add additional assertions as needed
  });

  it("matches the snapshot", () => {
    const { asFragment } = renderComponent(true, false);
    expect(asFragment()).toMatchSnapshot();
  });
});
