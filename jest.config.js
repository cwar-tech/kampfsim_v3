export default {
    roots: ["<rootDir>/tests"],

    testEnvironment: "node",

    testMatch: ["**/*.test.js"],

    moduleFileExtensions: ["js", "json"],

    transform: {},

    testPathIgnorePatterns: [
        "/node_modules/",
        "/AppData/",
        "/.vscode/",
    ],
};