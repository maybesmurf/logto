import { isLanguageTag } from '@logto/language-kit';
import { isBuiltInLanguageTag as isPhrasesBuiltInLanguageTag } from '@logto/phrases';
import { isBuiltInLanguageTag as isPhrasesUiBuiltInLanguageTag } from '@logto/phrases-ui';
import type { CommandModule } from 'yargs';

import { log } from '../../utils.js';
import { inquireInstancePath } from '../connector/utils.js';

import { createFullTranslation } from './utils.js';

const create: CommandModule<{ path?: string }, { path?: string; 'language-tag': string }> = {
  command: ['create <language-tag>', 'c'],
  describe:
    'Create a new language translation using ChatGPT. Note the environment variable `OPENAI_API_KEY` is required to work.',
  builder: (yargs) =>
    yargs.positional('language-tag', {
      describe: 'The language tag to create, e.g. `af-ZA`.',
      type: 'string',
      demandOption: true,
    }),
  handler: async ({ path: inputPath, languageTag }) => {
    if (!isLanguageTag(languageTag)) {
      log.error('Invalid language tag. Run `logto translate list-tags` to see available list.');
    }

    const instancePath = await inquireInstancePath(inputPath);

    if (isPhrasesBuiltInLanguageTag(languageTag)) {
      log.info(languageTag + ' is a built-in tag of phrases, updating untranslated phrases');
    }
    await createFullTranslation({ instancePath, packageName: 'phrases', languageTag });

    if (isPhrasesUiBuiltInLanguageTag(languageTag)) {
      log.info(languageTag + ' is a built-in tag of phrases-ui, updating untranslated phrases');
    }
    await createFullTranslation({
      instancePath,
      packageName: 'phrases-ui',
      languageTag,
    });
  },
};

export default create;
