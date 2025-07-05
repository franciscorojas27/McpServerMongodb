export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^@mongo/(.*)\\.js$': '<rootDir>/src/mongo/$1.ts',
    '^@mongo/(.*)$': '<rootDir>/src/mongo/$1',
    '^@tools/(.*)\\.js$': '<rootDir>/src/tools/$1.ts',
    '^@tools/(.*)$': '<rootDir>/src/tools/$1',
  },
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
