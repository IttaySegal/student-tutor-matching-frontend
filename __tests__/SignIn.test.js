import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native"; // נוסיף כדי לרגל אחרי alert
import SignIn from "../app/(auth)/sign-in";
import { router } from "expo-router"; // חשוב כדי לבדוק את הקריאה ל-back
import { act } from "react-test-renderer";

// נגדיר את המשתנה פה כדי שנוכל לבדוק אותו בטסטים
let mockLogin;

// mock אמיתי לפי הדרישות של Jest
jest.mock("../context/AuthContext", () => {
  mockLogin = jest.fn(); // יוצרים את הפונקציה המזויפת בתוך הפונקציה

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
    Link: ({ children }) => children, // מתעלם מה-Link בזמן טסט
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
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

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

    alertSpy.mockRestore(); // לניקוי אחרי הטסט
  });
  it("shows alert when fields are empty", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByText } = render(<SignIn />);
    fireEvent.press(getByText(/sign in/i));
    expect(alertSpy).toHaveBeenCalledWith("Error", "Please fill in all fields");
    alertSpy.mockRestore();
  });
  it("shows alert when login fails", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
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
    mockLogin.mockResolvedValueOnce({ token: "123" }); // התחברות מוצלחת

    const { getByTestId, getByText } = render(<SignIn />);

    fireEvent.changeText(getByTestId("email-input"), "success@test.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");

    await act(async () => {
      fireEvent.press(getByText(/sign in/i));
    });

    expect(mockLogin).toHaveBeenCalled(); // וידוא ש-login נקרא
    expect(router.back).toHaveBeenCalled(); // וידוא שנעשית חזרה אחורה
  });
});
