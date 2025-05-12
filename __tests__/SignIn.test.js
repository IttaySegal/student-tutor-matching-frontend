import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native"; // Added to spy on alert
import SignIn from "../app/(auth)/sign-in";
import { router } from "expo-router"; // Important to check the back call
import { act } from "react-test-renderer";

// Define the variable here so we can check it in tests
let mockLogin;

// Real mock according to Jest requirements
jest.mock("../context/AuthContext", () => {
  mockLogin = jest.fn(); // Create the mock function inside the function

  return {
    useAuth: () => ({
      login: mockLogin,
    }),
  };
});
jest.mock("expo-router", () => {
  const actual = jest.requireActual("expo-router");
  return {
    ...actual,
    Link: ({ children }) => children, // Ignore Link during test
    router: {
      back: jest.fn(),
    },
  };
});

describe("SignIn Screen", () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  it("calls login on sign in press with email and password", () => {
    const { getByTestId, getByText } = render(<SignIn />);

    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const signInButton = getByText(/sign in/i);

    fireEvent.changeText(emailInput, "test@test.com");
    fireEvent.changeText(passwordInput, "123456");

    fireEvent.press(signInButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
    });
  });

  it("shows alert when email is invalid", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => { });

    const { getByTestId, getByText } = render(<SignIn />);

    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const signInButton = getByText(/sign in/i);

    fireEvent.changeText(emailInput, "notanemail");
    fireEvent.changeText(passwordInput, "123456");

    fireEvent.press(signInButton);

    expect(alertSpy).toHaveBeenCalledWith(
      "Error",
      "Please fix the errors before submitting"
    );

    alertSpy.mockRestore(); // For cleanup after test
  });
  it("shows alert when fields are empty", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => { });
    const { getByText } = render(<SignIn />);
    fireEvent.press(getByText(/sign in/i));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Please fill in all fields");
    alertSpy.mockRestore(); // For cleanup after test
  });
  it("shows alert when login fails", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => { });
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByTestId, getByText } = render(<SignIn />);
    fireEvent.changeText(getByTestId("email-input"), "user@test.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");
    await act(async () => {
      fireEvent.press(getByText(/sign in/i));
    });

    expect(alertSpy).toHaveBeenCalledWith("Error", "Invalid credentials");
    alertSpy.mockRestore();
  });
  it("navigates back when login is successful", async () => {
    mockLogin.mockResolvedValueOnce({ token: "123" }); // Successful login

    const { getByTestId, getByText } = render(<SignIn />);

    fireEvent.changeText(getByTestId("email-input"), "success@test.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");

    await act(async () => {
      fireEvent.press(getByText(/sign in/i));
    });

    expect(mockLogin).toHaveBeenCalled(); // Verify that login was called
    expect(router.back).toHaveBeenCalled(); // Verify that back navigation occurred
  });
});
