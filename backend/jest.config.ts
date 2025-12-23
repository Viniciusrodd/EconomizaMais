
// jest.config.ts
import type { Config } from '@jest/types';


// config
const config: Config.InitialOptions = {
   preset: 'ts-jest',
   testEnvironment: 'node',

   // tests local
   testMatch: ['<rootDir>/src/tests/**/*.test.ts'],

   // to ignore
   testPathIgnorePatterns: ['/node_modules/', '/dist/'],

   // transform TS
   transform: {
      '^.+\\.ts$': 'ts-jest'
   },

   // only "controllers" coverage
   collectCoverage: true,
   collectCoverageFrom: [
      'src/http/controllers/**/*.ts'
   ],
   coverageDirectory: 'coverage',
   coverageReporters: ['text-summary', 'lcov'],

   // low threshold (projeto acadêmico)
   coverageThreshold: {
      global: {
         branches: 1,
         functions: 1,
         lines: 1,
         statements: 1
      }
   },

   // Path aliases - tsconfig
   moduleNameMapper: {
      "@config/(.*)": ['<rootDir>/src/config/$1'],
      "@routes/(.*)": ["<rootDir>/src/http/routes/$1"],
      "@controllers/(.*)": ["<rootDir>/src/http/controllers/$1"],
      "@middlewares/(.*)": ["<rootDir>/src/http/middlewares/$1"],
      "@httpUtils/(.*)": ["<rootDir>/src/http/utils/$1"],
      "@entities/(.*)": ["<rootDir>/src/domain/entities/$1"],
      "@services/(.*)": ["<rootDir>/src/domain/services/$1"],
      "@models/(.*)": ["<rootDir>/src/infra/sequelize/models/$1"],
      "@repositories/(.*)": ["<rootDir>/src/infra/repositories/$1"],
      "@DTOs/(.*)": ["<rootDir>/src/shared/dtos/$1"],
      "@errors/(.*)": ["<rootDir>/src/shared/errors/$1"],
      "@utils/(.*)": ["<rootDir>/src/shared/utils/$1"],
      "@interfaces/(.*)": ["../shared/interfaces/$1"],
      "@mocks/(.*)": ["<rootDir>/src/mocks/$1"],
      
      "@root/(.*)": ["<rootDir>/src/$1"], // src files
   },

   verbose: true
};
export default config;