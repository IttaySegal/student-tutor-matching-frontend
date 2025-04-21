import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

// mocks
const mockCreateNewLesson = jest.fn();
jest.mock("@context/LessonContext", () => ({
  useLesson: () => ({
    createNewLesson: mockCreateNewLesson,
  }),
}));

jest.mock("@context/ToastContext", () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

jest.mock("react-native-dropdown-select-list", () => ({
  SelectList: ({ testID, setSelected }) => {
    const { TextInput } = require("react-native");
    return (
      <TextInput
        testID={testID}
        onChangeText={(text) => setSelected(text)}
        value=""
      />
    );
  },
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome5: () => null,
}));
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

// test component
import CreateLesson from "../app/create/CreateLesson";

describe("CreateLesson", () => {
  it("calls createNewLesson when form is submitted with valid data", async () => {
    const { getByTestId, getByText } = render(<CreateLesson />);

    fireEvent.changeText(getByTestId("subject-select"), "Civics");
    fireEvent.changeText(getByTestId("grade-select"), "8");
    fireEvent.changeText(getByTestId("description-input"), "Algebra lesson");
    fireEvent.changeText(getByTestId("location-input"), "Room 101");
    fireEvent.press(getByText("In-person at school"));
    fireEvent.press(getByText("Create Lesson"));

    await waitFor(() => {
      expect(mockCreateNewLesson).toHaveBeenCalledTimes(1);
    });
  });

  it("disables create button when form is incomplete", () => {
    const { getByTestId } = render(<CreateLesson />);
    const createButton = getByTestId("create-button");
    expect(createButton.props.accessibilityState?.disabled).toBe(true);
  });

  it("hides group field when subject does not require group", () => {
    const { getByTestId, queryByTestId } = render(<CreateLesson />);
    fireEvent.changeText(getByTestId("subject-select"), "Civics");
    expect(queryByTestId("group-select")).toBeNull();
  });
});
