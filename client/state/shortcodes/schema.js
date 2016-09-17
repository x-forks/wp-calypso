export const siteShortcodeSchema = {
	type: 'object',
	properties: {
		body: { type: 'string' },
		scripts: { type: 'string' },
		styles: { type: 'string' },
		status: { type: 'string' },
	},
};

export const siteShortcodesSchema = {
	type: 'object',
	patternProperties: {
		'^.+$': { ...siteShortcodeSchema }
	}
};

export const shortcodesSchema = {
	type: 'object',
	patternProperties: {
		'^\\d+$': { ...siteShortcodesSchema }
	}
};
