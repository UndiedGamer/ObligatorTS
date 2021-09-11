process.env.NODE_ENV ??= 'development';

import { envParseArray, envParseBoolean, envParseString } from './lib/env';
import { srcFolder } from '#lib/constants';
import { LogLevel } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { config } from 'dotenv-cra';
import { join } from 'path';

config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined,
	path: join(srcFolder, '.env')
});

export const OWNERS = envParseArray('CLIENT_OWNERS');

function parseRegExpPrefix(): RegExp | undefined {
	const { CLIENT_REGEX_PREFIX } = process.env;
	return CLIENT_REGEX_PREFIX ? new RegExp(CLIENT_REGEX_PREFIX, 'i') : undefined;
}

export const CLIENT_OPTIONS: ClientOptions = {
	intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
	defaultPrefix: envParseString('CLIENT_PREFIX'),
	regexPrefix: parseRegExpPrefix(),
	logger: {
		level: envParseString('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug
	},
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true
};
