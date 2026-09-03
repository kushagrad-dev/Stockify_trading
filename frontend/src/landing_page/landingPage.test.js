import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
    MemoryRouter: ({ children }) => <>{children}</>,
  }),
  { virtual: true }
);

import { MemoryRouter } from "react-router-dom";

import Notfound from "./Notfound";
import Footer from "./footer";
import Navbar from "./navbar";
import OpenAccount from "./openaccount";
import AboutPage from "./about/AboutPage";
import HomePage from "./home/HomePage";
import Login from "./login/Login";
import PricingPage from "./pricing/PricingPage";
import ProductsPage from "./products/ProductsPage";
import LeftImage from "./products/LeftImage";
import LeftSection from "./products/LeftSection";
import RightImage from "./products/RightImage";
import RightSection from "./products/RightSection";
import SignUp from "./signup/SignUp";
import SupportPage from "./support/SupportPage";

const renderWithRouter = (component) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

describe("landing page components", () => {
  test("renders the shared navigation, footer, and not-found page", () => {
    const { unmount } = renderWithRouter(<Navbar />);
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
    unmount();

    render(<Footer />);
    expect(screen.getByText(/Smart investing made simple/)).toBeInTheDocument();
  });

  test("renders the not-found page", () => {
    render(<Notfound />);
    expect(screen.getByRole("heading", { name: "Page Not Found" })).toBeInTheDocument();
  });

  test("renders the complete home page and its child sections", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole("heading", { name: "Invest in everything" })).toBeInTheDocument();
    expect(screen.getByText("Largest Stock Broker in India")).toBeInTheDocument();
    expect(screen.getByText("Trust with confidence")).toBeInTheDocument();
    expect(screen.getByText("Unbeatable Pricing")).toBeInTheDocument();
    expect(screen.getByText("Free and open market education")).toBeInTheDocument();
    expect(screen.getByText("Open Your Stockify Account")).toBeInTheDocument();
  });

  test("renders the complete about page and its child sections", () => {
    render(<AboutPage />);
    expect(screen.getByText(/We pioneered the discount broking model/i)).toBeInTheDocument();
    expect(screen.getByText("Meet the Founder")).toBeInTheDocument();
    expect(screen.getByText("Kushagra Dubey")).toBeInTheDocument();
  });

  test("renders the complete pricing page and its child sections", () => {
    renderWithRouter(<PricingPage />);
    expect(screen.getByRole("heading", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByText("Brokerage Calculator")).toBeInTheDocument();
    expect(screen.getByText("List of Charges")).toBeInTheDocument();
  });

  test("renders the complete products page and its child sections", () => {
    renderWithRouter(<ProductsPage />);
    expect(screen.getByRole("heading", { name: "Technology" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kite" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The Stockify Universe" })).toBeInTheDocument();
  });

  test("renders reusable product sections with supplied props", () => {
    const { unmount } = render(
      <LeftSection imageURL="left.png" productName="Left product" productDescription="Left description" tryDemo="/demo" learnMore="/learn" googlePlay="/play" appStore="/store" />
    );
    expect(screen.getByRole("heading", { name: "Left product" })).toBeInTheDocument();
    expect(screen.getByAltText("Left product")).toHaveAttribute("src", "left.png");
    unmount();

    render(<RightSection imageURL="right.png" productName="Right product" productDescription="Right description" learnMore="/learn" />);
    expect(screen.getByRole("heading", { name: "Right product" })).toBeInTheDocument();
    expect(screen.getByAltText("Right product")).toHaveAttribute("src", "right.png");
  });

  test("renders the placeholder image components", () => {
    const { unmount } = render(<LeftImage />);
    expect(screen.getByRole("heading", { name: "LeftImage" })).toBeInTheDocument();
    unmount();
    render(<RightImage />);
    expect(screen.getByRole("heading", { name: "RightImage" })).toBeInTheDocument();
  });

  test("renders the complete support page and ticket categories", () => {
    render(<SupportPage />);
    expect(screen.getByRole("heading", { name: "Support Portal" })).toBeInTheDocument();
    expect(screen.getByText("To create a ticket, select a relevant topic")).toBeInTheDocument();
    expect(screen.getByText("Your Stockify Account")).toBeInTheDocument();
  });

  test("renders the standalone open-account call to action", () => {
    renderWithRouter(<OpenAccount />);
    expect(screen.getByRole("link", { name: "Sign Up Now" })).toHaveAttribute("href", "/signup");
  });
});

describe("authentication forms", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("validates required signup details before making an API request", () => {
    renderWithRouter(<SignUp />);
    fireEvent.submit(screen.getByRole("button", { name: "Create account" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter your name.");
  });

  test("shows the backend error when login is rejected", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Invalid email or password" }),
    });

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong-password" } });
    fireEvent.submit(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid email or password");
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({ method: "POST" })
    );
  });
});
