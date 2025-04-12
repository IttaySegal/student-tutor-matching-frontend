module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env", // Path to your .env file
          allowlist: null, // Specify allowed variables, or null to allow all
          blacklist: null, // Specify blocked variables, or null for none
          safe: false, // Set to true if you want to check for missing variables
          allowUndefined: true, // Allow undefined variables
          verbose: false, // Enable verbose logging if needed
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // ⬅️ הוספנו את זה
            "@app": "./app",
            "@home": "./app/home",
            "@create": "./app/create",
            "@context": "./context",
            "@components": "./components",
            "@services": "./services",
            "@utils": "./app/home/utils",
            "@mocks": "./app/mocks",
            "@assets": "./assets",
            "@hooks": "./hooks",
            "@constants": "./constants",
            "@navigation": "./navigation",
            "@styles": "./styles"
          },
        },
      ],
    ],
  };
};
