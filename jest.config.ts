export default {
	preset: 'ts-jest',
	moduleNameMapper: {
		'^Core/(.*)$': '<rootDir>/src/Core/$1',
		'^Infrastructure/(.*)$': '<rootDir>/src/Infrastructure/$1',
		'^SharedKernel/(.*)$': '<rootDir>/src/SharedKernel/$1',
	},
	testEnvironment: 'node',
	testMatch: ['**/tests/**/?(*.)+(test).[tj]s?(x)'],
	setupFilesAfterEnv: ['jest-extended'],
	reporters: [
		'default',
		[
			'./node_modules/jest-html-reporter',
			{
				pageTitle: 'Test report - Online CV',
				includeSuiteFailure: true,
				includeFailureMsg: true,
			},
		],
	],
};
