import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import LoginPage from "../login/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  const router = {
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(router);
    localStorage.clear();
  });

  test("should redirect to dashboard upon successful login", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/dashboard"));
    expect(localStorage.getItem("authenticated")).toBe("true");
  });

  test("should show alert on invalid login attempt", async () => {
    window.alert = jest.fn();
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wrongUser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongPassword" },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Invalid username or password")
    );
  });
});
