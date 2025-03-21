module.exports = {
  // Global config
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: 'jm-house-tilemap.json', // your file
      options: {
        parser: 'json',
        printWidth: 38, // Big value to prevent line wrapping
      },
    },
  ],
};
