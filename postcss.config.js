module.exports = {
  plugins: [
    [
      "@csstools/postcss-global-data",
      {
        files: ["./shared/styles/breakpoints.css"],
      },
    ],
    "postcss-custom-media",
  ],
};
