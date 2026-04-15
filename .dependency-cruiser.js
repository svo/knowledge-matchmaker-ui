module.exports = {
  forbidden: [
    {
      name: "no-circular-dependencies",
      comment:
        "Circular dependencies make code harder to maintain and understand",
      severity: "error",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "lib-no-layer-deps",
      comment:
        "Utility/lib code should be independent and not depend on any architectural layers",
      severity: "error",
      from: { path: "^src/lib" },
      to: {
        path: "^src/app",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    exclude: {
      path: "\\.(test|spec)\\.(ts|tsx|js|jsx)$",
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "./tsconfig.json",
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/[^/]+",
      },
      archi: {
        collapsePattern:
          "^(node_modules|src/[^/]+|bin|test|spec|src/[^/]+/[^/]+)/",
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
