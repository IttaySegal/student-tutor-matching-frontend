// jest.setup.js

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Tell Jest to use the mock whenever AsyncStorage is imported
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
