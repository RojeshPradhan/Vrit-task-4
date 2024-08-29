import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import DashboardPage from "../dashboard/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DashboardPage", () => {
  const router = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(router);
    localStorage.clear();
  });

  test("should redirect to login page if not authenticated", async () => {
    render(<DashboardPage />);

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/login"));
  });

  test("should allow access if authenticated", async () => {
    localStorage.setItem("authenticated", "true");
    render(<DashboardPage />);

    expect(screen.getByText(/welcome to your dashboard!/i)).toBeInTheDocument();
  });

  test("should logout and redirect to login page", async () => {
    localStorage.setItem("authenticated", "true");
    render(<DashboardPage />);

    fireEvent.click(screen.getByText(/logout/i));

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/login"));
    expect(localStorage.getItem("authenticated")).toBe(null);
  });
});
