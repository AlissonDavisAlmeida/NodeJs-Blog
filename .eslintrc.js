module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb-base",
	],
	parserOptions: {
		ecmaVersion: 13,
		sourceType: "module",
	},
	rules: {
		"linebreak-style": "off",
		"no-console": "off",
		quotes: ["warn", "double"],
		eqeqeq: "off",
		"no-multiple-empty-lines": ["warn", { max: 2 }],
		"no-unused-vars": "off",
		indent: ["warn", "tab"],
		"no-tabs": "off",
		"spaced-comment": "off",
	},
};
