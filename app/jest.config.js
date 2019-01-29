const path = require('path');

module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleDirectories: [path.resolve(__dirname, './src/'), 'node_modules'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'node',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
