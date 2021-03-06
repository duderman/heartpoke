module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "declaration-colon-newline-after": null,
  },
};
