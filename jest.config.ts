export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',  
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',			
    '<rootDir>/tests'
  ],
  testEnvironment: 'jest-environment-node',
  transform: {                  
    '\\.ts$': 'ts-jest'         
  },
  clearMocks: true
}