// jest.setup.js

import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// אומרים ל-Jest שכל פעם שמייבאים את AsyncStorage – שישתמש במוק המזויף
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
